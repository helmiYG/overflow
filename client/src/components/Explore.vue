<template>
    <div>
        <div class="card text-center">
        <div class="card-header">
            Posted By : {{Q.userId.name}} , 
            {{ moment(Q.createdAt).format("dddd, MMMM Do YYYY, h:mm") }}
        </div>
        <div class="card-body">
            <h5 class="card-title"> {{Q.title}}  </h5>
            <p class="card-text"> {{Q.content}} </p>
        </div>
        <div class="card-footer text-muted">
            2 days ago
        </div>
    </div>
    <br>
    <h3>Answers</h3>
     <wysiwyg v-model="newAnswer" v-if="token"/>
     <button class="btn btn-success" @click="add" v-if="token" >Submit</button>
     <br>
    <div class="card" style="text-align: left !important" v-for="(answer, i) in Q.answers" :key="i">
        <div class="card-header">
            Posted By : {{answer.answererName}} , 
             {{ moment(answer.Date).format("dddd, MMMM Do YYYY, h:mm") }} 
        </div>
        <div class="card-body">
            <p class="card-text"> {{answer.answerContent}} </p>
            <a href="#" class="btn btn-success" v-if="token">Edit</a>
        </div>
    </div>
    </div>
</template>

<script>
import moment from 'moment'
import {mapActions, mapState} from 'vuex'
export default {
    data(){
        return{
            newAnswer:'',
            idQ: '',
            token:''
        }
    },
    computed: {
        ...mapState([
            'Q',
            'newIdA'
        ])
    },
    methods: {
        ...mapActions([
            'getOneQuestion',
            'addAnswer'
        ]),
         moment(date) {
           return moment(date);
        },

       add(){
           let obj = {
               answerContent: this.newAnswer,
               idQuestoin: this.idQ,
               token: localStorage.getItem('token')
           }
           this.addAnswer(obj)
       }

    },
    mounted() {
        this.token = localStorage.getItem('token')
         this.idQ = this.$router.history.current.params.id
         this.getOneQuestion(this.idQ)
    },
    watch:{
        newIdA: function(){
            this.getOneQuestion(this.idQ)
        }
    }
}
</script>

<style>

</style>
