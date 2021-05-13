<template>
	<header>
		<div>
			<h2>💡</h2>
		</div>
		<div>
            <img src="../img/logga.png" height="255" width="255" alt="logo"/></div>
		<div>
			<router-link to="/" class="router-links">Home</router-link>
			<router-link to="/profile" v-if="signedIn" class="router-links"
				>👱🏻‍♀️ Profile</router-link
			>
			<router-link to="/register" v-else class="router-links">
				Sign up / Sign in</router-link
			>
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
	align-items: baseline;
	border-bottom: 2px solid lightgray;
	margin-bottom: 50px;
	background-color: rgb(247, 247, 247);
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
