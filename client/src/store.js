import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import swal from 'sweetalert2'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    AllQ: '', //q = question
    Q: '',  
    UserQ: '',
    isLogin: '',
    isLogout: '',
    newIdQ: '',
    newIdA: '',
  },
  mutations: {
    GET_Q(state, payload){
      state.AllQ = payload
    },
    GET_O_Q(state, payload){
      state.Q = payload
    },
    GET_U_Q(state, payload){  //get user question
      state.UserQ = payload
    },
    CONF_LOGIN(state, payload){
      state.isLogin = payload
    },
    CONF_LOGOUT(state, payload){
      state.isLogout = payload
    },
    UPT_IDQ(state, payload){  //update id question
        state.newIdQ = payload
    },
    UPT_IDA(state,payload){
      state.newIdA = payload
    }
  },  
  actions: {
    login(context, data){
      axios({
        method: 'POST',
        url: 'http://localhost:3000/login',
        data: {
          email: data.email,
          password: data.password
        }
      })
      .then((result) => {
          swal({
            position: 'center',
            type: 'success',
            title: 'Login Succes',
            showConfirmButton: false,
            timer: 1500
          })
        localStorage.setItem('token',result.data.token)
        context.commit('CONF_LOGIN', result.data.token)
        // context.commit('CONF_LOGOUT', 'login')
       
      })
      .catch((err) => {
          swal({
              type: 'error',
              title: 'Oops...',
              text: 'Email/password wrong',
          })
          console.log(err);
          
      });
    },
    logoutVuex(context, data){
      context.commit('CONF_LOGOUT',data)
      localStorage.removeItem('token')
    },
    getQuestions(context){ 
      axios({
        method:'GET',
        url: 'http://localhost:3000/questions',
      })
      .then(result => {
        context.commit('GET_Q', result.data)
      })
      .catch(err => {
        console.log(err);
      })
    },
    getOneQuestion(context, data){
      axios({
        method: 'GET',
        url: `http://localhost:3000/questions/${data}`,
      })
      .then((result) => {
        
        context.commit('GET_O_Q', result.data)
      }).catch((err) => {
          console.log(err);
          
      });
    },
    insertQuestion(context, data){
      axios({
        method: 'POST',
        url: 'http://localhost:3000/questions/',
        headers: {
          token: data.token
        },
        data: {
          title: data.title,
          content: data.content
        }
      })
      .then((result) => {

          context.commit('UPT_IDQ', result.data.newQ._id)
      })
      .catch(() => {
        
        
      });
    },
    addAnswer(context, data){
      context.commit('UPT_IDA', false)
      axios({
        method: 'PUT',
        url: `http://localhost:3000/questions/${data.idQuestoin}/answer`,
        headers: {
          token: data.token
        },
        data: {
          answerContent: data.answerContent
        }
      })
      .then((result) => {
          // console.log(result.data);
          context.commit('UPT_IDA', true)
      })
      .catch((err) => {
        console.log(err);
        
      });
    },
    getUserQuestion(context, data){
      axios({
        method: 'GET',
        url: 'http://localhost:3000/questions/userQuestion',
        headers:{
          token: data
        }
      })
      .then((result) => {
        context.commit('GET_U_Q', result.data)

      })
      .catch((err) => {
        console.log(err);
        
      });
    },
    updateQuestion(context, data){
      axios({
          method: 'PUT',
          url: `http://localhost:3000/questions/${data.idQuestion}`,
          headers: {
            token: data.token
          },
          data: {
            title: data.title,
            content: data.content
          }
      })
      .then((result) => {
          this.getOneQuestion(data.idQuestion)
      })
      .catch((err) => {
        
      });
    },

    like(context, data){
      axios({
        method: 'PUT',
        url: `http://localhost:3000/questions/${data.idQ}/like`,
        headers: {
          token : data.token
        }
      })
      .then((result) => {
          console.log(result);
          
      })
      .catch((err) => {
          console.log(err);
          
      });
    },

    dislike(context, data){
      axios({
        method: 'PUT',
        url: `http://localhost:3000/questions/${data.idQ}/dislike`,
        headers: {
          token: data.token
        }
      })
      .then((result) => {
          console.log(result);
          
      })
      .catch((err) => {
          console.log(err);
          
      });
    }
    
  }
})
