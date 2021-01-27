
<script>
    import { spring } from 'svelte/motion';
    import Rectangle from "../../components/svg/rectangle.svelte";
    let coords = spring({ x: 50, y: 50 }, {
		stiffness: 0.1,
		damping: 0.25
	});
</script>

<style>
	svg { width: 100%; height: 100% }
</style>

<svg width="400" height="180" 
    on:mousemove="{e => coords.set({ x: e.clientX, y: e.clientY })}">

    <rect x="50" y="20" width="150" height="150"
    style="fill:blue;stroke:pink;stroke-width:5;fill-opacity:0.1;stroke-opacity:0.9" />

    <Rectangle width="150" height="150" />

    <Rectangle coords={$coords} />
</svg>