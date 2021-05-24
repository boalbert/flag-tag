<template>
	<div class="login-registerpage-container">
		<LoginForm
			v-if="!accountExists"
			@login-account="loginAccount"
			:errors="errors"
		/>

		<SignUpForm v-else @register-account="postNewAccount" :errors="errors" />

		<p
			@click="showLoginOrSignupComponent"
			v-if="accountExists"
			class="login-signup-option"
		>
			Log in to my existing account.
		</p>

		<p
			@click="showLoginOrSignupComponent"
			v-if="!accountExists"
			class="login-signup-option"
		>
			Oops! I need to create an account.
		</p>
	</div>
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
							data.users[0].userName,
							data.users[0].highScore
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

		saveUserDetailsLocalStorage(userId, userName, highScore) {
			localStorage.setItem('userId', userId)
			localStorage.setItem('userName', userName)
			localStorage.setItem('highScore', highScore)
			bus.$emit('login-status', true)
		},
	},
}
</script>

<style>
.login-registerpage-container {
	display: flex;
	flex-direction: column;
	margin: 0 auto;
	box-shadow: 7px 7px;
	background-color: white;
	border: 2px solid black;
	padding: 15px;
}

.login-signup-option {
	text-decoration: underline;
	font-size: 14px;
	cursor: pointer;
}

@media screen and (min-width: 1050px) {
	.login-registerpage-container {
		width: 400px;
	}
}
</style>
