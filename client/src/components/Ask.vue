<template>
    <div class="container">
        <h2 style="text-align: left">Input Your Question: </h2>

        <br>
        <label style="font-size: 20px; text-align: left !important">Title : </label>
        <input type="text" name="title" v-model="title" style="border:1px solid grey; width: 780px; height: 30px">
        <br>
        <br>
        <wysiwyg v-model="newQuestion" />
        <v-btn color="grey lighten-1" style="float: left !important" @click="addQuestion" >Ask</v-btn>
        <v-btn color="grey lighten-1" style="float: left !important" >Reset</v-btn>

    </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
    data(){
        return {
            newQuestion : '',
            token: '',
            title: '',
        }
    },
    computed: {
        ...mapState([

        ])
    },
    methods: {
        ...mapActions([
            'insertQuestion'
        ]),

        addQuestion(){
                let obj = {
                token: this.token,
                content: this.newQuestion,
                title:this.title
            }
        this.insertQuestion(obj)
        this.$router.push('/discuss')
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
    },
    
}
</script>

<style>

</style>
