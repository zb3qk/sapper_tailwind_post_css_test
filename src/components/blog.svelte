<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`blog.json`).then(r => r.json()).then(posts => {
			return { posts };
		});
	}
</script>

<script>
	export let posts;
	let post_list = [];
	// console.log(posts);
	$: for (const post_k in posts) {
		post_list.push(posts[post_k])
	}
	// console.log(post_list);
</script>

<style>
	ul {
		margin: 0 0 1em 0;
		line-height: 1.5;
	}
</style>

<svelte:head>
	<title>Blog</title>
</svelte:head>

<div class="px-4 py-10 max-w-3xl mx-auto sm:px-6 sm:py-12 lg:max-w-l lg:py-16 lg:px-8 xl:max-w-xl">
<h1 class="text-4xl font-semibold dark:text-dark-primary leading-tight">Recent posts</h1>

<ul>
	{#each post_list as post}
		<!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
		<li class="leading-tight mt-4 bg-surface p-4 border-t-2 bg-gray-300 dark:bg-dark-surface dark:border-white border-blue-200">
			<a class="p-1 text-2xl font-semibold dark:text-dark-secondary hover:bg-gray-200" rel='prefetch' href='/blog/content/{post.slug}'>{post.title}</a>
			<span class="dark:text-white p-1 bg-dark-secondary from-surface to-primary bg-gradient-to-r">{post.date}</span>

			{#if post.description}
				<p class="mt-2">{post.description}</p>
			{/if}
		</li>
	{/each}
</ul>
</div>