<!-- 最近访客 -->
<template>
  <div>
    <scroller lock-x v-ref:scroller :height="-40+'px'" style="margin-top: -4px">
      <div style="padding-bottom: 30px; margin-top: -20px;">
        <group>
          <cell
            v-for="guest in guests"
            :title="guest['guest_user_name']"
            is-link
            class="red-guest-item"
            v-link="{name:'space', params: {userId: guest['guest_user_id'], userName: guest['guest_user_name']}}">
            <img slot="icon" width="35" :src="guest['guest_user_ico'] | fmtUserIco baseImgSrc" alt="pic">
          </cell>
        </group>
      </div>
    </scroller>
  </div>
</template>
<style>
  .red-guest-item img {
    display: block;
    margin-right: 10px;
    border-radius: 5px;
  }
</style>
<script>
  import {
    Scroller,
    Cell,
    Group
  } from 'vux/src/components'
  import {
    baseServerPath,
    baseImgSrc,
    getLanguage,
    getUserInfo
  } from '../../vuex/getters'

  export default {
    components: {
      Scroller,
      Cell,
      Group
    },
    vuex: {
      getters: {
        baseServerPath,
        baseImgSrc,
        getLanguage,
        getUserInfo
      }
    },
    methods: {
      guestlist () {
        this.$http.jsonp(this.baseServerPath, {
          params: {
            act: 'guestlist',
            userid: this.getUserInfo['user_id'],
            lang: this.getLanguage,
            isMobile: true
          },
          callback: '_callback'
        }).then((response) => {
          let res = JSON.parse(response.data)
          if (res.success) {
            this.guests = res.msg
            this.$nextTick(() => {
              this.$refs.scroller.reset()
            })
          }
        }, (response) => {
          console.log(response.data)
        })
      }
    },
    data () {
      return {
        guests: ''
      }
    },
    created () {
      this.guestlist()
    },
    ready () {
      this.$nextTick(() => {
        this.$refs.scroller.reset()
      })
    }
  }
</script>
