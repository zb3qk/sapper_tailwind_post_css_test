<script>
	export let status;
	export let error;

	const mode = process.env.NODE_ENV;
	const dev = mode === "development";
</script>

<section class="flex flex-1 flex-col items-center justify-center">
	<h1 class="text-red-700 text-2xl dark:text-white">{error.message}</h1>
	<h2 class="mt-1 text-red-700 text-lg dark:text-white">{status}</h2>
</section>

{#if dev && error.stack}
	<pre class="dark:text-white">{error.stack}</pre>
{/if}
