<template>
	<div class="myprofile">
		<h1>My profile</h1>
		<ProfileUserInfo />
		<h2>Change username</h2>

		<h2>My stats</h2>

		<h2>Log out</h2>
		<ProfileSettings />
	</div>
</template>
<script>
import ProfileSettings from '@/components/ProfileSettings.vue'
import ProfileUserInfo from '@/components/ProfileUserInfo.vue'

export default {
	name: 'ProfilePage',
	components: {
		ProfileSettings,
		ProfileUserInfo,
	},
	methods: {
		logOut() {
			localStorage.removeItem('userId')
			localStorage.removeItem('userName')
			// Send user back to homepage after logging out
			this.$router.push('/')
		},
	},
}
</script>

<style></style>
