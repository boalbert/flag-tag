<template>
	<div>
		<h2>🔐</h2>
		<h1>Sign In</h1>
		<form>
			<div class="input__container">
				<label for="username">Username</label>
				<input required type="text" placeholder="Username" name="username" />

				<label for="username">Password</label>
				<input required type="text" placeholder="Password" name="password" />
				<button @click="login" class="button_signup-login button--green">
					Log In
				</button>
			</div>
		</form>
	</div>
</template>

<script>
export default {
	name: 'LoginForm',
}
</script>

<style></style>
