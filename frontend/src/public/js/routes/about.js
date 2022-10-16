import $ from 'jquery';
import { Route } from './router.js';
import { PageRouter, ProductPage, ShopPage} from '../routes.js';

export class AboutRoute extends Route {

    constructor() {
		super('AboutUs');
	}

    onSelect(content,params) {
        $(content)
        .append(
            this.genAboutHeader()
        )
    }

    genAboutHeader() {
		return $('<section>')
			.attr('id', 'about-header')
			.append($('<h1>').text('About Us'))
			.append($('<h2>').text('NAT - Global fashion store'))
	}

}