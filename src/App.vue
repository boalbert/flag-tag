<template>
	<div id="app">
		<Header />
		<router-view />
	</div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
	components: {
		Header,
	},
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Arvo:wght@700&family=Open+Sans&display=swap');

p {
	font-size: 16px;
	line-height: 130%;
}

h1 {
	font-family: 'Space Mono', monospace;
	letter-spacing: 2px;
	font-size: 45px;
}

h2 {
	font-family: 'Space Mono', monospace;
	letter-spacing: 2px;
	font-size: 30px;
}

#app {
	font-family: 'Open Sans', sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: black;
	max-width: 1400px;
	margin: 0 auto;
	background-color: #faf8f0;
}
</style>
