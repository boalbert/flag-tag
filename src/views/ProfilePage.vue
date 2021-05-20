<template>
	<div class="myprofile">
		<h1>My profile</h1>
		<ProfileUserInfo />
		<h2>Change username</h2>
		<ProfileUpdate />
		<h2>My highscore</h2>
		<ProfileScore />
		<h2>Log out</h2>
		<ProfileSettings />
	</div>
</template>
<script>
import ProfileSettings from '@/components/ProfileSettings.vue'
import ProfileUserInfo from '@/components/ProfileUserInfo.vue'
import ProfileUpdate from '@/components/ProfileUpdate'
import ProfileScore from '@/components/ProfileScore.vue'

export default {
	name: 'ProfilePage',
	components: {
		ProfileSettings,
		ProfileUserInfo,
		ProfileUpdate,
		ProfileScore,
	},
}
</script>

<style></style>
