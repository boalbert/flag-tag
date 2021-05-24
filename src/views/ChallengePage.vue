<template>
	<div>
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
