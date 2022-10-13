import $ from 'jquery';

export class Route {
	name;

	constructor(name) {
		if (!/^[a-zA-z]+$/.test(name)) {
			throw `Route name can only contain uppercase and lowercase characters: "${name}"`;
		}

		this.name = name;
	}

	onSelect(content, params) { }
}

export class Router {
	routes = {};
	defaultRoute;
	content;

	selectListners = [];

	static #parseRoute(routeString) {
		let [route, params] = routeString.split('?', 2);
		return {
			route,
			params: new URLSearchParams(params)
		};
	}

	static getCurrentRoute() {
		return Router.#parseRoute(
			window.location.hash.substring(1)
		);
	}

	static setLocationHash(route, args) {
		window.location.hash = route.toString() + (
			args ? '?' + '&'.join(Object.entries(args).map(([key, val]) => `${key}=${val}`))
			: ''
		);
	}

	static getRouteName(route) {
		return route instanceof Route ? route.name
			: (typeof route === 'string' || route instanceof String) ? route
				: undefined;
	}

	constructor(defaultRoute, content, routes) {
		routes.forEach(r => {
			this.routes[r.name] = r;
		})

		this.defaultRoute = this.getRouteFromName(defaultRoute);

		if (this.defaultRoute === undefined) {
			throw 'Router default route is not a valid Route or string: ' + defaultRoute.toString();
		}
		
		if(!(content instanceof HTMLElement)) {
			throw 'Router must recieve HTMLElement content, got: ' + content.toString();
		}
		this.content = content;

		this.handleHashChangeEvent();
		$(window).on('hashchange', () => this.handleHashChangeEvent());
	}

	handleHashChangeEvent() {
		let { route, params } = Router.getCurrentRoute();

		let page = this.getRouteFromName(route);

		page.onSelect(this.content, params);

		this.#callListeners(page);
	}

	isSelected(route) {
		return Router.getRouteName(route) === Router.getCurrentRoute().route;
	}

	go(route, params) {
		let page = Router.getRouteName(route);

		if (page === undefined) {
			page = this.defaultRoute.name;
		}

		if (
			typeof params !== 'object' ||
			Array.isArray(params) ||
			params === null
		) {
			params = undefined;
		}

		this.content.empty();
		console.log(`Router: Go to "${page}"`);

		Router.setLocationHash(page, params);
	}

	addSelectListener(listener) {
		this.selectListners.push(listener);
	}

	getRouteFromName(route) {
		return route instanceof Route ? route
			: route in this.routes ? this.routes[route]
				: undefined;
	}

	#callListeners(route) {
		this.selectListners.forEach(list => {
			try {
				list(route);
			} catch (e) {
				console.log('Router select listener failed', e);
			}
		})
	}
}
