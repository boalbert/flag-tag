<template>
	<main>
		<div class="form-container">
			<div v-if="accountExists">
				<LoginForm @login-account="loginAccount" :errors="errors" />
			</div>
			<div v-else>
				<SignUpForm @register-account="postNewAccount" :errors="errors" />
			</div>

			<p
				@click="showLoginOrSignupComponent"
				v-if="!accountExists"
				class="text--underline text__smallLoginText"
			>
				Log in to my existing account.
			</p>

			<p
				@click="showLoginOrSignupComponent"
				v-if="accountExists"
				class="text--underline text__smallLoginText"
			>
				Oops! I need to create an account.
			</p>
		</div>
	</main>
</template>

<script>
import { bus } from '../main'
import SignUpForm from '@/components/SignUpForm.vue'
import LoginForm from '@/components/LoginForm.vue'

export default {
	name: 'LoginRegisterPage',
	components: {
		SignUpForm,
		LoginForm,
	},
	data() {
		return {
			accountExists: false,
			errors: {},
		}
	},
	methods: {
		showLoginOrSignupComponent() {
			// Clear errors array when switching between signup/login
			this.errors = ''
			this.accountExists = !this.accountExists
		},
		postNewAccount(accountDetails) {
			fetch('http://localhost:3000/users', {
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify(accountDetails),
			})
				.then((response) => response.json())
				.then((data) => {
					if (!data.success) {
						// Error message is sent to SignUpForm component as array and displayed there
						this.errors = data.errors
					} else if (data.success) {
						this.saveUserDetailsLocalStorage(
							data.users.userId,
							data.users.username
						)

						this.$router.push('/')
					}
				})
		},

		loginAccount(loginDetails) {
			fetch(
				`http://localhost:3000/users/${loginDetails.username}/${loginDetails.password}`
			)
				.then((response) => response.json())
				.then((data) => {
					// Login success
					// Save userdetails to localstorage
					// Redirect to homepage
					// Send loginstatus true via eventbus
					if (data.users.length > 0) {
						this.saveUserDetailsLocalStorage(
							data.users[0].userId,
							data.users[0].userName
						)
						this.$router.push('/')
					} else {
						// Login failed
						// Error message is sent to SignUpForm component as array and displayed there
						this.errors =
							'Failed to login. Please check username and/or password.'
					}
				})
		},

		saveUserDetailsLocalStorage(userId, userName) {
			localStorage.setItem('userId', userId)
			localStorage.setItem('userName', userName)
			bus.$emit('login-status', true)
		},
	},
}
</script>

<style>
main {
	display: flex;
	flex-direction: column;
	width: 95%;
	margin: 15px auto;
	max-width: 1400px;
}

.form-container {
	margin: 0 auto;
	border: 1px solid rgb(243, 243, 243);
	padding: 40px 80px;
	box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}

.button_signup-login {
	color: #f7931e;
    border-radius: 5px;
    border: 1px solid rgb(243, 243, 243);
	margin-top: 20px;
	height: 70px;
	font-size: 20px;
}

@media screen and (min-width: 1050px) {
	.button_signup-login {
		height: 35px;
	}
}

button {
	background-color: #3333ff;

}

.text--underline {
	text-decoration: underline;
}

.text__smallLoginText {
	font-size: 14px;
}

.text--underline:hover {
	cursor: pointer;
}
p {
    font-family: Arial, sans-serif;
    color: #3333ff;
}

.error-text {
	color: #b00020;
}

.error-text--heading {
	font-size: 15px;
}

.listItem--error {
	font-size: 14px;
	padding: 0px;
}
</style>
