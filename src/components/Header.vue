<template>
	<header>
		<div class="container-logo">
			<img class="logo-img" src="../img/logga.png" alt="logo" />
		</div>

		<div class="motto">
			<p>Use your swag to brag in FlagTag!</p>
		</div>

		<div>
			<router-link to="/" class="router-links">Home</router-link>
			<router-link to="/profile" v-if="signedIn" class="router-links"
				>👱🏻‍♀️ Profile</router-link
			>
			<router-link to="/register" v-else class="router-links">
				Sign in</router-link
			>
			💡
		</div>
	</header>
</template>

<script>
import { bus } from '../main'

export default {
	name: 'Header',
	data() {
		return {
			signedIn: false,
		}
	},
	created() {
		// Listen for login-status emitted by sign out / sign in functions.
		// Used for displaying profile link or register link
		bus.$on('login-status', (data) => {
			this.signedIn = data
		})
	},
}
</script>

<style>
header {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	height: 85px;
	border-bottom: 2px solid lightgray;
	margin-bottom: 50px;
	margin: 0 0 100px 0;
	align-items: center;
	/* background-color: rgb(247, 247, 247); */
}

header > div {
	/* border: 2px solid red; */
}

.container-logo {
	justify-self: left;
	padding: 0 0 0 25px;
}

.logo-img {
	width: 130px;
	height: 100%;
}
.motto{
  color: #125DB3;
}

.router-links {
	text-decoration: underline;
	font-family: Helvetica, sans-serif;
	font-size: 18px;
	color: black;
	font-weight: bold;
	padding: 20px;
}
</style>
