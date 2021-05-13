<template>
	<div>
		<p>Logged in as {{ userInfo.userName }}</p>
	</div>
</template>

<script>
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
}
</script>

<style></style>
