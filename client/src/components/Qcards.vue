<template>
<div>

<v-btn small color="green" to="/discuss/ask" style="text-decoration:none" v-if="token">Ask Questions</v-btn>
  <v-layout row v-for="(q, i) in AllQ" :key="i">
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-title primary-title style="text-align: center"> 
          <div class="center-card">
            <div class="headline"> {{q.title}} </div>
            <hr>
            <span class="grey--text"><v-btn flat small @click="up(q._id)" ><v-icon style="font-size: 20px;">far fa-thumbs-up</v-icon> {{q.like.length}}</v-btn></span>
            <span class="grey--text"><v-btn flat small @click="down(q._id)" ><v-icon style="font-size: 20px;">far fa-thumbs-down</v-icon> {{q.dislike.length}}</v-btn></span>
          </div>
        </v-card-title>

        <v-card-actions>
          <router-link :to="`/discuss/${q._id}/explore`">  <v-btn flat>Explore</v-btn> </router-link>
          <v-btn flat>Share</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
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
      </v-card>
    </v-flex>
  </v-layout>
</div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
  data(){
    return {
      token: ''
    }
  },
  computed: {
    ...mapState([
      'AllQ',
      'newIdQ'
    ])
  },
  methods: {
        ...mapActions([
            'getQuestions',
            'like',
            'dislike'
        ]),

        up(idQ){
          let token = localStorage.getItem('token')
          let obj = {
            token,
            idQ
          }
          this.like(obj)
        },

        down(idQ){
          let token = this.token
          let obj = {
            token,
            idQ
          }
        this.dislike(obj)
        }

    },
  mounted() {
    this.token = localStorage.getItem('token')
    this.getQuestions()
  },
  watch: {
    newIdQ: function(){
      this.getQuestions()
    }
  }

}
</script>

<style scoped>
  .center-card {
    min-width: 100%;
  }
</style>
