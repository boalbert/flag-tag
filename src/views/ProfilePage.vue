<template>
	<div class="myprofile">
		<h1>My profile</h1>
		<ProfileUserInfo />
		<h2>Change username</h2>
    <ProfileUpdate/>
		<h2>My stats</h2>

		<h2>Log out</h2>
		<ProfileSettings />
	</div>
</template>
<script>
import ProfileSettings from '@/components/ProfileSettings.vue'
import ProfileUserInfo from '@/components/ProfileUserInfo.vue'
import ProfileUpdate from "@/components/ProfileUpdate";

export default {
	name: 'ProfilePage',
	components: {
		ProfileSettings,
		ProfileUserInfo,
    ProfileUpdate,
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

<style>

</style>
