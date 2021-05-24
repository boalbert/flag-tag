<template>
	<div>
		<Game :challenge="false" />
	</div>
</template>

<script>
import Game from '../components/Game'
export default {
	name: 'GamePage',
	components: {
		Game,
	},
}
</script>
