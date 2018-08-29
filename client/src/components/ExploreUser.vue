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
        <div>

           <router-link :to="`/profil/${Q._id}/update`"><v-btn color="grey lighten-3">Update</v-btn></router-link> 
          <v-btn color="grey lighten-3" @click="deleteQ(Q._id)" >Delete</v-btn>
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
import axios from 'axios'
import swal from 'sweetalert2'
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
            'Q'
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
       },
       deleteQ(idQ){

           swal({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                })
            .then((result) => {
                console.log(this.idQ);
                
                if (result.value) {
                      axios({
                      method: 'DELETE',
                      url: `http://localhost:3000/questions/${this.idQ}`,
                      headers: {
                          token: this.token
                      }
                 })
                    .then((result) => {
                        swal(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                        )
                        this.$router.push('/profil')
                    })
                    .catch((err) => {
                        console.log(err);
                        
                    });
                }
            })

         
       }

    },
    mounted() {
        this.token = localStorage.getItem('token')
         this.idQ = this.$router.history.current.params.id
         this.getOneQuestion(this.idQ)
    },
}
</script>

<style>

</style>
