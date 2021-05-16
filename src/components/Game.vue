<template>
    <div class="game-container">
        <div class="quiz">
          <div class="header">
            <button v-on:click="displayQuestion">Start</button>
            <h1>Quiz</h1>
          </div>
          <div class="main">
            <div class="box-flag">
                <img v-bind:src="this.countryFlag"/>
            </div>
            <div class="box-suggestion">
              <ul>
                <li v-for="(alternative,index) in alternatives" v-bind:key="index">{{alternative}}</li>
              </ul>
            </div>
          </div>
        </div>
    </div>
</template>
<script>
import _ from 'lodash'
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
      async createQuestion(){
          if (this.countryListOriginal.length < 1) {
            this.countryListOriginal = await this.getAllCountries();
            this.countryListSplice = this.countryListOriginal
          }
          let index = Math.floor((Math.random() * this.countryListSplice.length))

          return this.countryListSplice[index]
      },
      async displayQuestion(){
          let country = await this.createQuestion()
          this.countryName = country.name
          this.countryFlag = country.flag
            this.alternatives.push(country.name)
          while (this.alternatives.length != 4){
            let index = Math.floor((Math.random() * this.countryListOriginal.length))
            if(!this.alternatives.includes(this.countryListOriginal[index].name)){
              this.alternatives.push(this.countryListOriginal[index].name)
            }
          }
        (this.alternatives)= _.shuffle(this.alternatives)

      }
    },
  data(){
      return{
        countryListOriginal:[],
        countryListSplice: [],
        countryName: "",
        countryFlag: "",
        alternatives:[],
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