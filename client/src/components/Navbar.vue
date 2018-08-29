<template>
  <v-toolbar>
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title>Over Flow</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
       <v-btn flat to="/" style="text-decoration: none">Home</v-btn>
       <v-btn flat to="/discuss" style="text-decoration: none">Discussion</v-btn> 
       <v-btn flat to="/profil"  style="text-decoration: none" v-if="token">Profil</v-btn>
       <v-btn flat style="text-decoration: none" v-if="token"  @click="logout">Logout</v-btn>
       <v-btn flat to="/login"  style="text-decoration: none" v-if="!token">Login</v-btn>
       <v-btn flat to="/register"  style="text-decoration: none" v-if="!token">Register</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  data(){
    return {
      token: false,
      conf_token:'',
    }
  },
  computed: {
    ...mapState([
      'isLogin',
      'isLogout'
    ])
  },
  methods: {
    ...mapActions([
      'logoutVuex'
    ]),
    logout(){
      this.conf_token = localStorage.getItem('token')
      this.logoutVuex(this.conf_token )
    }
  },
  mounted() {
    this.token = localStorage.getItem('token')
  },
  watch: {
    isLogin: function(){
      this.token = true
      console.log('INI token',this.token);
      
      this.$router.push('/')
    },
    isLogout: function(){
      this.token = false
       this.$router.push('/')
      console.log(this.token);
    }

  }
}
</script>

<style scoped>

</style>
