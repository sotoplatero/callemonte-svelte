<script>
	import store from 'store/dist/store.modern'
	import expirePlugin from 'store/plugins/expire'

	store.addPlugin(expirePlugin)

	export let product;

	let favorites = store.get('favorites') || [];
	// let favorites = [];

	function handleFavorite() {
		// console.log(favorites)
		favorites = product.isFavorite ? 
			favorites.filter( el => el.url !== product.url ) :
			[...favorites, product];
	}

	$: store.set('favorites', favorites,  );

	$: product.isFavorite = favorites.some( el => el.url === product.url );

</script>

<span>
	<button
		class="text-left text-sm hover:text-blue-500 {product.isFavorite ? 'text-yellow-300' : ''}" 
		title="Seleccionar"
		on:click|preventDefault="{handleFavorite}"
	>

<!-- 		{#if product.isFavorite}

			<svg class="h-5 w-5 inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
			  <path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd" />
			</svg>

		{:else} -->

			<svg class="h-5 w-5 inline"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
			</svg>
			
		<!-- {/if} -->
		<span class="hidden sm:inline ml-2">Favorito</span>
	</button> 
</span>