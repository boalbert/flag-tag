<template>
	<div class="myprofile">
		<h1>My profile</h1>
		<h2>Change username</h2>
		<h2>My stats</h2>
		<button @click="logOut">
			Log out (Clear localStorage)
		</button>
	</div>
</template>
<script>
export default {
	methods: {
		logOut() {
			localStorage.removeItem('userId')
			localStorage.removeItem('userName')
			this.$router.push('/')
		},
	},
}
</script>

<style></style>
