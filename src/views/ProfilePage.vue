<template>
	<div class="myprofile">
		<h1>Welcome!</h1>
		<ProfileUserInfo />
		<h2>Change username</h2>
		<ProfileUpdate />
		<h2>My highscore</h2>
		<ProfileScore />
    <div v-if="userName === adminName">
      <h2>Admin stuff</h2>
      <ProfileAdmin />
    </div>
		<h2>Log out</h2>
		<ProfileSettings />
	</div>
</template>
<script>
import ProfileSettings from '@/components/ProfileSettings.vue'
import ProfileUserInfo from '@/components/ProfileUserInfo.vue'
import ProfileUpdate from '@/components/ProfileUpdate'
import ProfileScore from '@/components/ProfileScore.vue'
import ProfileAdmin from "@/components/ProfileAdmin"

export default {
  name: 'ProfilePage',
  components: {
    ProfileSettings,
    ProfileUserInfo,
    ProfileUpdate,
    ProfileScore,
    ProfileAdmin,
  },
  data() {
    return {
      userName: '',
      adminName: 'Admin'
    }
  },
  mounted() {
    this.userName = localStorage.getItem('userName')
  },
}
</script>

<style></style>
