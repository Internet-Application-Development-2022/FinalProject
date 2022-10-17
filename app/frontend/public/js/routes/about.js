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
        .append(
            this.genDetails()
        )
        .append(
            this.genVideo()
        )
        .append(
            this.genSelllersMaps()
        )
    }

    genAboutHeader() {
		return $('<section>')
			.attr('id', 'about-header')
			.append($('<h1>').text('About Us'))
			.append($('<h2>').text('NAT - Global fashion store'))
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
            )
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
            )
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
                        .attr('src','https://maps.google.com/maps?q=&output=embed')
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
            )

    }
}
