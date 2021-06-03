<template>
	<div class="about-container">
		<div class="about-header">
			<h2><i class="fas fa-info-circle"></i> About</h2>
		</div>
		<ul>
			<li>
				The creators of this game is Helena, Sean, Albert, Peter and Oskar
			</li>
			<li>
				With the help of <a href="https://restcountries.eu/">Rescountries.eu</a>
			</li>
			<li>
				To play against friends send them the link:
				<a href="http://flagtag.boalbert.se">http://flagtag.boalbert.se</a>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'About',
}
</script>

<style>
h2 {
	font-family: 'Space Mono', monospace;
	font-weight: bold;
	letter-spacing: 5px;
}
.about-header {
	background-color: #f5b442;
	padding: 0px;
	border-bottom: 2px solid black;
}
.about-container {
	margin: 0 auto;
	margin-bottom: 20px;
	text-align: center;
	box-shadow: 7px 7px;
	border: 2px solid black;
	display: flex;
	flex-direction: column;
	width: 300px;
	height: 310px;
}
ul {
	font-family: 'Space Mono', monospace;
	text-align: left;
}
li {
	font-size: 16px;
}
</style>
