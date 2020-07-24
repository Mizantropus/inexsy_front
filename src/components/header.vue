<template lang="pug">
  div.header_desctop
    .headline
      .container
        .headline_left
          .logo.headline_logo Inexsy
        .headline_right
          router-link.pointer.pr-2(to="/registration/") Sign in
          router-link.pointer.pr-3(to="/login/") Log in
          router-link.pointer.search_icon_wrap(to="/")
            i.fas.fa-search
    .header
      .container
        router-link.header_item(to="/")
          span HOME
        router-link.header_item(to="/")
          span BROWSE
        router-link.header_item(to="/submit")
          span SUBMIT
        router-link.header_item(to="/")
          span MY COLLECTIONS
        router-link.header_item(to="/")
          span ALERTS
        router-link.header_item(to="/")
          span ABOUT
        router-link.header_item(to="/")
          span DONATE
</template>

<style lang="sass">
  @mixin media($bp-size)
    @media (max-width: $bp-size + px)
      @content
  
  @mixin media_min($bp-size)
    @media (min-width: $bp-size + 0.1 + px)
      @content

  .header_desctop
    display: block
    a
      font-size: 14px
    /*@include media(768)
      display: none*/

  .headline
    min-height: 40px
    position: relative
    z-index: 2
    background-color: #638677
    border-bottom: 1px solid #e0e0e0
    .container
      display: flex
      flex-wrap: wrap
      justify-content: space-between
  
  .headline_logo
    font-size: 30px
    color: #fff

  =headline
    height: 45px
    line-height: 42px
    
  .headline_left
    +headline
    
  .headline_center
    +headline
    
  .v-application .headline_right
    +headline
    a
      color: #effff8
      display: inline-block
      &:hover
        color: #fff
        text-decoration: none
    i.fas.fa-search
      color: #bdd4ca
      position: relative
      left: 1px
      top: 1px
    .search_icon_wrap
      display: inline-block
      color: #effff8
      text-align: center
      width: 45px
      border-left: 1px solid #769687
      border-right: 1px solid #769687

  .header
    position: relative
    z-index: 1
    min-height: 70px
    line-height: 70px
    background-color: #d1ded8
    box-shadow: 0px 3px 10px 0px rgba(0,0,0,0.1)
    .container
      display: flex
      flex-wrap: wrap
      justify-content: space-between
  
  .v-application .header_item
    height: 70px
    cursor: pointer
    position: relative
    text-decoration: none
    &:hover
      text-decoration: none !important
      span
        text-decoration: none !important
    .logo
      position: relative
      top: -1px
      width: 200px
      @include media(992)
        width: 160px
    span
      color: #89908d
      font-weight: 500
      text-decoration: underline
      &:hover
        text-decoration: none !important
      @include media(992)
        font-size: 15px
    
  .fade-enter-active, .fade-leave-active
    transition: opacity .2s
    
  .fade-enter, .fade-leave-to
    opacity: 0
    
</style>

<script>
  import eventPath from './../modules/eventPath'
  export default {
    name: 'Header',
    data () {
      return { show: false }
    },
    methods: {
      hidePopUps (e) {
        let elem = false
        elem = eventPath(e).find(element => element.className === 'header_item submenu_checker')
        if (!elem) {
          this.show = false
        }
      },
      show_submenu (e) {
        let elem = false
        let elem2 = false
        elem = eventPath(e).find(element => element.className.indexOf("submenu_checker") != -1)
        if (elem && !elem2) {
          this.show = !this.show
        }
      },
    },
    beforeMount() {
      window.addEventListener('click', this.hidePopUps)
    },
    beforeDestroy() {
      window.removeEventListener('click', this.hidePopUps)
    }
  }
</script>