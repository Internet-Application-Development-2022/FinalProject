export class Route {
	name;

	constructor(name) {
		this.name = name;
	}

	onSelect(content) { }
}

export class Router {
	routes = [];
	defaultIndex;
	selectedIndex;
	content;

	selectListners = [];

	constructor(routes, defaultIndex) {
		this.routes = routes;
		this.defaultIndex = defaultIndex;

		try {
			if (routes.length > selectedIndex) {
				this.selectedIndex = selectedIndex;
			}
		}
		catch (e) { }
	}

	setContent(content) {
		this.content = content;
	}

	isSelected(route) {
		return this.routes[this.selectedIndex] === route;
	}

	select(routeIndex) {
		if(routeIndex === undefined) {
			routeIndex = this.defaultIndex;
		}

		if (routeIndex === this.selectedIndex) {
			return;
		}

		this.selectedIndex = routeIndex;
		this.content.empty();
		console.log('Router: Routed to ' + this.routes[routeIndex].name);
		this.routes[routeIndex].onSelect(this.content);

		this.#callListeners(routeIndex);
	}

	addSelectListener(listener) {
		this.selectListners.push(listener);
	}

	#callListeners(routeIndex) {
		this.selectListners.forEach(list => {
			try {
				list(this.routes[routeIndex]);
			} catch (e) {
				console.log('Router select listener failed', e);
			}
		})
	}
}
