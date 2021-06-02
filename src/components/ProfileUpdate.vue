<template>
  <div>
    <button @click="changeName = !changeName" class="change-button">Change Username</button>
    <div v-if="errors.length">
      <ul v-for="error in errors" :key="error.param">
        <li class="error">
          {{ error.msg }}
        </li>
      </ul>
    </div>
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
      changeName: false,
      errors: {}
    }
  },

  methods: {
    submitNewUsername(newUsername) {
      this.errors = ''
      let userId = localStorage.getItem('userId')
      let newDetails = {"userId": userId, "newUser": newUsername}

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
              this.errors = data.errors
              console.log(this.errors)
            } else if (data.success) {
              localStorage.setItem('userName', data.user.username)
              bus.$emit('current-username', data.user.username)
            }
          })
      this.newUsername = ''
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
  justify-content: center;
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

.change-button {
  padding: 5px;
}

.error {
  color: #b00020;
  list-style: none;
}
</style>