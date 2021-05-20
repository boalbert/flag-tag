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
            <button class="dark-button"  @click="toggleTheme" aria-label="Toggle themes">
                <span v-if="this.theme === 'darkMode'"> Light</span>
                <span v-else> Dark</span>
            </button>
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
            theme: '' //When this property is empty, the theme is set to the default theme i.e. light mode.
		}
	},
	created() {
		// Listen for login-status emitted by sign out / sign in functions.
		// Used for displaying profile link or register link
		bus.$on('login-status', (data) => {
			this.signedIn = data
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
