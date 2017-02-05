<template>
  <div style="height:100%" :class="isWebApp ? 'red-box-fix' : 'red-box'">
    <loading :show="getLoading" position="absolute" :text="$t('base.loading')"></loading>
    <view-box v-ref:view-box>
      <!-- header slot -->
      <div class="red-header-box" slot="header" id="redheader" v-show="!isMy">
        <x-header :left-options="leftOptions" :class="isWebApp ? 'red-header-box-fix' : ''" :transition="headerTransition" :title="title" @on-click-title="scrollTop">
          <a slot="left" class="red-header-user" v-show="isHome" v-link="{path:'/my'}">
            <img alt="1" src="./assets/user.jpg" v-if="isUserIco">
            <img alt="logo" src="./assets/user.jpg" :src="userico" v-else>
          </a>
          <button-tab v-show="isHome">
            <button-tab-item selected v-link="{path:'/'}">{{ $t('base.recommend') }}</button-tab-item>
            <button-tab-item v-link="{path: '/friends'}">{{ $t('base.friends') }}</button-tab-item>
          </button-tab>
          <a slot="right" class="red-header-menu" v-link="{path: '/setting'}" v-show="isMyself">{{ $t('base.setting') }}</a>
        </x-header>
      </div>
      <!-- default slot -->
      <router-view
        :transition="'red-pop-' + (getDirection === 'forward' ? 'in' : 'out')"
      ></router-view>
      <!-- footer slot -->
      <tabbar class="red-tabbar" slot="bottom" icon-class="vux-center" v-show="!isSetting" id="redtabbar">
        <tabbar-item v-link="{path: '/'}" :selected="route.path === '/' || route.path === '/friends'">
          <span class="red-icon redfont" :class="(hasActive === '/' || hasActive === '/friends') ? 'icon-shouyetianchong red-icon-on' : 'icon-shouye'" slot="icon"></span>
          <span slot="label" class="red-label">{{ $t('base.home') }}</span>
        </tabbar-item>
        <tabbar-item v-link="{path: '/paypal'}" :selected="route.path === '/paypal'">
          <span class="red-icon redfont" :class="hasActive === '/paypal' ? 'icon-qiantianchong red-icon-on' : 'icon-qian'" slot="icon"></span>
          <span slot="label" class="red-label">{{ $t('base.chongzhi') }}</span>
        </tabbar-item>
        <tabbar-item v-link="{path: '/im'}" :selected="route.path === '/im'" badge="8">
          <span class="red-icon redfont" :class="hasActive === '/im' ? 'icon-duihuaxinxitianchong red-icon-on' : 'icon-duihuaxinxi'" slot="icon"></span>
          <span slot="label" class="red-label">{{ $t('base.xiaoxi') }}</span>
        </tabbar-item>
        <tabbar-item v-link="{name: 'gift', params: {userId: 'default', userName: 'default'}}" :selected="isGift === true">
          <span class="red-icon redfont" :class="isGift === true ? 'icon-lipintianchong red-icon-on' : 'icon-liwu'" slot="icon"></span>
          <span slot="label" class="red-label">{{ $t('base.liwu') }}</span>
        </tabbar-item>
        <tabbar-item v-link="{path: '/my'}" :selected="route.path === '/my'">
          <span class="red-icon redfont" :class="hasActive === '/my' ? 'icon-yonghutianchong red-icon-on' : 'icon-yonghu'" slot="icon"></span>
          <span slot="label" class="red-label">{{ $t('base.wo') }}</span>
        </tabbar-item>
      </tabbar>
    </view-box>
  </div>
</template>
<script>
  import { Tabbar, TabbarItem, Loading, XHeader, ButtonTab, ButtonTabItem, ViewBox, Badge } from 'vux/src/components'
  import store from './vuex/store'
  import { setUserInfo, setMyPals, setTitle, setError } from './vuex/actions'
  import { baseImgSrc, getLanguage, getTitle, getLoading, getDirection } from './vuex/getters'

  export default {
    components: {
      Loading,
      XHeader,
      ButtonTab,
      ButtonTabItem,
      ViewBox,
      Tabbar,
      TabbarItem,
      Badge
    },
    store,
    vuex: {
      getters: {
        getLoading,
        getDirection,
        route: (state) => state.route,
        baseImgSrc,
        getLanguage,
        getTitle
      },
      actions: {
        setUserInfo,
        setMyPals,
        setTitle,
        setError
      }
    },
    created () {
      this.setTitle()
      this.setError()

      let storage = window.localStorage
      let userinfo = JSON.parse(storage.getItem('userinfo'))
      let mypals = JSON.parse(storage.getItem('mypals'))
      if (userinfo) {
        this.setUserInfo(userinfo)
        this.setMyPals(mypals)
        this.isUserIco = false
        this.userico = this.baseImgSrc + userinfo['user_ico']
      }
    },
    data () {
      return {
        routerTransition: {
          forward: 'slideRL',
          back: 'slideLR'
        },
        isHome: true,
        isUserIco: true,
        userico: '',
        showAlert: false,
        isGift: false
      }
    },
    methods: {
      scrollTop () {
        this.$refs.viewBox.$els.viewBoxBody.scrollTop = 0
      }
    },
    computed: {
      leftOptions () {
        return {
          showBack: this.route.path !== '/' && this.route.path !== '/friends',
          backText: this.getLanguage === 'en' ? 'Back' : '返回'
        }
      },
      isSetting () {
        let pt = this.route.path
        if (pt.indexOf('/setting') !== -1 || pt === '/login' || pt === '/register' || pt.indexOf('/my/') !== -1) {
          return true
        } else {
          return false
        }
      },
      isMy () {
        let pt = this.route.path
        if (pt === '/my' || pt === '/login') {
          return true
        } else {
          return false
        }
      },
      isMyself () {
        let pt = this.route.path
        if (pt.indexOf('/setting') !== -1 || pt === '/register' || pt === '/lang' || pt.indexOf('/my/') !== -1) {
          return false
        } else {
          return true
        }
      },
      isWebApp () {
        return !!window.navigator.standalone
      },
      hasActive () {
        return this.route.path
      },
      headerTransition () {
        return this.direction === 'forward' ? 'vux-header-fade-in-right' : 'vux-header-fade-in-left'
      },
      title () {
        this.isGift = false
        if (this.route.path === '/' || this.route.path === '/friends') {
          this.isHome = true
        } else {
          this.isHome = false
          let lang = this.getLanguage
          let title = this.getTitle
          if (this.route.path.indexOf('/gift') !== -1) {
            this.isGift = true
            return title[lang]['liwu']
          }
          if (this.route.path.indexOf('/space') !== -1) {
            let username = this.$route.params.userName
            return username + title[lang]['space']
          }
          if (this.route.path === '/im') return title[lang]['xiaoxi']
          if (this.route.path === '/paypal') return title[lang]['chongzhi']
          if (this.route.path === '/my') return title[lang]['wo']
          if (this.route.path === '/setting') return title[lang]['shezhi']
          if (this.route.path === '/register') return title[lang]['zhuce']
          if (this.route.path === '/my/userinfo') return title[lang]['userinfo']
          if (this.route.path === '/my/guest') return title[lang]['guest']
          if (this.route.path === '/my/recgifts') return title[lang]['gifts']
          if (this.route.path === '/my/upgrade') return title[lang]['upgrade']
          if (this.route.path === '/my/payment') return title[lang]['payment']
          if (this.route.path === '/setting/lang') return title[lang]['yuyan']
          if (this.route.path === '/setting/privacy') return title[lang]['privacy']
          if (this.route.path === '/setting/modify') return title[lang]['modify']
          if (this.route.path === '/setting/help') return title[lang]['help']
          if (this.route.path === '/setting/about') return title[lang]['about']
        }
      }
    }
  }
</script>
<style lang="less">
  @import "assets/font/iconfont.css";

  html, body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
  }
  body {
    background: #f1f1f1;
  }
  .forward-enter,.forward-leave {
    transform: translate(-100%, 0, 0);
  }
  .back-enter, .back-leave {
    transform: translate(100%, 0, 0);
  }
  .red-header-box {
    position: absolute;
    width: 100%;
    z-index: 100;
    left: 0;
    top: 0;
  }
  .red-header-box .vux-header .vux-header-left a {
    color: #fff;
    font-size: 16px;
  }
  .red-header-box .red-header-user {
    margin-top: -13px;
    margin-left: -10px;
    width: 40px;
    height: 40px;
    border-radius: 100%;
    overflow: hidden;
    background: #fff;
    border: 1px solid #eeeeee;
  }
  .red-header-box .red-header-user > img {
    display: block;
    width: 40px;
  }
  .red-header-box .red-header-box-fix .red-header-menu {
    margin-top: 17px;
  }
  .red-header-box .red-header-menu {
    color: #fff !important;
    font-size: 16px !important;
  }
  .red-header-box .vux-header .vux-header-left .vux-header-back:before {
    border-color: #fff;
  }
  .red-header-box .vux-header {
    background: rgba(32, 160, 255, 0.85);
    backdrop-filter: blur(5px);
  }
  .red-header-box .vux-header.red-header-box-fix  .vux-header-left {
    top: 32px;
  }
  .red-header-box .vux-button-group {
    margin-top: 4px;
  }
  .red-header-box .vux-button-group > a {
    border-color: #fff;
  }
  .red-header-box .vux-button-group > a.vux-button-group-current,
  .red-header-box .vux-button-group > a.hover,
  .red-header-box .vux-button-group > a:active {
    background: #20a0ff;
    border-color: #fff;
  }
  .red-header-box .red-header-box-fix {
    padding-top: 20px;
  }
  .weui_tabbar.red-tabbar {
    backdrop-filter: blur(5px);
    background: none;
    background: rgba(235,235,235,.8);
  }
  /* weui扩展 */
  .red-box-fix .weui_tab_bd {
    padding-top: 68px;
  }
  .weui_tab_bd {
    padding-top: 50px;
  }
  .red-icon {
    color: #888;
  }
  .red-icon-on {
    color: #20a0ff;
  }
  .red-tabbar .weui_bar_item_on .red-label {
    color: #20a0ff;
  }
  .red-tabbar .weui_bar_item {
    transition: all 300ms ease-in-out;
  }
  /**
  * vue-router transition
  */
  .red-pop-out-transition,
  .red-pop-in-transition {
    width: 100%;
    animation-duration: 0.5s;
    animation-fill-mode: both;
    backface-visibility: hidden;
  }
  .red-pop-out-enter,
  .red-pop-out-leave,
  .red-pop-in-enter,
  .red-pop-in-leave {
    will-change: transform;
    height: 100%;
    position: absolute;
    left: 0;
  }
  .red-pop-out-enter {
    animation-name: popInLeft;
  }
  .red-pop-out-leave {
    animation-name: popOutRight;
  }
  .red-pop-in-enter {
    perspective: 1000;
    animation-name: popInRight;
  }
  .red-pop-in-leave {
    animation-name: popOutLeft;
  }
  @keyframes popInLeft {
    from {
      transform: translate3d(-100%, 0, 0);
    }
    to {
      transform: translate3d(0, 0, 0);
    }
  }
  @keyframes popOutLeft {
    from {
      transform: translate3d(0, 0, 0);
    }
    to {
      transform: translate3d(-100%, 0, 0);
    }
  }
  @keyframes popInRight {
    from {
      transform: translate3d(100%, 0, 0);
    }
    to {
      transform: translate3d(0, 0, 0);
    }
  }
  @keyframes popOutRight {
    from {
      transform: translate3d(0, 0, 0);
    }
    to {
      transform: translate3d(100%, 0, 0);
    }
  }
</style>

