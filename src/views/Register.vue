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

<style>
.form-container {
	margin: 0 auto;
	/* border: 2px solid lightgray; */
	border: 1px solid rgb(243, 243, 243);
	padding: 40px 80px;
	box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}

.text--underline {
	text-decoration: underline;
}
</style>
