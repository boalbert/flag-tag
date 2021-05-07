<template>
	<div>
		<h2>🔑</h2>
		<h1>Sign Up</h1>

		<form @submit.prevent="submitUserDetails(accountDetails)">
			<div class="input__container">
				<label for="username">Username</label>
				<input
					required
					type="text"
					placeholder="Username"
					v-model="accountDetails.username"
					name="username"
				/>
				<label for="username">Password</label>
				<input
					required
					type="password"
					placeholder="Password"
					v-model="accountDetails.password"
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

.button_signup-login {
	border: none;
	margin-top: 20px;
	height: 70px;
	font-size: 20px;
}

.button--green {
	background-color: green;
}

@media screen and (min-width: 1050px) {
	.input__container {
		width: 15rem;
	}

	.button_signup-login {
		height: 35px;
	}
}
</style>
