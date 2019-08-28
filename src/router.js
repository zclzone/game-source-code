import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Sudoku from './views/Sudoku.vue';
import Loop from './views/Loop.vue';
import Snake from './views/Snake.vue';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home
		},
		{
			path: '/sudoku',
			name: 'sudoku',
			component: Sudoku
		},
		{
			path: '/loop',
			name: 'Loop',
			component: Loop
		},
		{
			path: '/snake',
			name: 'Snake',
			component: Snake
		}
	]
});
