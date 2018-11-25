<template>
  <div v-if="sandwich" class="edit-sandwich container">
    <h4 class="red-text center-align">Edit {{ sandwich.title }} Sandwich</h4>
    <form @submit.prevent="editSandwich">
      <div class="field title">
        <label for="title">Sandwich title:</label>
        <input type="text" name="title" v-model="sandwich.title">
      </div>
      <div v-for="(ing, index) in sandwich.ingredients" class="field ingredient" :key="index">
        <label for="ingredient">Ingredient:</label>
        <input type="text" name="ingredient" v-model="sandwich.ingredients[index]">
        <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient">Add an ingredient (press tab to add):</label>
        <input type="text" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="another">
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn pink">Update Sandwich</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'
export default {
  name: 'EditSandwich',
  data(){
    return{
      sandwich: null,
      another: null,
      feedback: null,
      slug: null
    }
  },
  methods: {
    editSandwich(){
       if(this.sandwich.title){
        this.feedback = null
        // create a slug
        this.slug = slugify(this.sandwich.title, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        })
        // update sandwich in firestore
        db.collection('sandwiches').doc(this.sandwich.id).update({
          title: this.sandwich.title,
          slug: this.slug,
          ingredients: this.sandwich.ingredients
        }).then(() => {
          this.$router.push({ name: 'Index' })
        }).catch(err => {
          console.log(err)
        })
      } else {
        this.feedback = 'You must enter a sandwich title'
      }
    
    },
    addIng(){
      if(this.another){
        this.sandwich.ingredients.push(this.another)
        this.another = null
        this.feedback = null
      } else {
        this.feedback = 'You must enter a value to add another ingredient'
      }
    },
    deleteIng(ing){
      this.sandwich.ingredients = this.sandwich.ingredients.filter(ingredient => {
        return ingredient != ing
      })
    }
  },
  created(){
    let ref = db.collection('sandwiches').where('slug', '==', this.$route.params.sandwich_slug)
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.sandwich = doc.data()
        this.sandwich.id = doc.id
      })
    })
  }
}
</script>
 
<style>
.edit-sandwich{
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.edit-sandwich h2{
  font-size: 2em;
  margin: 20px auto;
}
.edit-sandwich .field{
  margin: 20px auto;
  position: relative;
}
.edit-sandwich .delete{
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>

