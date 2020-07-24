<template lang="pug">
  #app
    v-app
      Header
      HeaderMob
      router-view
</template>

<script>
  import Header from '@/components/header.vue'
  import HeaderMob from '@/components/header_mob.vue'
  import './assets/sass/style.sass'
  import './assets/colors.css'
  import { mapGetters } from 'vuex'
  
  export default {
    name: 'App',
    components: {
      Header,
      HeaderMob
    },
    computed: {
      ...mapGetters("auth", {
        token: 'token',
      })
    },
    mounted: function(){
      if(!this.token){
        if(localStorage.getItem("auth_token")){
          this.$store.dispatch('auth/setToken', localStorage.getItem("auth_token"))
        }
      }
    }
  }
</script>