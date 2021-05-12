<template>
	<header>
		<div>
			<h2>💡</h2>
		</div>
		<div>
			<h1>FlagTag 🚩</h1>
		</div>
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
export default {
	name: 'Header',
	data() {
		return {
			signedIn: '',
		}
	},
	methods: {
		checkLoginStatus() {
			if (localStorage.getItem('userId') && localStorage.getItem('userName')) {
				this.userDetails = {
					userId: localStorage.getItem('userId'),
					userName: localStorage.getItem('userName'),
				}
				this.signedIn = true
			} else {
				console.log('Not logged in')
				this.signedIn = false
			}
		},
	},
	created() {
		this.checkLoginStatus()
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
