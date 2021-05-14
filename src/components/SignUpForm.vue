<template>
	<div>
		<h2>🔑</h2>
		<h1>Sign Up</h1>

		<div v-if="errors.length">
			<ul v-for="error in errors" :key="error.param">
				<li class="error-text listItem--error">
					{{ error.msg }}
				</li>
			</ul>
		</div>

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
				<button type="submit" class="button_signup-login button--blue">
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
			this.accountDetails.passWord = ''
			this.errors = ''
		},
	},
}
</script>

<style>
    h1{
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        font-size: 30px;
        color: #f7931e;
    }
label {
	padding: 10px 0;
	text-align: left;
	font-weight: bold;
    font-family: Arial, sans-serif;
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
    color: #f7931e;
}

.button--blue {
	background-color: #3333ff;
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
