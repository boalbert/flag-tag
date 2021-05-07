<template>
	<section>
		<Header />

		<div class="form-container">
			<div v-if="accountExists">
				<LoginForm />
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
