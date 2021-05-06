<template>
	<section>
		<Header />
		<Index />
	</section>
</template>

<script>
// @ is an alias to /src
import Index from '@/components/Index.vue'
import Header from '@/components/Header.vue'


export default {
	name: 'Home',
	components: {
		Header,
		Index,
	},
}
</script>

<style>
button {
	color: white;
	border-radius: 5px;
}

.button__gameOptions {
	background-color: #007bff;
	text-transform: uppercase;
	font-size: 25px;
	width: 300px;
	height: 100px;
	border: 0;
	margin: 25px 0 25px 0;
}

.button__darkMode {
	font-size: 25px;
	border: 0;
	background-color: none;
}

.game-mode-container {
	display: flex;
	flex-direction: column;
	grid-column-start: 2;
	margin: 0 auto;
}
</style>
