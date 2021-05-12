<template>
	<main>
		<div v-if="redirectToHomePage" class="redirectDialog">
			<p>
				Logged in as
				<b
					><span> {{ users.username }} </span></b
				>.
			</p>
			<p>Go back to home and try a challenge!</p>
		</div>
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

			<!-- Temporary, move this printout -->
			<p v-if="this.users.length > 0">Logged in as: {{ users[0].userName }}</p>
		</div>
	</main>
</template>

<script>
import SignUpForm from '@/components/SignUpForm.vue'
import LoginForm from '@/components/LoginForm.vue'

export default {
	name: 'Home',
	components: {
		SignUpForm,
		LoginForm,
	},
	data() {
		return {
			accountExists: false,
			errors: {},
			users: [],
			redirectToHomePage: false,
		}
	},
	methods: {
		showLoginOrSignupComponent() {
			// Clear errors array when switching
			this.errors = ''
			this.loginErrors = ''
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
						this.redirectToHomePage = true
						this.users = data.users
					}
				})
		},

		loginAccount(loginDetails) {
			fetch(
				`http://localhost:3000/users/${loginDetails.username}/${loginDetails.password}`
			)
				.then((response) => response.json())
				.then((data) => {
					if (data.users.length > 0) {
						// Login successfull
						this.users = data.users
						localStorage.setItem('userId', data.users[0].userId)
						localStorage.setItem('userName', data.users[0].userName)
						// Redirect to homepage
						this.$router.push('/')
					} else {
						// Login failed
						// Error message is sent to SignUpForm component as array and displayed there
						this.errors =
							'Failed to login. Please check username and/or password.'
					}
				})
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

.redirectDialog {
	background: white;
	border: 1px solid rgb(243, 243, 243);
	box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
	width: 500px;
	margin: 0 auto;
	border-radius: 5px;
}

.button_signup-login {
	color: white;
	border: none;
	margin-top: 20px;
	height: 70px;
	font-size: 20px;
}

@media screen and (min-width: 1050px) {
	.button_signup-login {
		height: 35px;
	}
}

.button--green {
	background-color: green;
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
