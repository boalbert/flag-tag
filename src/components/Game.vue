<template>
    <div class="game-container">
        <div class="quiz">
          <div class="header">
            <button v-on:click="addAllCountriesToList">Start</button>
            <h1>Quiz</h1>
          </div>
          <div class="main">
            <div class="box-flag">

            </div>
            <div class="box-suggestion">
              <ul>
                <li></li>
              </ul>
            </div>
          </div>
        </div>
    </div>
</template>
<script>
console.log('Game Value')
export default {
    name: 'Game',
    methods:{
        getAllCountries(){
            return new Promise((resolve, reject) =>{
                fetch("https://restcountries.eu/rest/v2/all")
                .then(response => {
                    resolve(response.json());
                })
                .catch(err => {
                console.log(err);
                console.error(reject);
                });
            });
        },
        getCountriesByRegion(region){
            return new Promise((resolve, reject) =>{
                fetch(`https://restcountries.eu/rest/v2/region/${region}`)
                .then(response => {
                    resolve(response.json());
                })
                .catch(err => {
                console.log(err);
                console.error(reject);
                });
            });
        },
      async addAllCountriesToList(){
          this.countryList = await this.getAllCountries();

      }
    },
  data(){
      return{
        countryList:[],
        questions:[
          {
            question:'Question',
            suggestions: [
              {suggestion:'Answer 1'},
              {suggestion:'Answer 2'},
              {suggestion:'Answer 3'},
              {suggestion:'Answer 4'},
            ]
          },
        ]
      }
  }
}
</script>
<style scoped>
    h1 {
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        font-size: 30px;
        color: #f7931e;
    }
    button {
        font-family: Arial, sans-serif;
        font-size: 16px;
        color: #f7931e;
        background-color: #3333ff;

    }


</style>