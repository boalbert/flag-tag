<template>
	<div>
		<p>All regions: {{ highScore }}</p>
	</div>
</template>

<script>
export default {
	name: 'ProfileScore',
	data() {
		return {
			highScore: Number,
		}
	},
	mounted() {
		this.highScore = localStorage.getItem('highScore')
	},
}
</script>

<style></style>
