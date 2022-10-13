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

	static #getRawCurrentRoute() {
		return window.location.hash.substring(1);
	}

	static getCurrentRoute() {
		return Router.#parseRoute(
			Router.#getRawCurrentRoute()
		);
	}

	static #genParamHash(args) {
		if (!args) return '';
		return '?' + (
			Object.entries(args).map(([key, val]) => `${key}=${val}`)
		).join('&');
	}

	static #genLocationHash(route, args) {
		return route + Router.#genParamHash(args);
	}

	static setLocationHash(route, args) {
		window.location.hash = Router.#genLocationHash(route, args);
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
			throw 'Router must recieve HTMLElement content, got: ' + content?.toString();
		}
		this.content = content;

		this.handleHashChangeEvent();
		window.addEventListener('hashchange', () => this.handleHashChangeEvent());
	}

	handleHashChangeEvent() {
		while(this.content.firstChild){
			this.content.removeChild(this.content.firstChild);
		}

		let { route, params } = Router.getCurrentRoute();

		console.log(`Router: Arrived at "${Router.#getRawCurrentRoute()}"`);

		document.title = route;
		let page = this.getRouteFromName(route);

		if (page === undefined) {
			this.go();
			return;
		}

		page.onSelect(this.content, params);

		this.#callListeners(page);
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

		console.log(`Router: Go to "${Router.#genLocationHash(page, params)}"`);

		if(Router.#genLocationHash(page, params) === Router.#getRawCurrentRoute()) {
			this.handleHashChangeEvent();
			return;
		}

		Router.setLocationHash(page, params);
	}

	isSelected(route) {
		return Router.getRouteName(route) === Router.getCurrentRoute().route;
	}

	getRouteFromName(route) {
		return route instanceof Route ? route
			: route in this.routes ? this.routes[route]
				: undefined;
	}

	addSelectListener(listener) {
		this.#callListener(listener, this.defaultRoute);
		this.selectListners.push(listener);
	}

	#callListeners(route) {
		this.selectListners.forEach(list => this.#callListener(list, route))
	}

	#callListener(list, route) {
		try {
			list(route);
		} catch (e) {
			console.log('Router select listener failed', e);
		}
	}
}
