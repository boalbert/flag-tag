<template>
	<div>
		<button @click="signOut">
			Log out (Clear localStorage)
		</button>
	</div>
</template>

<script>
import { bus } from '../main'

export default {
	name: 'ProfileSettings',
	methods: {
		signOut() {
			// Sends login-status via event-bus
			bus.$emit('login-status', false)

			// Remove user details from localstorage
			localStorage.removeItem('userId')
			localStorage.removeItem('userName')

			// Send user back to homepage
			this.$router.push('/')
		},
	},
}
</script>

<style></style>
