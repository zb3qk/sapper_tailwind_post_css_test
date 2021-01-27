<script>
    import Nav from "../components/Nav.svelte";
    const fs = require('fs');

    export let title = "Placeholder Title";
    export let description = "This is the default description.";
    const stats = fs.statSync(path)
    export let date = stats.mtime.toDateString;
    export let keywords = ["svelte", "sapper", "tailwind", "mdsvex"];
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={description}>
    <meta name="keywords" content={keywords}>
    <meta name="author" content="Zac Bilmen">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</svelte:head>

<Nav />
<h1> asdasd </h1>
<h1>{title}</h1>
<h3>{date}</h3>

{#each keywords as keyword}
    <h4>{keyword}</h4>    
{/each}