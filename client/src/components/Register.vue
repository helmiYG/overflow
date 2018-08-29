<template>
  <v-form ref="form" lazy-validation>
    <v-text-field
      v-model="name"
      label="Name"
      required
    ></v-text-field>
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
    <v-btn
    
      @click="register"
    >
      submit
    </v-btn>
    <v-btn @click="clear">clear</v-btn>
  </v-form>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert2'
export default {
  data(){
    return{
      name: '',
      email: '',
      password: '',
    }
  }, 
  methods: {
    register(){
      axios({
        method: 'POST',
        url: 'http://localhost:3000/register',
        data: {
          name: this.name,
          email: this.email,
          password: this.password
        }
      })
      .then(() => {
           swal({
            position: 'center',
            type: 'success',
            title: 'Register Succes',
            showConfirmButton: false,
            timer: 1500
          })
          this.$router.push('/login')
      })
      .catch(() => {
           swal({
              type: 'error',
              title: 'Oops...',
              text: 'your email is already in user / you didnt fill all form ',
          })
      });
    }, 
    clear(){
      this.email = ''
      this.name = ''
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
