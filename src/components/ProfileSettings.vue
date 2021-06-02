<template>
	<div>
		<button class="logout-btn" @click="signOut">
			Logout
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
			localStorage.removeItem('highScore')

			// Send user back to homepage
			this.$router.push('/')
		},
	},
}
</script>

<style>
.logout-btn{
  color: black;
  cursor: pointer;
  list-style: none;
  height: 65px;
  background-color: #f58442;
  font-weight: bold;
  font-family: 'Space Mono', monospace;
  margin: 0 auto;
  margin-top: 5px;
  margin-bottom: 5px;
  box-shadow: 2px 2px;
  font-size: 16px;
  overflow: hidden;
  overflow-wrap: break-word;
  width: 150px;
  text-align: center;
}
</style>
