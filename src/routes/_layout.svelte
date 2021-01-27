<script context="module">
	export const preload = () => {};
</script>

<script>
	import { stores } from "@sapper/app";
	import { theme } from "../stores/local-store.js";
	import Nav from "../components/Nav.svelte";

	// You may not want to use `segment`, but it is passed for the time being and will
	// create a warning if not expected: https://github.com/sveltejs/sapper-template/issues/210
	// https://github.com/sveltejs/sapper/issues/824
	export let segment = "";
	// Silence unused export property warning
	// eslint-disable-next-line no-empty
	if (segment) {}

	const { page } = stores();
	$: path = $page.path.slice(1);

	// Dark theme
	// Make sure we're running on the client
	if (process.browser) {
    // Before we can use set on country we need to call the
    // useLocalStorage doing this at the _layout file makes
    // all routes and components exposed to this so we can
    // import the state and call set anywhere like Btn.svelte
	theme.useLocalStorage();
	}
</script>

<svelte:head>
	<title>
		{path ? path.charAt(0).toUpperCase() + path.slice(1) : "Index"}
	</title>
</svelte:head>

<div id="body" class={$theme}>
	<div class="flex flex-col w-full min-h-screen leading-none dark:bg-dark-bg">
	<div class="flex flex-col flex-1" id="sapper">
		<Nav />
		<slot />
	</div>
	</div>
</div>
