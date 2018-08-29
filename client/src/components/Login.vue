<template>
  <v-form ref="form" lazy-validation>
    <v-text-field
      v-model="email"
      label="E-mail"
      required
    ></v-text-field>
     <v-text-field
      v-model="password"
      :type="'password'"
      label="password"
      required
    ></v-text-field>
    <v-btn @click="signin"> submit </v-btn>
    <v-btn @click="clear">clear</v-btn> 
  </v-form>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  data(){
    return{
      email: '',
      password: '',
    }
  },
  methods: {
    ...mapActions([
        'login'
    ]),
    signin(){
      let data = {
        email: this.email,
        password: this.password
      }
      this.login(data)
      this.email = ''
      this.password = ''
    },
    clear(){
      this.email = ''
      this.password = ''
    }
  },
  mounted() {
    let check = localStorage.getItem('token')
    if(check){
      this.$router.push('/')
    }
  },
}
</script>

<style>

</style>
