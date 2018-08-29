<template>
  <div>
    <div v-if="UserQ.length < 1">
        <h1>You have never asked</h1>
    </div>
      <v-layout row v-for="(q, i) in UserQ" :key="i">
        <v-flex xs12 sm6 offset-sm3 >
          <v-card>
            <v-card-title primary-title >
              <div class="card-center">
                <div class="headline"> {{q.title}} </div>
               <span class="grey--text"><v-btn flat small @click="up" ><v-icon style="font-size: 20px;">far fa-thumbs-up</v-icon> {{q.like.length}}</v-btn></span>
            <span class="grey--text"><v-btn flat small><v-icon style="font-size: 20px;">far fa-thumbs-down</v-icon> {{q.dislike.length}}</v-btn></span>
              </div>
            </v-card-title>

            <v-card-actions>
               <router-link :to="`/profil/${q._id}/exploreUser`"> <v-btn flat >Explore</v-btn></router-link>
              <v-btn flat>Share</v-btn>
            <v-spacer></v-spacer>

            </v-card-actions>

           
          </v-card>
        </v-flex>
        <br>
      </v-layout>
  </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
    computed: {
        ...mapState([
            'UserQ'
        ])
    },
    methods: {
      ...mapActions([
          'getUserQuestion'
      ]),
    },
    mounted() {
        let token = localStorage.getItem('token')
        if(!token){
          this.$router.push('/login')
        }
        this.getUserQuestion(token)
    },
}
</script>

<style>
  .card-center{
    min-width: 100%;
  }
</style>

 <!-- <v-expansion-panel>

                  <v-expansion-panel-content
                      v-for="(item,i) in 1"
                      :key="i"
                      >
                      <div slot="header">Best Answer</div>
                      <v-card>
                          <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
                      </v-card>
                  </v-expansion-panel-content>
          </v-expansion-panel> -->