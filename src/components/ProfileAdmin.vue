<template>
<div>
  <button @click="resetClick= !resetClick" class="change-button">Reset Highscore All regions</button>
  <div v-if="resetClick">
    <p v-if="!resetSuccess">Are you sure?</p>
    <p v-if="resetSuccess">Reset successful</p>
    <button @click="resetAllRegions" class="change-button">Yes!</button>
    <button @click="resetClick = false" class="change-button">Cancel</button>
  </div>
  <button @click="deleteClick= !deleteClick" class="change-button">Delete an account</button>
  <div v-if="deleteClick" class="changeName-form">
    <form @submit.prevent="deleteAccount(userNameToDelete)">
      <input
          required
          type="text"
          placeholder="Who do you want to delete?"
          name="userNameToDelete"
          v-model.trim="userNameToDelete"
      />
      <button type="submit">
        Delete Account
      </button>
    </form>
  </div>

</div>
</template>

<script>

export default {
name: "ProfileAdmin",
  data() {
    return {
      resetClick: false,
      resetSuccess: false,
      deleteClick: false,
      userNameToDelete: ''
    }
  },

  methods: {
      resetAllRegions(){

        fetch('http://localhost:3000/highscore', {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json',
          },

        })
            .then((response) => response.json())
            .then((data) => {
              if (!data.success) {
                console.log(data.errors)
              } else if (data.success) {
                console.log("Reset successful")
                this.resetSuccess = true
              }
            })
      },
    deleteAccount(usernameToDelete){
      fetch(
          `http://localhost:3000/users/${usernameToDelete}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
        },
      })
          .then((response) => response.json())
          .then((data) => {
            if (!data.success) {
              console.log(data.errors)
            } else if (data.success) {
              console.log("Account deleted")
            }
          })
    }
  }
}
</script>

<style scoped>

</style>