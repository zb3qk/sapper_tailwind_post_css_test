<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`blog.json`).then(r => r.json()).then(posts => {
			return { posts };
		});
	}
</script>

<script>
	import 'highlight.js/styles/atom-one-dark.css';
    export let posts;
	import { stores } from "@sapper/app";
	import Nav from "../../../components/Nav.svelte";
	import { each } from 'svelte/internal';
	import BlogHead from "../../../components/blogHead.svelte";
	import Scroller from '@sveltejs/svelte-scroller';


	// You may not want to use `segment`, but it is passed for the time being and will
	// create a warning if not expected: https://github.com/sveltejs/sapper-template/issues/210
	// https://github.com/sveltejs/sapper/issues/824
	export let segment = "";
	// Silence unused export property warning
	// eslint-disable-next-line no-empty
	if (segment) {}

	// Acquire Post data from local store
	const { page } = stores();
    $: path = $page.path.slice(1);
    $: name = path.split("/").slice(-1)[0];
	$: post_data = posts[name];
	// $: console.log(post_data)

	// Initial variables for Scroller
	let count;
	let index;
	let offset;
	let progress;
	let top = 0.1;
	let threshold = 0.5;
	let bottom = 0.9;
	$: console.log(index);
</script>

<svelte:head>
	<meta charset="UTF-8">
	<meta name="description" content={post_data.description}>
	<meta name="keywords" content="{post_data.keywords}">
	<meta name="author" content="Zac Bilmen">
	<title>
		{path ? path.charAt(0).toUpperCase() + path.slice(1) : "Index"}
	</title>
</svelte:head>

<!-- Top part of Blog -->
<BlogHead post_data={post_data} />

<!-- Centered column -->
<div class="px-4 py-10 max-w-3xl mx-auto sm:px-6 sm:py-12 lg:max-w-4xl lg:py-16 lg:px-8 xl:max-w-6xl">
	<div class="flex">
		<!-- Tailwind typography -->
		<article class="prose dark:prose-dark prose-lg md:prose-md dark:prose-dark w-full">
			<!-- Scroll progression tracker (for Table of contents) -->
			<Scroller
			{top}
			{threshold}
			{bottom}
			bind:count
			bind:index
			bind:offset
			bind:progress
		>
		<div slot="background">
		</div>
		<!-- Contents of Blog -->
		<div slot="foreground" class="">
		<slot />
		</div>	
		</Scroller>
		</article>
		
		<!-- Table of Contents -->
		{#if post_data.headers}
		<aside class="p-5 border-solid border-black border-2 shadow-md w-1/6 break-words inline-block fixed lg:right-2 top-28 right-20 min:hidden">
			<h3 class="text-lg font-bold dark:text-white">Table of Contents</h3>

			{#each post_data.headers as header, id}
				<a href="/blog/content/{post_data.slug}#{header.toLowerCase().replace(/[^\w]+/g, '-')}">
				{#if index == id}
				<p class="bg-gray-100 dark:bg-dark-surface dark:text-white p-2">{header}</p>
				{:else}
				<p class="p-2 dark:text-white">{header}</p>
				{/if}
				</a>
			{/each}
			</aside>
		{/if}
	</div>
</div>