<template lang="pug">
  div.header_mobile
    .header
      .container
        .header_item.submenu_checker_mob(@click="show = !show")
          i.fas.fa-bars.submenu_checker(v-if="!show")
          i.fas.fa-times.submenu_checker(v-else)
        transition(name="fade")
          .header_item_submenu_mob(v-if="show")
            nuxt-link.submenu_link(to="/")
              i.fas.fa-mobile-alt &nbsp;&nbsp;
              span Позвонить
            .submenu_link(@click="sub_show = !sub_show")
              span.submenu_checker Услуги &nbsp;
              i.fas.fa-caret-down.submenu_checker(v-if="!sub_show")
              i.fas.fa-caret-up.submenu_checker(v-else)
            transition(name="fade")
              .sub_submenu_mob(v-if="sub_show")
                router-link.submenu_link(to="/") Профессиональное&nbsp;обучение
                router-link.submenu_link(to="/") Услуги&nbsp;стилистов
                router-link.submenu_link(to="/") Студия&nbsp;красоты
                router-link.submenu_link(to="/") Подарочные&nbsp;сертификаты
                router-link.submenu_link(to="/") Корпоративные&nbsp;продукты
            nuxt-link.submenu_link(to="/")
              span Расписание
            nuxt-link.submenu_link(to="/")
              span Портфолио
            nuxt-link.submenu_link(to="/")
              span Отзывы
            nuxt-link.submenu_link(to="/")
              span Блог
            span.submenu_link.submenu_city_wrap
              span Ваш город: 
                nuxt-link(to="/") Москва
            span.submenu_link(to="/")
              span Мы в соцсетях
              span.socials_wrap
                i.fab.fa-instagram
                i.fab.fa-vk
                i.fab.fa-youtube
                i.fab.fa-facebook-f
        .header_item
          img.logo.logo_mob.lazyload(data-src='/img/logo3.png' alt="Logotype" width="180")
        .header_item
          .cart_icon
            i.fas.fa-shopping-cart
            .cart_icon_count 3
</template>

<style lang="sass">
  @mixin media($bp-size)
    @media (max-width: $bp-size + px)
      @content
  
  @mixin media_min($bp-size)
    @media (min-width: $bp-size + 0.1 + px)
      @content
  
  .header_item
    .logo_mob
      width: 180px
  
  .header_mobile
    display: none
    /*@include media(768)
      display: block*/
  
  .header_item.submenu_checker_mob
    padding-right: 20px
  
  .fas.fa-bars
    font-size: 20px
  
  .header_item_submenu_mob
    display: block
    position: absolute
    top: 80px
    min-width: 220px
    left: 10px
    border-radius: 3px
    padding: 10px 0
    background-color: #fff
    line-height: 20px
    z-index: 3
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1)
    .submenu_link
      display: block
      padding: 10px 20px
      font-weight: 600
      .submenu_checker
        cursor: pointer
    .submenu_city_wrap
      padding: 15px 20px 17px
      font-weight: 300
      border-top: 1px solid #eee
      border-bottom: 1px solid #eee
      span
        a
          color: #888
      
  .sub_submenu_mob
    .submenu_link
      display: block
      padding: 5px 20px 5px 25px
      font-weight: 300
      color: #888
      &:hover
        color: #ec1c6f
    
  .cart_icon
    text-align: center
    border-radius: 20px
    height: 40px
    line-height: 40px
    width: 40px
    margin-top: 20px
    border: 1px solid #afafaf
    position: relative
    .fas
      color: #afafaf
      position: relative
      left: -1px
    .cart_icon_count
      position: absolute
      top: -1px
      right: -3px
      height: 15px
      line-height: 15px
      border-radius: 10px
      width: 15px
      color: #fff
      font-size: 10px
      text-align: center
      background-color: #ec1c6f
    
  .socials_wrap
    display: block
    padding: 10px 0
    letter-spacing: 12px
    .fab
      font-size: 20px
    
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
      return {
        show: false,
        sub_show: false
      }
    },
    methods: {
      hidePopUps (e) {
        let elem = false
        elem = eventPath(e).find(element => element.className === 'header_item submenu_checker')
        if (!elem) {
          this.show = false
        }
      },
      //show_submenu (e) {
      //  let elem = false
      //  let elem2 = false
      //  //elem = eventPath(e).find(element => element.className.indexOf("submenu_checker") != -1)
      //  elem2 = eventPath(e).find(element => element.className.indexOf('header_item_submenu')
      //  if (elem && !elem2) {
      //    //console.log(elem, eventPath(e))
      //    this.show = !this.show
      //  }
      //},
    },
    //beforeMount() {
    //  window.addEventListener('click', this.hidePopUps)
    //},
    //beforeDestroy() {
    //  window.removeEventListener('click', this.hidePopUps)
    //}
  }
</script>