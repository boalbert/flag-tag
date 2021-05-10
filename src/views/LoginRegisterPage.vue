<template>
	<section>
		<div class="form-container">
			<div v-if="accountExists">
				<LoginForm @login-account="loginAccount" />
			</div>
			<div v-else>
				<SignUpForm @register-account="postNewAccount" :errors="errors" />
			</div>

			<p
				@click="accountExists = true"
				v-if="!accountExists"
				class="text--underline text__smallLoginText"
			>
				Log in to my existing account.
			</p>

			<p
				@click="accountExists = false"
				v-if="accountExists"
				class="text--underline text__smallLoginText"
			>
				Oops! I need to create an account.
			</p>

			<p v-if="loggedInUser">Logged in as: {{ loggedInUser }}</p>
		</div>
	</section>
</template>

<script>
// @ is an alias to /src
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
			loggedInUser: '',
			errors: {},
		}
	},
	methods: {
		getLoggedInUser() {
			this.loggedInUser
		},

		postNewAccount(accountDetails) {
			console.log('Emitted username: ' + accountDetails.username)
			console.log('Emitted password: ' + accountDetails.password)

			let credentials = {
				username: accountDetails.username,
				password: accountDetails.password,
			}

			fetch('http://localhost:3000/users', {
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify(credentials),
			})
				.then((response) => response.json())
				.then((data) => {
					console.log(data)
					// Lyckades ej skapa konto
					// Lägg in felmeddelane i en array[], loopa igenom och fyll på
					if (!data.success) {
						this.errors = data.errors
						console.log('Failed to create account: ')
						data.errors.forEach((element) => {
							console.log(' > Error in: ' + element.param + ' - ' + element.msg)
						})

						// Lägg till hantering när konto är skapat
						// Redirect till startsida?
					} else if (data.success) {
						console.log('Account created')
					}
				})
		},
		loginAccount(loginDetails) {
			const username = loginDetails.username
			const password = loginDetails.password

			console.log('Username: ' + username)
			console.log('Password: ' + password)

			fetch(`http://localhost:3000/users/${username}/${password}`)
				.then((response) => response.json())
				.then((response) => {
					console.log(response.users.length)
					if (response.users.length > 0) {
						let userInfo = {
							userId: response.users[0].userId,
							userName: response.users[0].userName,
						}

						localStorage.setItem('userId', userInfo.userId)
						localStorage.setItem('userName', userInfo.userName)

						this.accountExists = true
						this.loggedInUser = response.users[0].userName
					}
				})
		},
	},
	mounted() {},
}
</script>

<style scoped>
section {
	display: flex;
	flex-direction: column;
	width: 95%;
	margin: 0 auto;
	max-width: 1400px;
}

.form-container {
	margin: 0 auto;
	border: 1px solid rgb(243, 243, 243);
	padding: 40px 80px;
	box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
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
	text-align: center;
}
</style>
