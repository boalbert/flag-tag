<template>
	<header>
		<div>
			<img class="logo" src="../img/logga.png" alt="logo" />
		</div>

		<router-link to="/" class="router-links"
			><i class="fas fa-home"> </i> HOME
		</router-link>
		<router-link to="/profile" v-if="signedIn" class="router-links"
			><i class="fas fa-user-circle"></i> PROFILE</router-link
		>
		<router-link to="/register" v-else class="router-links">
			<i class="fas fa-sign-in-alt"> </i> SIGN IN<span></span>
		</router-link>
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

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Arvo:wght@700&family=Open+Sans&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@500&display=swap');

img {
	width: 90px;
	height: 100%;
}

.router-links {
	color: #1b4d7a;
	text-decoration: none;
	font-size: 18px;
	padding: 20px;
	font-family: 'Space Mono', monospace;
	color: black;
}

.logo {
	display: none;
}
header {
	display: flex;
	flex-direction: column;
	height: 150px;
	box-shadow: 7px 7px;

	/* margin: 0 5px 100px 5px; */
	margin: 0 auto;
	margin-bottom: 50px;
	align-items: center;
	background: linear-gradient(90deg, #125db3 35%, #f5b442 100%);
}

@media screen and (min-width: 1050px) {
	header {
		max-width: 1400px;
		display: grid;
		grid-template-columns: 1fr auto auto auto;
		justify-content: space-around;
		height: 100px;
	}
	.logo {
		justify-self: flex-start;
		margin-left: 50px;
		display: block;
	}
}
</style>
