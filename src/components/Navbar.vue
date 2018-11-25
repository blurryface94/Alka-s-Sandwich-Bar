<template>
  <div class="navbar">
    <nav class="nav-extended  red lighten-2">
      <div class="nav-content">
        <router-link :to="{ name: 'Index' }">
          <span class="nav-title">Alka's Sandwich Bar </span>
        </router-link>
        <a href="" class="btn-floating btn-large halfway-fab red">
          <router-link :to="{ name: 'Addsandwich' }">
            <i class="material-icons">add</i>
          </router-link>
        </a>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data(){
    return {
    }
  }
}
</script>

<style>
.navbar nav{
  padding: 0 20px;
}
</style>


