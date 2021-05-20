<template>
	<!-- Temporär component
    Ersätt data med data från highscore prop -->
	<div>
		<h2>
			Highscore
		</h2>
		<ol>
			<li v-for="(score,index) in highscore" v-bind:key="index">
				{{ score.userName }} - {{ score.highScore }}
			</li>
		</ol>
	</div>
</template>

<script>
export default {
	name: 'ListHighScore',
	props: {
		highscore: Array,
	},
	methods:{
		getHighscore() {
			fetch('http://localhost:3000/highscore/', {
				method: 'GET',
				headers: {
				'Content-type': 'application/json',
				},
			})
			.then((response) => response.json())
			.then((data) => {
				this.highscore = data.users;
				console.log(this.highscore)
			})
		},
	},
	mounted(){
		this.getHighscore()
	}
}
</script>

<style>
    h2{
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        font-size: 30px;
        color: #f7931e;
        text-align: center;
    }
    li{
        font-family: Arial, sans-serif;
        font-size: 14px;
        color: #3333ff;
        text-align: center;
    }

</style>
