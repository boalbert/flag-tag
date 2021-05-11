<template>
    <div>
        <p>Here is the game gonna be</p>
    </div>
</template>
<script>
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
    }
}
</script>
<style scoped>

</style>