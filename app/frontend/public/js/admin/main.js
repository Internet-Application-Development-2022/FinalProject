import $ from 'jquery';
import * as d3 from 'https://cdn.skypack.dev/d3@7';
import { Table } from './table.js';
import { ProductrRow, SellerRow } from './rows.js';
import { messageSenderElements } from './messageSender.js';

const CONTENT = $('main');

const APIS = {
	'/api/products': ['products', ProductrRow],
	'/api/sellers': ['sellers', SellerRow],
	'/api/seller-requests': ['sellers request', SellerRow]
};

async function tableFetch(api, RowClass) {
	return fetch(api)
		.then(res => res.json())
		.then(data => new Table(api, data, RowClass));
}

function dataDisplay(container, api, name, RowClass) {
	container.empty();
	tableFetch(api, RowClass)
		.then(t => container.attr('id', name).append(t.element));
}

function BarChart(data, {
	x = (d, i) => i, // given d in data, returns the (ordinal) x-value
	y = d => d, // given d in data, returns the (quantitative) y-value
	title, // given d in data, returns the title text
	marginTop = 20, // the top margin, in pixels
	marginRight = 0, // the right margin, in pixels
	marginBottom = 30, // the bottom margin, in pixels
	marginLeft = 40, // the left margin, in pixels
	width = 640, // the outer width of the chart, in pixels
	height = 400, // the outer height of the chart, in pixels
	xDomain, // an array of (ordinal) x-values
	xRange = [marginLeft, width - marginRight], // [left, right]
	yType = d3.scaleLinear, // y-scale type
	yDomain, // [ymin, ymax]
	yRange = [height - marginBottom, marginTop], // [bottom, top]
	xPadding = 0.1, // amount of x-range to reserve to separate bars
	yFormat, // a format specifier string for the y-axis
	yLabel, // a label for the y-axis
	color = "currentColor" // bar fill color
  } = {}) {
	// Compute values.
	const X = d3.map(data, x);
	const Y = d3.map(data, y);
  
	// Compute default domains, and unique the x-domain.
	if (xDomain === undefined) xDomain = X;
	if (yDomain === undefined) yDomain = [0, d3.max(Y)];
	xDomain = new d3.InternSet(xDomain);
  
	// Omit any data not present in the x-domain.
	const I = d3.range(X.length).filter(i => xDomain.has(X[i]));
  
	// Construct scales, axes, and formats.
	const xScale = d3.scaleBand(xDomain, xRange).padding(xPadding);
	const yScale = yType(yDomain, yRange);
	const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);
	const yAxis = d3.axisLeft(yScale).ticks(height / 40, yFormat);
  
	// Compute titles.
	if (title === undefined) {
	  const formatValue = yScale.tickFormat(100, yFormat);
	  title = i => `${X[i]}\n${formatValue(Y[i])}`;
	} else {
	  const O = d3.map(data, d => d);
	  const T = title;
	  title = i => T(O[i], i, data);
	}
  
	const svg = d3.create("svg")
		.attr("width", width)
		.attr("height", height)
		.attr("viewBox", [0, 0, width, height])
		.attr("style", "max-width: 100%; height: auto; height: intrinsic;");
  
	svg.append("g")
		.attr("transform", `translate(${marginLeft},0)`)
		.call(yAxis)
		.call(g => g.select(".domain").remove())
		.call(g => g.selectAll(".tick line").clone()
			.attr("x2", width - marginLeft - marginRight)
			.attr("stroke-opacity", 0.1))
		.call(g => g.append("text")
			.attr("x", -marginLeft)
			.attr("y", 10)
			.attr("fill", "currentColor")
			.attr("text-anchor", "start")
			.text(yLabel));
  
	const bar = svg.append("g")
		.attr("fill", color)
	  .selectAll("rect")
	  .data(I)
	  .join("rect")
		.attr("x", i => xScale(X[i]))
		.attr("y", i => yScale(Y[i]))
		.attr("height", i => yScale(0) - yScale(Y[i]))
		.attr("width", xScale.bandwidth());
  
	if (title) bar.append("title")
		.text(title);
  
	svg.append("g")
		.attr("transform", `translate(0,${height - marginBottom})`)
		.call(xAxis);
  
	return svg.node();
  }

function createProductsByCatagory() {
	fetch('/api/products')
		.then(res => res.json())
		.then(data => {
			const dataGroupBy = Object.entries(data.reduce((obj, val) => {
				obj[val.catagory] = (obj[val.catagory] || 0) + 1; return obj;
				}, {})).map(([key, val]) => {
					return { catagory: key, amount: val };
				});	
			const svg = BarChart(dataGroupBy, {
							x: d => d.catagory,
							y: d => d.amount,
							xDomain: d3.groupSort(dataGroupBy, ([d]) => -d.amount, d => d.catagory),
							yLabel: "↑ Products Amount",
							color: "steelblue"
			})
			CONTENT.append(svg)	
		});
}

function createProductsBySeller() {
	fetch('/api/products/by-seller')
		.then(res => res.json())
		.then(data => { console.log(data) })
}

$(() => {
	const dataSection = $('<section>');
	CONTENT.append([
		$('<span>').text('Select table: '),
		$('<select>')
			.addClass('list-group')
			.on('input', e => {
				dataDisplay(dataSection, e.target.value, ...APIS[e.target.value]);
			})
			.append(Object.entries(APIS).map(([api, [name, RowClass]], i) => {
				const opt = $('<option>')
					.attr('value', api)
					.text(name);
				if(i == 0) {
					opt.attr('selected', '');
					dataDisplay(dataSection, api, name, RowClass);
				}
				return opt;
			})),
		dataSection
	]).append(messageSenderElements);
	createProductsByCatagory();
	createProductsBySeller();
});