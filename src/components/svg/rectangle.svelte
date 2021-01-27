<script>
    import { spring } from 'svelte/motion';

    export let coords = {x: 12, y: 13};
    export let width = 100;
    export let height = 100;
    
    let is_selected = false;
</script>

<style>
    .default {
        fill:rgb(0,0,255);
        stroke-width:3;
        stroke:rgb(255,255,255);
    }
    .selected{
        fill:rgb(0,0,255);
        stroke-width:3;
        stroke:rgb(0,0,0);
    }
</style>

<rect x={coords.x} y={coords.y} width={width} height={height} class="{is_selected ? "selected" : "default" }" 
on:drag={() => coords = {}}
on:pointerleave={() => is_selected = false}
on:pointerenter={() => is_selected = true}
/>