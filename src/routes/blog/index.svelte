<script context="module">
	// https://flaviocopes.com/sapper-redirect-to-url/
	export async function preload(page, session) {
	  return this.redirect(301, '/')
	}
  </script>