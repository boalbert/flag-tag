<template>
	<div class="game-mode-container">
		<!-- Ersätt med <router-link> till varje game-mode? -->

    <router-link to="/gamepage">
      <button class="button__gameOptions">Practice</button>
    </router-link>
    <button class="button__gameOptions">Challenge</button>
	</div>
</template>

<script>
export default {
	name: 'SelectGameMode',
}
</script>

<style scoped>
    button{
        font-family: Arial, sans-serif;
        font-size: 25px;
        color: #F5B442;
        background-color: #125DB3;
    }
    button:hover{
      background-color: #4188d7;
    }
</style>
