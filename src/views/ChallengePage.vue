<template>
	<div>
		<h1><u>CHALLENGE</u></h1>
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
