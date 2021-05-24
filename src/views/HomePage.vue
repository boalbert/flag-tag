<template>
	<section>
		<About class="align-flexend" />
		<SelectGameMode />
		<ListHighScore />
	</section>
</template>

<script>
import SelectGameMode from '@/components/SelectGameMode.vue'
import ListHighScore from '@/components/ListHighScore.vue'
import About from '@/components/About.vue'

export default {
	name: 'HomePage',
	components: {
		About,
		SelectGameMode,
		ListHighScore,
	},
	data() {
		return {}
	},
}
</script>

<style>
section {
	display: flex;
	flex-direction: column;
	margin: 0 auto;
	grid-column-start: 2;
	gap: 20px;
}

.align-flexend {
	/* 	Place about-box at the end in mobile view */
	order: 2;
}

button:hover {
	cursor: pointer;
}

.button__darkMode {
	font-size: 25px;
	border: 0;
	background-color: none;
}

@media screen and (min-width: 1050px) {
	.align-flexend {
		/* Place top-left in desktop view */
		order: 0;
	}
	section {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		max-width: 1400px;
		justify-items: stretch;
	}
}
</style>
