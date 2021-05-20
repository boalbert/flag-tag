<template>
	<div>
		<h1><u>PRACTICE</u></h1>
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
