import $ from 'jquery';
import { Route } from './router.js';
import { PageRouter, ProductPage, ShopPage} from '../routes.js';

export class AboutRoute extends Route {
	fetchedTwitts;

	constructor() {
		super('AboutUs');
	}

	get twitts() {
		return this.fetchedTwitts.data.map(elem => {
			elem.user = this.fetchedTwitts.includes.users.find(user => user.id === elem.author_id);
			return elem;
		});
	}

	async onSelect(content, params) {

		this.fetchTwitts(
			$(content)
				.append(
					this.genAboutHeader()
				)
				.append(
					this.genDetails()
				)
				.append(
					this.genVideo()
				)
				.append(
					this.genSelllersMaps()
				)
		);
        
	}

	async fetchTwitts(element) {
		fetch('/api/twitter')
			.then(response => response.json())
			.then(data => {
				this.fetchedTwitts = data;
				
				element
					.append(
						this.genSocialHeader()
					)
					.append(
						this.genTwiConteiner()
					);
			});
	}

	genAboutHeader() {
		return $('<section>')
			.attr('id', 'about-header')
			.append($('<h1>').text('About Us'))
			.append($('<h2>').text('NAT - Global fashion store'));
	}

	genDetails(){
		return $('<section>')
			.attr('id', 'about-text')
			.addClass('section-p1')
			.append($('<img>')
				.attr('src', '/public/img/about/a6.jpg')
				.attr('alt','')
			)
			.append($('<div>')
				.attr('id', 'hwr')
				.append($('<h2>').text('Who We Are?'))
				.append($('<span>').text('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id estlaborum.'))
			);
	}

	genVideo(){
		return $('<section>')
			.attr('id', 'about-text')
			.addClass('section-p1')
			.append($('<div>')
				.attr('id','soon')
				.append($('<h2>').text('Our New App Coming Soon!'))
				.append($('<h4>').text('Starting at the beginning of 2023 The app will be available in all app stores.'))
			)
			.append($('<div>')
				.addClass('video')
				.append($('<video>')
					.attr('src', '/public/img/about/1.mp4')
					.prop('autoplay', true)
					.prop('muted', true)
					.prop('loop', true)
				)
			);
	}

	genSelllersMaps(){
		return $('<section>')
			.attr('id', 'about-text')
			.addClass('section-p1')
			.append($('<div>')
				.addClass('map')
				.append($('<div>')
					.addClass('mapouter')
					.append($('<div>')
						.addClass('gmap_canvas')
						.append($('<iframe>')
							.attr('id','gmap_canvas')
							.attr('src','https://maps.google.com/maps?q='+'51.70324,10.970150'+'&t=&z=13&ie=UTF8&iwloc=&output=embed')
							.attr('width','547')
							.attr('height','500')
							.attr('frameborder','0')
							.attr('scrolling','no')
							.attr('marginheight','0')
							.attr('marginwidth','0')
						)
					)
				))
			.append($('<div>')
				.attr('id','soon')
				.append($('<h2>').text('Our Seller world Wide'))
				.append($('<h4>').text('Here you can see our sellers location.'))
			);
	}


	genSocialHeader() {
		return $('<section>')
			.attr('id', 'social-header')
			.append($('<h1>').text('Read About Us'));
	}
	genTweetText(twitt)
	{
		return $('<div>')
			.addClass('quote_frame')
			.append($('<h2>').text(twitt.user.name))
			.append($('<div>').append($('<h4>').text(twitt.text)));
	}

	genTwiConteiner() {
		return $('<section>')
			.attr('id', 'twiters')
			.addClass('section-p1')
			.append(
				$('<div>')
					.addClass('twi-container')
					.append(this.twitts.map(p => this.genTwiElement(p)))
			);
	}

	genTwiElement(twitt) {
		return $('<div>')
			.addClass('twi')
			.append(
				$('<img>')
					.attr('src', twitt.user.profile_image_url)
					.attr('alt','')
			)
			.append(
				$('<div>')
					.addClass('des')
					.append($('<span>').text(twitt.user.name))
					.append($('<h5>').text(twitt.text))
			).append($('<a>').append(
				$('<i>').addClass('bi bi-twitter twit')
			));
	}
}