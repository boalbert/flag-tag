<template>
	<div>
		<h2>🔐</h2>
		<h1>Sign In</h1>
		<form @submit.prevent="submitLoginDetails(loginDetails)">
			<div class="input__container">
				<label for="username">Username</label>
				<input
					required
					type="text"
					placeholder="Username"
					name="username"
					v-model.trim="loginDetails.username"
				/>

				<label for="username">Password</label>
				<input
					required
					type="password"
					placeholder="Password"
					name="password"
					v-model.trim="loginDetails.password"
				/>
				<button type="submit" class="button_signup-login button--blue">
					Log In
				</button>
			</div>
		</form>
	</div>
</template>

<script>
export default {
	name: 'LoginForm',
	data() {
		return {
			loginDetails: {
				username: '',
				password: '',
			},
		}
	},
	methods: {
		submitLoginDetails(loginDetails) {
			this.$emit('login-account', loginDetails)
			this.loginDetails.username = ''
			this.loginDetails.password = ''
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
button{
    font-family: Arial, sans-serif;
    color: #f7931e;
}

</style>
