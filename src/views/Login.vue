<template lang="pug">
  div
    v-container.pt-5.pb-14(data-app)
      h1.pt-4.ta_center Sign in to your account
      v-row.pt-3(align="center" justify="center")
        v-col.d-flex.flex-wrap(cols="12" sm="6")
          p.width-100.mb-2 Email Address
            span.text-danger &nbsp;*
          v-text-field(label="E-mail" type="email" v-model="formData.username" solo maxlength="64")
      v-row.mt-n2(align="start" justify="center")
        v-col.d-flex.flex-wrap(cols="12" sm="6")
          p.width-100.mb-2 Password
            span.text-danger &nbsp;*
          v-text-field(label="Password" type="password" v-model="formData.password" solo maxlength="64")
      v-row.pt-4.pb-6(align="end" justify="center")
        v-col.d-flex.flex-wrap(cols="12" md="6")
          v-btn(x-large color="success" block dark :elevation="2" @click="UserLogin" hide-details) Sign in
</template>

<script>
  import Ajax from './../modules/ajax'
  import { mapActions } from 'vuex'
  
  export default {
    name: 'Login',
    data () {
      return {
        formData: {
          username: "",
          //email: "",
          password: "",
        },
      }
    },
    methods: {
      ...mapActions({
        setToken: "auth/setToken",
      }),
      UserLogin () {
        let context = this;
        Ajax.post("/sign_in/", this.formData).then(function (response) {
          console.log(response);
          context.setToken(response.data["token"])
          localStorage.setItem("auth_token", response.data["token"])
        })
        .catch(function (error) {
          console.log(error);
        })
      },
    }
  }
</script>

<style lang="sass">
  .paper_pub_status, .choose_language
    .v-messages__message
      line-height: 18px
      font-size: 14px
      color: #b5b5b5
  .button_add_affilation
    =media()
  .del_affilation
    position: absolute !important
    top: -10px
    right: -10px
</style>