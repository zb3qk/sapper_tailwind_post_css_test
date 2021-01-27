<script>
	import ToggleButton from "./toggleButton.svelte";
	import { theme } from "../stores/local-store.js";
	import { onMount } from 'svelte';
	export let segment;

	$: console.log($theme);
</script>

<style>
	nav {
		border-bottom: 1px solid rgba(255,62,0,0.1);
		font-weight: 300;
		padding: 0 1em;
	}

	ul {
		margin: 0;
		padding: 0;
	}

	/* clearfix */
	ul::after {
		content: '';
		display: block;
		clear: both;
	}

	li {
		display: block;
		float: left;
	}

	.selected {
		position: relative;
		display: inline-block;
	}

	.selected::after {
		position: absolute;
		content: '';
		width: calc(100% - 1em);
		height: 2px;
		background-color: rgb(255,62,0);
		display: block;
		bottom: -1px;
	}

	a {
		text-decoration: none;
		/* padding: 1em 0.5em; */
		margin: 5px 0px;
		display: block;
	}
</style>

<svelte:body class={$theme} />

<nav class="mt-5 css-selector">
	<button on:click={() => theme.set($theme === 'dark' ? 'light' : 'dark')}
		class="hover:bg-information rounded-full h-7 w-7 justify-center transition">{$theme === 'dark' ? '🌛' : '🌞'}</button>
	<div class="flex justify-center">
		<a href="/" class="font-bold text-2xl dark:text-white hover:underline transition">I don't blog a lot</a>
	</div>
	<div class="flex justify-center">
		<a href="/" class="text-lg font-semibold dark:text-white hover:underline transition">notes</a>
	</div>
	<div class="flex justify-center mt-5 mb-2">
		<p class="dark:text-white">Zac Bilmen</p>
	</div>
</nav>
