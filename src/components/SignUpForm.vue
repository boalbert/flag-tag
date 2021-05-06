<template>
	<div>
		<h1>🎮</h1>
		<h1>Create Account</h1>
		<h3>Please enter you details</h3>
		<form @submit.prevent="submitUserDetails(accountDetails)">
			<div class="input__container">
				<input
					required
					type="text"
					placeholder="Username"
					v-model="accountDetails.username"
				/>
				<input
					required
					type="password"
					placeholder="Password"
					v-model="accountDetails.password"
				/>
				<button type="submit" class="button_signup-login button--green">
					Create account
				</button>
			</div>
		</form>
	</div>
</template>

<script>
export default {
	name: 'SignUpForm',
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
			this.accountDetails.passWord = ''
		},
	},
}
</script>

<style>
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
	width: 220px;
}

.button_signup-login {
	border: none;
	margin-top: 20px;
	height: 35px;
}

.button--green {
	background-color: green;
}
</style>
