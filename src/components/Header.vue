<template>
	<header>
		<div>

			<img class="logo" src="../img/logga.png" alt="logo" />

			<router-link to="/" class="router-links">Home</router-link>
			<router-link to="/profile" v-if="signedIn" class="router-links"
				>👱🏻‍♀️ Profile</router-link
			>
			<router-link to="/register" v-else class="router-links">
				Sign in</router-link
			>
            <button class="dark-button"  @click="toggleTheme" aria-label="Toggle themes">
                <span v-if="this.theme === 'darkMode'"> Light</span>
                <span v-else> Dark</span>
            </button>
		</div>

		<router-link to="/" class="router-links"
			><i class="fas fa-home"> </i> HOME
		</router-link>
		<router-link to="/profile" v-if="signedIn" class="router-links"
			><i class="fas fa-user-circle"></i> {{ userName }}</router-link
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
			userName: String
            theme: '', //When this property is empty, the theme is set to the default theme i.e. light mode.
		}
	},
	created() {
		// Listen for login-status emitted by sign out / sign in functions.
		// Used for displaying profile link or register link
		bus.$on('login-status', (data) => {
			this.signedIn = data.loggedIn
			this.userName = data.userName
		})
		bus.$on('current-username', (data) => {
			this.userName = data
		})
	},  mounted() {
        let localTheme = localStorage.getItem('theme'); //gets stored theme value if any
        document.documentElement.setAttribute('data-theme', localTheme); // updates the data-theme attribute
    },

    methods:{toggleTheme() {
            this.theme = this.theme === 'darkMode' ? '' : 'darkMode'; //toggles theme value
            document.documentElement.setAttribute('data-theme', this.theme); // updates the data-theme attribute
            localStorage.setItem('theme', this.theme); // stores theme value in local storage
            console.log("button press")


        }}
}
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Arvo:wght@700&family=Open+Sans&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@500&display=swap');
<style>

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
		margin-left: 15px;
		margin-right: 15px;
	}
	.logo {
		justify-self: flex-start;
		margin-left: 50px;
		display: block;
	}
}
</style>
