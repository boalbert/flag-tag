<template>
	<div>
		<p>Logged in as {{userInfo.userName}} </p>
		
	</div>
</template>

<script>
import { bus } from '../main'
export default {
	name: 'ProfileUserInfo',
	data() {
		return {
			userInfo: {
				userId: '',
				userName: '',
			},
		}
	},
	mounted() {
		this.userInfo.userId = localStorage.getItem('userId')
		this.userInfo.userName = localStorage.getItem('userName')
	},
  created() {
    // Listen for login-status emitted by sign out / sign in functions.
    // Used for displaying profile link or register link
    bus.$on('current-username', (data) => {
      this.userInfo.userName = data
    })
  },
}
</script>

<style></style>
