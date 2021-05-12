<template>
	<div>
		<h2>🔑</h2>
		<h1>Sign Up</h1>

		<!-- Display errors when signing up, validated in backend -->
		<div v-if="errors.length">
			<ul v-for="error in errors" :key="error.param">
				<li class="error-text listItem--error">
					{{ error.msg }}
				</li>
			</ul>
		</div>

		<!-- Emits input to parent component which uses details to check with backend-->
		<form @submit.prevent="submitUserDetails(accountDetails)">
			<div class="input__container">
				<label for="username">Username</label>
				<input
					required
					type="text"
					placeholder="Username"
					v-model.trim="accountDetails.username"
					name="username"
				/>
				<label for="username">Password</label>
				<input
					required
					type="password"
					placeholder="Password"
					v-model.trim="accountDetails.password"
					name="password"
				/>
				<button type="submit" class="button_signup-login button--green">
					Create Account
				</button>
			</div>
		</form>
	</div>
</template>

<script>
export default {
	name: 'SignUpForm',
	props: ['errors'],
	data() {
		return {
			accountDetails: {
				username: '',
				password: '',
			},
		}
	},
	methods: {
		submitUserDetails(accountDetails) {
			this.$emit('register-account', accountDetails)
			this.accountDetails.username = ''
			this.accountDetails.password = ''
		},
	},
}
</script>

<style>
label {
	padding: 10px 0;
	text-align: left;
	font-weight: bold;
}
input {
	height: 35px;
	border: 2px solid rgb(238, 237, 237);
	border-radius: 5px;
	padding: 5px;
	font-size: 18px;
}
.input__container {
	display: flex;
	flex-direction: column;
	margin: 0 auto;
	width: 10rem;
}

@media screen and (min-width: 1050px) {
	.input__container {
		width: 15rem;
	}
}
</style>
