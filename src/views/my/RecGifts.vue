<!-- 我的礼物 -->
<template>
  <div>
    <scroller lock-x v-ref:scroller :height="-40+'px'" style="margin-top: -4px">
      <div style="padding-bottom: 30px; margin-top: -20px;">
        <group>
          <cell
            v-for="gift in gifts"
            :title="gift['giftname']"
            class="red-gift-item"
            :inline-desc="gift['send_name'] | fmtGift gift['send_time']">
            <img slot="icon" width="45" :src="gift['gift'] | fmtUserIco baseImgSrc" alt="pic">
          </cell>
        </group>
      </div>
    </scroller>
  </div>
</template>
<style>
  .red-gift-item img {
    display: block;
    margin-right: 10px;
    border-radius: 5px;
  }
</style>
<script>
  import {
    Scroller,
    Group,
    Cell
  } from 'vux/src/components'
  import {
    baseServerPath,
    baseImgSrc,
    getUserInfo,
    getLanguage
  } from '../../vuex/getters'

  export default {
    components: {
      Scroller,
      Group,
      Cell
    },
    vuex: {
      getters: {
        baseServerPath,
        baseImgSrc,
        getUserInfo,
        getLanguage
      }
    },
    methods: {
      recgiftlist () {
        this.$http.jsonp(this.baseServerPath, {
          params: {
            act: 'recgiftlist',
            userid: this.getUserInfo['user_id'],
            lang: this.getLanguage,
            isMobile: true
          },
          callback: '_callback'
        }).then((response) => {
          let res = JSON.parse(response.data)
          if (res.success) {
            this.gifts = res.msg
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
        gifts: []
      }
    },
    created () {
      this.recgiftlist()
    },
    ready () {
      this.$nextTick(() => {
        this.$refs.scroller.reset()
      })
    }
  }
</script>
