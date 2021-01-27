<script>
    export let post_data = {keywords: [], description: ""};
    $: keywords = post_data.keywords;
    $: description = post_data.description;
</script>

<div class="mb-4 md:mb-0 min:w-full lg_min:w-1/2 max-w-screen-md mx-auto relative" style="height: 15em;">
    <div class="absolute left-0 bottom-0 w-full h-full z-10 animate-pulse"
      style="background-image: linear-gradient(180deg,transparent,rgba(0,0,0,.1));">
    </div>
    {#if post_data.image}
    <img src="https://source.unsplash.com/{post_data.image}/1600x900"
    class="absolute left-0 top-0 w-full h-full z-0 object-cover" alt="{post_data.title}: Blog Post Banner"/>
    {:else}
    <img src="https://source.unsplash.com/WLUHO9A_xik/1600x900"
    class="absolute left-0 top-0 w-full h-full z-0 object-cover" alt="{post_data.title}: Blog Post Banner"/>
    {/if}
    <div class="p-4 absolute bottom-0 left-0 z-20">
      {#if keywords}
          {#each keywords as keyword}
          <a href="#"
          class="px-4 py-1 bg-gray-800 text-gray-200 inline-flex items-center justify-center mb-2 mr-1">{keyword}</a>
          {/each}
      {/if}
      <h2 class="text-4xl font-semibold dark:text-gray-100 leading-tight bg-opacity-70 bg-white dark:bg-dark-bg p-4">
        {post_data.title}
      </h2>
      <div class="flex mt-3">
        <div>
        {#if post_data.date}
          <p class="font-semibold text-white text-xs px-4 py-1 bg-purple-500"> {post_data.date} </p>
        {/if}
        </div>
      </div>
      <div class="flex mt-3">
        <div>
        {#if post_data.time}
          <p class="font-semibold text-white text-xs px-4 py-1 bg-gray-500"> {post_data.time} {post_data.time == 1 ? "min" : "mins"} </p>
        {/if}
        </div>
      </div>
    </div>
  </div>