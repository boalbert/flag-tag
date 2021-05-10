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
	font-size: 14px;
	line-height: 130%;
}

h1 {
	font-family: 'Arvo', Georgia, serif;
}

h1 {
	font-size: 45px;
}

h2 {
	font-size: 30px;
}

p {
	font-size: 16px;
}

#app {
	font-family: 'Open Sans', Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

#nav {
	padding: 30px;
}

#nav a {
	font-weight: bold;
	color: #2c3e50;
}

#nav a.router-link-exact-active {
	color: #42b983;
}
</style>
