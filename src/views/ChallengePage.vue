<template>
	<div>
		<h1>Challenge</h1>
		<Game :challenge="true" />
	</div>
</template>

<script>
import Game from '../components/Game'
export default {
	name: 'ChallengePage',
	components: {
		Game,
	},
}
</script>
