<template>
	<header>
		<div>
			<h2>💡</h2>
		</div>
		<div>
            <img src="../img/logga.png" height="255" width="255" alt="logo"/></div>
		<div>
			<!-- Dölj om man ej är inloggad  -->
			<!-- Alternativt visa Log in / Sign up om man ej är inloggad -->
			<router-link to="/">Home</router-link>
			<router-link to="/profile" v-if="signedIn">| 👱🏻‍♀️ Profile</router-link>
			<router-link to="/register" v-else>| 🚪 Sign up / Sign in</router-link>
		</div>
	</header>
</template>

<script>
export default {
	name: 'Header',
	props: {
		signedIn: Boolean,
	},
}
</script>

<style>
header {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	align-items: baseline;
	border-bottom: 2px solid lightgray;
	margin-bottom: 50px;
	background-color: rgb(247, 247, 247);
}
</style>
