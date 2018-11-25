<template>
  <div class="index container">
    <div class="card" v-for="sandwich in sandwiches" :key="sandwich.id">
      <div class="card-content">
        <i class="material-icons delete" @click="deleteSandwich(sandwich.id)">delete</i>
        <h2 class="red-text">{{ sandwich.title }}</h2>
        <ul class="ingredients">
          <li v-for="(ing, index) in sandwich.ingredients" :key="index">
            <span class="chip">{{ ing }}</span>
          </li>
        </ul>
      </div>
      <span class="btn-floating btn-large halfway-fab pink">
        <router-link :to="{ name: 'EditSandwich', params: {sandwich_slug: sandwich.slug}}">
          <i class="material-icons edit">edit</i>
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
import db from '@/firebase/init'
export default {
  name: 'Index',
  data(){
    return{
      sandwiches: []
    }
  },
  methods: {
    deleteSandwich(id){
      // delete doc from firestore
      db.collection('sandwiches').doc(id).delete()
      .then(() => {
        this.sandwiches = this.sandwiches.filter(sandwich => {
          return sandwich.id != id
        })
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created(){
    // fetch data from firestore
    db.collection('sandwiches').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        let sandwich = doc.data()
        sandwich.id = doc.id
        this.sandwiches.push(sandwich)
      })
    })
  }
}
</script>

<style>
.index{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 60px;
}
.index h2{
  font-size: 1.8em;
  text-align: center;
  margin-top: 0;
}
.index .ingredients{
  margin: 30px auto;
}
.index .ingredients li{
  display: inline-block;
}
.index .delete{
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.4em;
}
</style>