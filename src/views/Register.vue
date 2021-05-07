<template>
	<section>
		<Header />

		<div class="form-container">
			<div v-if="accountExists">
				<LoginForm @login-account="loginAccount" />
			</div>
			<div v-else>
				<SignUpForm @register-account="postNewAccount" />
			</div>

			<p
				@click="accountExists = true"
				v-if="!accountExists"
				class="text--underline"
			>
				I already have an account.
			</p>

			<p
				@click="accountExists = false"
				v-if="accountExists"
				class="text--underline"
			>
				Oops! I need to create an account.
			</p>

			<p v-if="accountExists">Logged in as: {{ loggedInUser }}</p>
		</div>
	</section>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import SignUpForm from '@/components/SignUpForm.vue'
import LoginForm from '@/components/LoginForm.vue'

export default {
	name: 'Home',
	components: {
		Header,
		SignUpForm,
		LoginForm,
	},
	data() {
		return {
			accountExists: false,
			loggedInUser: '',
		}
	},
	methods: {
		// Ej testad mot backend
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
				.then((res) => {
					// Lägg till metod / hantering av svar från server
					console.log(res)
					if (res.status === 400) {
						// TODO Lägg till felmeddelande Array
						console.log('Failed to create account')

						// Lägg till hantering när konto är skapat
					} else if (res.status === 200) {
						console.log('Account created')
					}
				})
				.catch((err) => {
					// Lägg till felmeddelande i frontend
					console.log('Inside catch')
					console.log('Error message: ', err)
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
						console.log('Login Successful!' + response.users[0].userName)
						this.accountExists = true
						this.loggedInUser = response.users[0].userName
					}
				})
		},
	},
	mounted() {},
}
</script>

<style>
.form-container {
	margin: 0 auto;
	border: 1px solid rgb(243, 243, 243);
	padding: 40px 80px;
	box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}

.text--underline {
	text-decoration: underline;
}
</style>
