<template>
	<div class="login-registerpage-container">
		<LoginForm
			v-if="!accountExists"
			@login-account="loginAccount"
			:errors="errors"
		/>

		<SignUpForm v-else @register-account="postNewAccount" :errors="errors" />

		<p
			@click="showLoginOrSignupComponent"
			v-if="accountExists"
			class="login-signup-option"
		>
			Log in to my existing account.
		</p>

		<p
			@click="showLoginOrSignupComponent"
			v-if="!accountExists"
			class="login-signup-option"
		>
			Oops! I need to create an account.
		</p>
	</div>
</template>

<script>
import { bus } from '../main'
import SignUpForm from '@/components/SignUpForm.vue'
import LoginForm from '@/components/LoginForm.vue'

export default {
	name: 'LoginRegisterPage',
	components: {
		SignUpForm,
		LoginForm,
	},
	data() {
		return {
			accountExists: false,
			errors: {},
			userInfo: {
				loggedIn: false,
				userName: '',
			},
		}
	},
	methods: {
		showLoginOrSignupComponent() {
			// Clear errors array when switching between signup/login
			this.errors = ''
			this.accountExists = !this.accountExists
		},
		postNewAccount(accountDetails) {
			fetch('http://localhost:3000/users', {
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify(accountDetails),
			})
				.then((response) => response.json())
				.then((data) => {
					if (!data.success) {
						// Error message is sent to SignUpForm component as array and displayed there
						this.errors = data.errors
					} else if (data.success) {
						this.userInfo.loggedIn = true
						this.userInfo.userName = data.users.username
						bus.$emit('login-status', this.userInfo)

						this.saveUserDetailsLocalStorage(
							data.users.userId,
							data.users.username,
							0,
							0,
							0,
							0,
							0,
							0
						)
            if (this.localStorage.getItem('tempRegion') != null)
              this.postHighScore(
                  localStorage.getItem('tempHighscore'),
                  localStorage.getItem('tempRegion')
              )

						this.$router.push('/')
					}
				})
		},

		compareHighScore(loggedInHighScore) {
			let loggedOutHighScore = localStorage.getItem('tempHighscore')
			if (loggedInHighScore > loggedOutHighScore) {
				console.log('Highscore in DB better: ' + loggedInHighScore)
				return loggedInHighScore
			} else {
				console.log(
					'Highscore in tempHighscore is better: ' + loggedOutHighScore
				)
				return loggedOutHighScore
			}
		},

		translateRegionToCompare(regionFromLocalStorage) {
			switch (regionFromLocalStorage) {
				case (regionFromLocalStorage = 'AllRegions'):
					return 'highScoreAllRegions'
				case (regionFromLocalStorage = 'Asia'):
					return 'highScoreAsia'
				case (regionFromLocalStorage = 'Africa'):
					return 'highScoreAfrica'
				case (regionFromLocalStorage = 'Europe'):
					return 'highScoreEurope'
				case (regionFromLocalStorage = 'Americas'):
					return 'highScoreAmericas'
				case (regionFromLocalStorage = 'Oceania'):
					return 'highScoreOceania'
				default:
					console.log('Unable to compare inside translateRegionToCompare()')
			}
		},

		loginAccount(loginDetails) {
			fetch(
				`http://localhost:3000/users/${loginDetails.username}/${loginDetails.password}`
			)
				.then((response) => response.json())
				.then((data) => {
					// Login success
					// Save userdetails to localstorage
					// Redirect to homepage
					// Send loginstatus true via eventbus
					if (data.users.length > 0) {
						this.userInfo.loggedIn = true
						this.userInfo.userName = data.users[0].userName

						// Compare score in tempHighscore with score in database
						// The of the two is saved in 'highScore'
						let highScore = this.compareHighScore(
							data.users[0][
								this.translateRegionToCompare(
									localStorage.getItem('tempRegion')
								)
							]
						)

						this.saveUserDetailsLocalStorage(
							data.users[0].userId,
							data.users[0].userName,
							data.users[0].highScoreAllRegions,
							data.users[0].highScoreAsia,
							data.users[0].highScoreEurope,
							data.users[0].highScoreAfrica,
							data.users[0].highScoreAmericas,
							data.users[0].highScoreOceania
						)

						// If highScore is better than whats in the database
						// -> Update score in database
						if (
							highScore >
							data.users[0][
								this.translateRegionToCompare(
									localStorage.getItem('tempRegion')
								)
							]
						) {
							console.log(
								'Highscore in localstorage is better than in the database'
							)
							console.log('POST tempHighscore')
							this.postHighScore(highScore, localStorage.getItem('tempRegion'))
						}
						bus.$emit('login-status', this.userInfo)

						// Redirect to home
						this.$router.push('/')
					} else {
						// Login failed
						// Error message is sent to SignUpForm component as array and displayed there
						this.errors =
							'Failed to login. Please check username and/or password.'
					}
				})
		},

		saveUserDetailsLocalStorage(
			userId,
			userName,
			allRegions,
			asia,
			europe,
			africa,
			americas,
			oceania
		) {
			let highscoreObject = {
				AllRegions: allRegions,
				Asia: asia,
				Americas: americas,
				Africa: africa,
				Europe: europe,
				Oceania: oceania,
			}
			localStorage.setItem('userId', userId)
			localStorage.setItem('userName', userName)
			localStorage.setItem('highScore', JSON.stringify(highscoreObject))
			var string = localStorage.getItem('highScore')
			var retstring = JSON.parse(string)
			console.log(retstring)
		},
		postHighScore(highScore, region) {
			let userId = localStorage.getItem('userId')
			let getHighScore = {
				userId: userId,
				highScore: highScore,
				region: region,
			}
			fetch('http://localhost:3000/highScore', {
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify(getHighScore),
			})
				.then((response) => response.json())
				.then((data) => {
					console.log(data)
				})
		},
	},
}
</script>

<style>
.login-registerpage-container {
	max-width: 500px;
	display: flex;
	flex-direction: column;
	margin: 0 auto;
	box-shadow: 7px 7px;
	background-color: white;
	border: 2px solid black;
	padding: 15px;
}

.login-signup-option {
	text-decoration: underline;
	font-size: 14px;
	cursor: pointer;
}

@media screen and (min-width: 1050px) {
	.login-registerpage-container {
		width: 400px;
	}
}
</style>
