<template>
	<div>
		<h1>👽</h1>
		<h1>Sign in</h1>
		<h3>Please enter you details</h3>
		<form>
			<div class="input__container">
				<input required type="text" placeholder="Username" />
				<input required type="text" placeholder="Password" />
				<button @click="login" class="button_signup-login button--green">
					Login
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
