<template>
  <div class="red-my-body">
    <scroller lock-x v-ref:scroller>
      <div style="padding-bottom: 55px">
        <div class="red-my-user-info" :style="style">
          <div class="red-my-user-info-inner">
            <div class="red_my_user_logo">
              <img src="../assets/user.jpg" :src="src" alt="logo">
            </div>
            <div class="red_my_user_name">{{ username }}</div>
            <box gap="10px 15px">
              <x-button type="warn">{{ $t('my.tuichudenglu') }}</x-button>
            </box>
          </div>
        </div>
        <div class="red_my_user_info">
          <card>
            <div slot="content" class="red-card-flex">
              <div class="vux-1px-l vux-1px-r">
                <span>{{ golds }}</span>{{ $t('my.jinbi') }}
              </div>
              <div class="vux-1px-r">
                <span>{{ moods }}</span>{{ $t('my.xinqing') }}
              </div>
              <div class="vux-1px-r">
                <span>{{ gifts }}</span>{{ $t('my.liwu') }}
              </div>
              <div>
                <span v-if="getUserInfo['user_group'] === 'base'"
                      class="redfont red-icon icon-huiyuan"
                      style="font-size: 20px; color: #999;"></span>
                <span v-if="getUserInfo['user_group'] === '1'"
                      class="redfont red-icon icon-huiyuan"
                      style="font-size: 20px; color: #ffce75"></span>
                <span v-if="getUserInfo['user_group'] === '2'"
                      class="redfont red-icon icon-diamond"
                      style="font-size: 20px; color: #0099ff"></span>
                {{ $t('my.yonghuleixing') }}
              </div>
            </div>
          </card>
          <group>
            <cell :title="$t('my.gerenxinxi')" is-link v-link="{path: '/my/userinfo'}">
              <span slot="icon" width="20" class="red-icon red-my-icon redfont icon-yonghu"></span>
            </cell>
            <cell :title="$t('my.zuijinfangwen')" is-link class="red-my-item-cell" v-link="{path: '/my/guest'}">
              <span slot="icon" width="20" class="red-icon red-my-icon redfont icon-qunzu"></span>
              <div slot="value">
                <span style="color: #999">{{ guest }}</span>
              </div>
            </cell>
            <cell :title="$t('my.huiyuan')" is-link class="red-my-item-cell" v-link="{path: '/paypal'}">
              <span slot="icon" width="20" class="red-icon red-my-icon redfont icon-huangguan"></span>
              <div slot="value">
                <span style="color: #999;">{{ $t('my.remaining') }} {{ meminfo }} {{ $t('my.day') }}</span>
              </div>
            </cell>
            <cell :title="$t('my.myliwu')" is-link class="red-my-item-cell" v-link="{path: '/my/recgifts'}">
              <span slot="icon" width="20" class="red-icon red-my-icon redfont icon-liwu"></span>
              <div slot="value">
                <span style="color:#999">{{ gifts }}</span>
              </div>
            </cell>
          </group>
          <group>
            <cell :title="$t('my.shezhi')" is-link v-link="{path: '/setting'}">
              <span slot="icon" width="20" class="red-icon red-my-icon redfont icon-shezhi"></span>
            </cell>
          </group>
          <group>
            <cell :title="$t('my.shengji')" is-link v-link="{path: '/my/upgrade'}">
              <span slot="icon" width="20" class="red-icon red-my-icon redfont icon-xinfeng"></span>
            </cell>
            <cell :title="$t('my.chongzhi')" is-link v-link="{path: '/my/payment'}">
              <span slot="icon" width="20" class="red-icon red-my-icon redfont icon-qingdan"></span>
            </cell>
          </group>
        </div>
      </div>
    </scroller>
  </div>
</template>
<script>
  import {
    XButton,
    Box,
    Card,
    Group,
    Cell,
    Scroller
  } from 'vux/src/components'
  import {
    getUserInfo,
    baseImgSrc,
    baseServerPath,
    getLanguage
  } from '../vuex/getters'
  import {
    setBalance
  } from '../vuex/actions'

  export default {
    components: {
      XButton,
      Box,
      Card,
      Group,
      Cell,
      Scroller
    },
    vuex: {
      getters: {
        getUserInfo,
        baseImgSrc,
        baseServerPath,
        getLanguage
      },
      actions: {
        setBalance
      }
    },
    methods: {
      getmoods () {
        this.$http.jsonp(this.baseServerPath, {
          params: {
            act: 'getmoods',
            userid: this.getUserInfo['user_id'],
            lang: this.getLanguage,
            isMobile: true
          },
          callback: '_callback'
        }).then((response) => {
          let res = JSON.parse(response.data)
          if (res.success) {
            this.moods = res.msg.length
          }
        }, (response) => {
          console.log(response.data)
        })
      },
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
            this.gifts = res.msg.length
          }
        }, (response) => {
          console.log(response.data)
        })
      },
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
            this.guest = res.msg.length
          }
        }, (response) => {
          console.log(response.data)
        })
      },
      getmeminfo () {
        this.$http.jsonp(this.baseServerPath, {
          params: {
            act: 'getmeminfo',
            userid: this.getUserInfo['user_id'],
            lang: this.getLanguage,
            isMobile: true
          },
          callback: '_callback'
        }).then((response) => {
          let res = JSON.parse(response.data)
          if (res.success) {
            this.meminfo = res.msg
          }
        }, (response) => {
          console.log(response.data)
        })
      },
      getbalance () {
        this.$http.jsonp(this.baseServerPath, {
          params: {
            act: 'getbalance',
            userid: this.getUserInfo['user_id'],
            lang: this.getLanguage,
            isMobile: true
          },
          callback: '_callback'
        }).then((response) => {
          let res = JSON.parse(response.data)
          if (res.success) {
            this.setBalance(Number(res.total))
          }
        }, (response) => {
          console.log(response.data)
        })
      }
    },
    data () {
      return {
        style: '',
        src: '',
        username: '',
        goals: '',
        moods: 0,
        gifts: 0,
        guest: 0,
        meminfo: ''
      }
    },
    ready () {
      this.$nextTick(() => {
        this.$refs.scroller.reset()
      })
    },
    created () {
      this.src = this.baseImgSrc + this.getUserInfo['user_ico'].replace(/_small/g, '')
      this.style = 'background-image:url(' + this.src + ')'
      this.username = this.getUserInfo['user_name']
      this.golds = this.getUserInfo['golds']
      // 获得心情
      this.getmoods()
      // 获得礼物
      this.recgiftlist()
      // 获得最近访客
      this.guestlist()
      // 获取会员信息
      this.getmeminfo()
      // 获取充值金额
      this.getbalance()
    }
  }
</script>
<style>
  .red-box-fix .red-my-body {
    margin-top: -70px;
  }
  .red-box .red-my-body {
    margin-top: -50px;
  }
  .red-my-user-info {
    height: 280px;
    width: 100%;
    background: url(../assets/user.jpg) center center no-repeat;
    background-size: cover;
  }
  .red-my-user-info-inner {
    background: rgba(0,0,0,0.5);
    backdrop-filter: blur(5px);
    height: 100%;
  }
  .red_my_user_logo {
    text-align: center;
    padding-top: 30px;
  }
  .red_my_user_logo > img {
    display: inline-block;
    width: 8em;
    height: 8em;
    border-radius: 100%;
    border: 2px solid #fff;
  }
  .red_my_user_name {
    text-align: center;
    font-size: 22px;
    color: #fff;
  }
  .red_my_user_info {
    padding: 10px 0;
  }
  .red-card-flex {
    display: flex;
  }
  .red-card-flex > div {
    flex: 1;
    padding: 10px 0;
    text-align: center;
    font-size: 14px;
  }
  .red-card-flex > div > span {
    color: red;
    font-size: 14px;
    display: block;
    height: 30px;
    line-height: 30px;
  }
  .red-my-icon {
    margin-right: 5px;
  }
  .red_my_user_info .weui_cell_bd > p {
    font-weight: normal;
    font-size: 16px;
  }
  .red-my-item-cell {
    padding-right: 30px;
  }
  .red-my-item-cell .weui_cell_ft:after {
    position: absolute;
    display: block;
    top: 22px;
    right: 15px;
  }
  .red-my-item-cell .weui_cell_ft span {
    font-size: 15px;
  }
</style>
