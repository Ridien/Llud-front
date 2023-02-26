<template>
    <v-alert class="global-alert" dark :color="type" :value="show">
      <strong class="alert-message swd-alert-message" v-html="message"></strong>
      <v-icon v-if="!showCloseText" class="close-icon swd-alert-close-icon mt-1" @click="$store.commit('alert/setAlert', {show: false})">
        close
      </v-icon>
      <v-btn v-else text height="100%" color="white" class="close-text" @click="$store.commit('alert/setAlert', {show: false})">
        <strong>
          FECHAR
        </strong>
      </v-btn>
    </v-alert>
  </template>
  
  <script>
  import { mapState } from 'vuex'
  export default {
      computed: {
          ...mapState({
              show: state => state.alert.showAlert,
              message: state => state.alert.message,
              type: state => state.alert.type,
              showCloseText: state => state.alert.showCloseText
          })
      }
  }
  </script>
  
  <style lang="scss" scoped>
  
  @import '~assets/style/custom-variables.scss';
  
  .global-alert{
      position: fixed;
      width: 60%;
      margin: 0;
      top: 10px;
      left: 50%;
      transform: translate(-45%, 0);
  
      z-index: 1100;
      border-radius: 6px;
      border-color: rgba(0,0,0,0) !important;
      height: auto;
      padding-right: 40px;
  
      &.info {
        background-color: $info-light !important;
      }
  
      &.error {
          background-color: $brand-risk-error !important;
      }
      &.warn {
          background-color: $brand-risk-flex-plus !important;
      }
  
      @media (max-width: $screen-xs-max) {
        width: 90%;
        margin: 0;
        left: 4%;
        transform: translate(0,0)
      }
  }
  .close-icon{
      padding: 5px;
      right: 0px;
      top: 0px;
      position: absolute;
      color: $white;
      font-size: 35px;
  }
  
  .close-text{
      right: 0px;
      top: 0px;
      position: absolute;
  }
  </style>
  