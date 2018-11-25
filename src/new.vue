<template>
  <div class="index container">
    <div class="card" v-for="sandwich in sandwiches" :key="sandwich.id">
    <div class="card-content">
      <i class="material-icons delete" @click="deleteSandwich(sandwich.id)">delete</i>
      <h4 class=" red-text">{{ sandwich.title }}</h4>
      <ul class="ingredients">
        <li v-for="(ing, index) in sandwich.ingredients" :key="index">
          <span class="chip"> {{ing}} </span>
        </li>
      </ul>
    </div>
  </div>
  </div>
</template>

<script>
import db from 'init'

export default {
  name: 'Index',
  data () {
    return {
      sandwiches:[]
      }
  },
  methods: {
    deleteSandwich(id){
      db.collection('sandwiches').doc(id).delete()
      .then(() => {
      this.sandwiches= this.sandwiches.filter(sandwich => {
        return sandwich.id != id
       })
        })
    }
  },
  created(){
    // fetch data from the firestore
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