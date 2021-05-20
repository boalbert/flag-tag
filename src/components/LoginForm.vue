<template>
	<div>
		<h1><i class="fas fa-key"></i></h1>
		<h1>Sign In</h1>

		<!-- Display errors in login-details -->
		<div v-if="errors.length > 0">
			<ul>
				<li class="error-text listItem--error">
					{{ errors }}
				</li>
			</ul>
		</div>
		<!-- Emits input to parent component which uses details to check with backend-->
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
				<button type="submit" class="button_signup-login">
					Log In
				</button>
			</div>
		</form>
	</div>
</template>

<script>
export default {
	name: 'LoginForm',
	props: ['errors'],
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
			// Emit loginDetails to parent to validate
			this.$emit('login-account', loginDetails)
			this.loginDetails.username = ''
			this.loginDetails.password = ''
		},
	},
}
</script>

<style scoped>
section {
	height: 500px;
}
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
	margin-top: 20px;
	width: 240px;
	height: 65px;
	background-color: #f58442;
	font-weight: bold;
	font-family: 'Space Mono', monospace;
	box-shadow: 2px 2px;
	font-size: 20px;
	border: none;
}

@media screen and (min-width: 1050px) {
	.input__container {
		width: 15rem;
	}
}
</style>
