<template>
	<div>
		<i class="fas fa-user-plus icon-signup-signin"></i>
		<h1>Sign Up</h1>

		<!-- Display errors when signing up, validated in backend -->
		<div v-if="errors.length">
			<ul v-for="error in errors" :key="error.param">
				<li class="text--error text__red">
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
				<button type="submit" class="button_signup-login">
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

<style scoped>
label {
	padding: 10px 0;
	text-align: left;
	font-weight: bold;
}
input {
	height: 35px;
	border: 2px solid rgb(238, 237, 237);
	border-radius: 0px;
	border: 1px solid gray;
	padding: 5px;
	font-size: 18px;
	box-shadow: 2px 2px;
}

input:focus {
	outline: none;
}
.input__container {
	display: flex;
	flex-direction: column;
	margin: 0 auto;
	width: 15rem;
}

.button_signup-login {
	margin-top: 20px;
	width: 15rem;
	height: 65px;
	background-color: #f58442;
	font-weight: bold;
	font-family: 'Space Mono', monospace;
	box-shadow: 2px 2px;
	font-size: 20px;
	border: none;
	align-self: center;
}
.text--error {
	font-size: 13px;
	list-style: none;
	text-align: center;
}
.text__red {
	color: #aa001f;
}

.icon-signup-signin {
	display: none;
}

@media screen and (min-width: 1050px) {
	.input__container {
		width: 15rem;
	}

	.icon-signup-signin {
		display: block;
		font-size: 42px;
		margin-top: 25px;
		margin-bottom: 0;
	}
}
</style>
