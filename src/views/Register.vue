<template>
	<section>
		<Header />

		<div v-if="accountExists">
			<LoginForm />
		</div>
		<div v-else>
			<SignUpForm @register-account="postNewAccount" />
		</div>

		<p @click="accountExists = true" v-if="!accountExists">
			I already have an account.
		</p>

		<p @click="accountExists = false" v-if="accountExists">
			Oops! I need to create an account.
		</p>
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

			fetch('http://localhost:3030/users', {
				method: 'POST',
				headers: {
					'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
				},
				body: JSON.stringify({
					accountDetails,
				}),
			})
				.then((res) => {
					// Lägg till metod / hantering av svar från server
					console.log('Response: ', res)
				})
				.catch((err) => {
					// Lägg till felmeddelande i frontend
					console.log('Error message: ', err)
				})
		},
	},
	mounted() {},
}
</script>

<style></style>
