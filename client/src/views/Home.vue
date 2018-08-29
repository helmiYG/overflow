<template>
  <div class="home">
      <!-- <Qcards></Qcards> -->
      <Poster></Poster>
  </div>
</template>

<script>
// @ is an alias to /src
import Qcards from '@/components/Qcards.vue'
import Poster from '@/components/Poster.vue'
export default {
  name: 'home',
  components: {
    Qcards,
    Poster
  }
}
</script>
<style>
h1{
  font-family: 'Lobster', cursive;
}
</style>

