<template>
    <div class="container">
        <h2 style="text-align: left">Update Your Question: </h2>
        <br>
        <label style="font-size: 20px; text-align: left !important">Title : </label>
        <input type="text" name="title" v-model="title" style="border:1px solid grey; width: 780px; height: 30px">
        <br>
        <br>
        <wysiwyg v-model="content" />
        <v-btn color="grey lighten-1" style="float: left !important" @click="update" >Update</v-btn>
        <v-btn color="grey lighten-1" style="float: left !important" >Reset</v-btn>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
import axios from 'axios'
export default {
    data(){
        return {
            content : '',
            token: '',
            title: '',
            idQuestion: ''
        }
    },
    methods: {
        ...mapActions([
            'updateQuestion'
        ]),

        getOneQuestion(){
             let idQ = this.$router.history.current.params.id
             axios({
                method: 'GET',
                url: `http://localhost:3000/questions/${idQ}`,
                })
                .then((result) => {
                    this.title = result.data.title
                    this.content = result.data.content
                    this.idQuestion = result.data._id
                })
                .catch((err) => {
                    console.log(err);
                    
                });
        },

        update(){
            let obj = {
                idQuestion: this.idQuestion,
                title: this.title,
                content: this.content,
                token: this.token
            }
            this.updateQuestion(obj)
            this.$router.push(`/profil/${this.idQuestion}/exploreUser`)
        },
        reset(){
            this.content = ''
            this.title = ''
        }

    },
    mounted() {
        this.token = localStorage.getItem('token')
        if(!this.token){
            this.$router.push('/login')
        }
        this.getOneQuestion()
    },
    
}
</script>

<style>

</style>
