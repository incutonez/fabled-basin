import { createRouter, createWebHashHistory } from "vue-router";
import ViewGame from "@/views/ViewGame.vue";
import ViewWorldBuilder from "@/views/ViewWorldBuilder.vue";

const RouteHome = "route-home";
const RouteViewWorldBuilder = "route-view-world-builder";

export const router = createRouter({
	history: createWebHashHistory(),
	routes: [{
		path: "/",
		component: ViewGame,
		name: RouteHome,
	}, {
		path: "/world-builder",
		component: ViewWorldBuilder,
		name: RouteViewWorldBuilder,
	}],
});

export function viewWorldBuilder() {
	return router.push({
		name: RouteViewWorldBuilder,
	});
}
