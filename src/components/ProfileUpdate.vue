<template>
  <div>
    <button @click="changeName = !changeName" class="change-button">Change username</button>
    <div v-if="changeName" class="changeName-form">
      <form @submit.prevent="submitNewUsername(newUsername)">
        <input
            required
            type="text"
            placeholder="New username"
            name="newUsername"
            v-model.trim="newUsername"
        />
        <button type="submit">
          Update now!
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import {bus} from "@/main";

export default {
  name: "ProfileUpdate",

  data() {
    return {
      newUsername: '',
      changeName: false
    }
  },

  methods: {
    submitNewUsername(newUsername) {
      console.log(newUsername)
      console.log(localStorage.getItem('userId'))
      let userId = localStorage.getItem('userId')
      let newDetails = {"userId": userId, "newUser": newUsername}
      console.log(newDetails)

      fetch('http://localhost:3000/users/update', {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },

        body: JSON.stringify(newDetails),

      })
          .then((response) => response.json())
          .then((data) => {
            if (!data.success) {
              // Error message is sent to SignUpForm component as array and displayed there
              this.errors = data.errors
            } else if (data.success) {
              console.log(data.user.username)
              localStorage.setItem('userName', data.user.username)
              bus.$emit('current-username', data.user.username)
            }
          })
    },
  },
}

</script>

<style scoped>

form{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
}

form input{
  padding: 5px;
}

form button{
  margin-top: 5px;
  padding: 10px;
}

button {
  color: #f7931e;
}

.change-button {
  padding: 5px;
}
</style>