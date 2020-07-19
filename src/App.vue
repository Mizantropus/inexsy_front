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
  export default {
    name: 'App',
    components: {
      Header,
      HeaderMob
    }
  }
</script>