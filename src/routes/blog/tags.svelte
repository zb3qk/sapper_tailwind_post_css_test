<script context="module">
	export async function preload(page, session) {
        return this.fetch(`blog.json`).then(r => r.json()).then(posts => {
            const { host, path, params, query } = page;
			return { query, posts };
        });
	}
</script>

<script>
    export let query;
    export let posts;
    let post_list = []
    console.log("query", query);
    $: for (let slug in posts){
        let cur_post = posts[slug];
        let keywords = cur_post['keywords'];
        if (keywords && keywords.includes(query))
            post_list.push(cur_post);
    }
</script>


<svelte:head>
	<title>Blog {query}</title>
</svelte:head>

<div class="px-4 py-10 max-w-3xl mx-auto sm:px-6 sm:py-12 lg:max-w-l lg:py-16 lg:px-8 xl:max-w-xl">
{#if query}
    <h1 class="text-4xl font-semibold dark:text-white leading-tight">Recent posts</h1>
    <ul>
        {#each post_list as post}
            <!-- we're using the non-standard `rel=prefetch` attribute to
                    tell Sapper to load the data for the page as soon as
                    the user hovers over the link or taps it, instead of
                    waiting for the 'click' event -->
            <li class="leading-tight mt-4 bg-surface p-4 border-t-2 bg-gray-300 dark:bg-dark-surface dark:border-white border-blue-200">
                <a class="p-1 text-2xl font-semibold dark:text-white dark:hover:bg-gray-700 hover:bg-gray-200" rel='prefetch' href='/blog/content/{post.slug}'>{post.title}</a>
                <span class="dark:text-white p-1 dark:bg-information bg-dark-secondary from-surface to-primary bg-gradient-to-r">{post.date}</span>
    
                {#if post.description}
                    <p class="dark:text-gray-200 mt-2">{post.description}</p>
                {/if}
            </li>
        {/each}
    </ul>
{:else}
    <h1 class="text-4xl font-semibold dark:text-white leading-tight">No posts Found</h1>
{/if}
</div>

