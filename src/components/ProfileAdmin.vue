<template>
  <div class="admin-container">
    <div class="resetAllHighscores">
      <button @click="resetClick= !resetClick" class="menu-button">Reset highscore All regions</button>
      <div v-if="resetClick" class="resetAll">
        <p v-if="!resetSuccess">Are you sure?</p>
        <p v-if="resetSuccess">Reset successful</p>
        <button @click="resetAllRegions" class="resetAll-buttons">Yes</button>
        <button @click="resetClick = false" class="resetAll-buttons">Cancel</button>
      </div>
    </div>
    <div class="resetOneHighscore">
      <button @click="resetOneCheck" class="menu-button">Reset one players highscore</button>
      <div v-if="resetOne" class="resetOne-form">
        <p v-if="resetOneSuccess">{{ messageReset }}</p>
        <form @submit.prevent="resetOneAccount(userNameToReset)">
          <input
              required
              type="text"
              placeholder="Enter username to reset"
              name="userNameToReset"
              v-model.trim="userNameToReset"
          />
          <button type="submit" class="resetone-button"> Reset players highscore</button>
        </form>
        <button @click="resetOneCheck" class="resetone-button">Cancel</button>
      </div>
    </div>
    <div class="deleteOneAccount">
      <button @click="deleteAccountCheck" class="menu-button">Delete an account</button>
      <div v-if="deleteClick" class="deleteAccount-form">
        <p v-if="deleteSuccess">{{ messageDelete }}</p>
        <form @submit.prevent="deleteAccount(userNameToDelete)">
          <input
              required
              type="text"
              placeholder="Enter username to delete"
              name="userNameToDelete"
              v-model.trim="userNameToDelete"
          />
          <button type="submit" class="deleteone-button"> Delete Account</button>
        </form>
        <button @click="deleteAccountCheck" class="deleteone-button">Cancel</button>
      </div>
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
      resetOneSuccess: false,
      deleteSuccess: false,
      deleteClick: false,
      resetOne: false,
      userNameToDelete: '',
      userNameToReset: '',
      messageDelete: '',
      messageReset: '',
    }
  },

  methods: {
    resetOneCheck() {
      this.resetOne = !this.resetOne
      if (!this.resetOne) {
        this.resetOneSuccess = false;
      }
    },
    deleteAccountCheck() {
      this.deleteClick = !this.deleteClick
      if (!this.deleteClick) {
        this.deleteSuccess = false;
      }
    },
    resetAllRegions() {

      fetch('http://localhost:3000/highscore', {
        method: 'PUT',

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
    deleteAccount(usernameToDelete) {
      fetch(
          `http://localhost:3000/users/${usernameToDelete}`, {
            method: 'DELETE',
            headers: {
              'Content-type': 'application/json',
            },
          })
          .then((response) => response.json())
          .then((data) => {
            this.messageDelete = data.msg
            this.userNameToDelete = ''
            this.deleteSuccess = true
          })
    },
    resetOneAccount(usernameToReset) {
      fetch(`http://localhost:3000/highscore/${usernameToReset}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },

      })
          .then((response) => response.json())
          .then((data) => {
            this.messageReset = data.msg
            this.userNameToReset = ''
            this.resetOneSuccess = true
          })
    },
  }
}
</script>

<style scoped>

.admin-container {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
}

form input {
  padding: 5px;
  height: 40px;
  justify-content: center;
  color: black;
  cursor: pointer;
  list-style: none;
  font-weight: bold;
  font-family: 'Space Mono', monospace;
  margin: 0 auto;
  margin-top: 5px;
  margin-bottom: 20px;
  box-shadow: 2px 2px 2px 2px;
  font-size: 16px;
  overflow: hidden;
  overflow-wrap: break-word;
  width: 150px;
  text-align: center;
  border: none;
}

p{
  font-family: 'Space Mono', monospace;
  font-size: 18px;
}

button {
  color: black;
  cursor: pointer;
  list-style: none;
  background-color: #f58442;
  font-weight: bold;
  font-family: 'Space Mono', monospace;
  margin: 0 auto;
  margin-top: 5px;
  margin-bottom: 8px;
  box-shadow: 2px 2px;
  font-size: 16px;
  overflow: hidden;
  overflow-wrap: break-word;
  text-align: center;
  border: none;
}

.menu-button {
  width: 300px;
  height: 65px;
}

.resetAll-buttons {
  margin-bottom: 20px;
  margin-right: 10px;
  height: 50px;
  width: 80px;
}

.resetone-button {
  margin-top: -5px;
  width: 165px;
  height: 50px;
}

.deleteone-button {
  margin-top: -5px;
  width: 165px;
  height: 50px;
}
</style>