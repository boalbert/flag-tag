<template>
	<div class="game-mode-container">
		<!-- Ersätt med <router-link> till varje game-mode? -->
		<button class="button__gameOptions">Practice</button>
		<!-- Lägg till v-if="loggedIn" eller liknande? -->
		<button class="button__gameOptions">Challenge</button>
	</div>
</template>

<script>
export default {
	name: 'SelectGameMode',
}
</script>

<style></style>
