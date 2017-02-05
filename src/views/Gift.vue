<template>
  <div class="red-gift-body">
    <scroller lock-x v-ref:scroller :height="isWebApp ? '-110' : '-100'" style="margin-top:-5px;">
      <div>
        <div class="red-gift-img" :style="style">
          <div class="red-gift-inner">
            <img src="../assets/user.jpg" :src="imgsrc"><br>
            <span class="red-gift-name">
              {{ username }}
              <i v-if="userinfo['user_sex'] === '0'" class="red-icon redfont icon-nv red-color-red"></i>
              <i v-else class="red-icon redfont icon-nan red-color-blue"></i>
            </span>
            <a href="javascript:void(0)" @click="showActionSheet = true">
              <span class="redfont icon-font icon-sandianshu"></span>
            </a>
          </div>
        </div>
        <div class="red-list-gift">
          <flexbox :gutter="0" wrap="wrap">
            <flexbox-item :span="1/3" v-for="gift in giftlist">
              <a
                :class="$index % 3 === 0 ? 'red-list-gift-item-noborder' : ''"
                @click="selectgift(gift)">
                <div class="red-list-gift-item-inner">
                  <img src="../assets/user.jpg" alt="{{ gift['giftname'] }}" :src="gift['yuanpatch'] | fmtUserIco baseImgSrc">
                  <div class="red-list-gift-item-tabbar">
                    <div style="height: 24px;">{{ gift['giftname'] }}</div>
                    <div style="font-size: 13px; color: #777;">
                      <span class="redfont red-icon icon-weibiaoti-"
                            style="font-size: 14px;margin-right: 2px; color: #ffb026;"></span>
                      {{ gift['money'] | fmtMoney }}
                    </div>
                  </div>
                </div>
              </a>
            </flexbox-item>
          </flexbox>
        </div>
      </div>
    </scroller>
    <actionsheet
      :show.sync="showActionSheet"
      :menus="{'select':$t('gift.selectFri'),'give':$t('gift.give')}"
      @on-click-menu="click"
      show-cancel
      :cancel-text="$t('gift.cancel')"></actionsheet>
  </div>
</template>
<script>
  import {
    XImg,
    Actionsheet,
    Flexbox,
    FlexboxItem,
    Scroller
  } from 'vux/src/components'
  import {
    getUserInfo,
    getLanguage,
    baseServerPath,
    baseImgSrc
  } from '../vuex/getters'

  export default {
    components: {
      XImg,
      Actionsheet,
      Flexbox,
      FlexboxItem,
      Scroller
    },
    vuex: {
      getters: {
        getUserInfo,
        getLanguage,
        baseServerPath,
        baseImgSrc
      }
    },
    computed: {
      isWebApp () {
        return !!window.navigator.standalone
      }
    },
    methods: {
      click (key) {
        if (key === 'give') {
          // 赠送礼物
        } else if (key === 'select') {
          // 选择好友
        }
      },
      selectgift (gift) {
        console.log(gift)
        let event = event || window.event
        let self = event.currentTarget
        self.className = self.className === 'selected' ? '' : 'selected'
      },
      getgiftlist () {
        this.$http.jsonp(this.baseServerPath, {
          params: {
            act: 'getgiftlist',
            lang: this.getLanguage,
            isMobile: true
          },
          callback: '_callback'
        }).then((response) => {
          let res = JSON.parse(response.data)
          if (res.success) {
            this.giftlist = res.msg
            this.$nextTick(() => {
              this.$refs.scroller.reset()
            })
          } else {
            // 获取列表失败回调，暂不处理
          }
        }, (response) => {
          console.log(response.data)
        })
      },
      getuserinfo () {
        this.$http.jsonp(this.baseServerPath, {
          params: {
            act: 'getuserinfo',
            lang: this.getLanguage,
            isMobile: true,
            userid: this.userid
          },
          callback: '_callback'
        }).then((response) => {
          let res = JSON.parse(response.data)
          if (res.success) {
            this.userinfo = res.msg
            this.userid = this.userinfo['user_id']
            this.username = this.userinfo['user_name']
            this.imgsrc = this.baseImgSrc + this.userinfo['user_ico'].replace(/_small/g, '')
            this.style = 'background-image:url(' + this.imgsrc + ')'
          }
        }, (response) => {
          console.log(response.data)
        })
      },
      getfriends () {
        this.$http.jsonp(this.baseServerPath, {
          params: {
            act: 'getfriend',
            lang: this.getLanguage,
            isMobile: true,
            userid: this.getUserInfo['user_id']
          },
          callback: '_callback'
        }).then((response) => {
          // 成功回调
          let res = JSON.parse(response.data)
          if (res.success) {
            let temp = []
            this.friends = res.msg
            this.friends.forEach(function (item, index) {
              temp.push(item['pals_name'])
            })
            this.friendList.push(temp)
          } else {
            console.log(res.msg)
          }
        }, (response) => {
          // 失败回调
          console.log(response.data)
        })
      }
    },
    data () {
      return {
        showActionSheet: false,
        userid: '',
        username: '',
        userinfo: {},
        friendList: [],
        giftlist: [],
        isFirstLoading: true,
        imgsrc: this.baseImgSrc + 'skin/default/jiaoyou/images/d_ico_1.gif',
        style: 'background-image:url(' + this.baseImgSrc + 'skin/default/jiaoyou/images/d_ico_1.gif' + ')'
      }
    },
    created () {
      window.addEventListener('scroll', this.handleScroll)
      this.userid = this.$route.params.userId
      // 如果是系统默认
      if (this.userid !== 'default') {
        setTimeout(() => {
          this.getuserinfo()
        }, 100)
      } else {
        this.username = this.getUserInfo['user_name']
        this.userid = this.getUserInfo['user_id']
        this.imgsrc = this.baseImgSrc + this.getUserInfo['user_ico'].replace(/_small/g, '')
        this.style = 'background-image:url(' + this.imgsrc + ')'
      }
      setTimeout(() => {
        if (this.isFirstLoading) {
          this.isFirstLoading = false
          this.getgiftlist()
        }
      }, 100)
    },
    ready () {
      this.$nextTick(() => {
        this.$refs.scroller.reset()
      })
    }
  }
</script>
<style>
  .red-gift-img {
    background-repeat: no-repeat;
    background-position: center center;
    height: 240px;
    margin-top: -5px;
    background-size: cover;
    position: relative;
  }
  .red-gift-img > .red-gift-inner {
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.75);
    backdrop-filter: blur(6px);
    text-align: center;
  }
  .red-gift-inner > img {
    display: inline-block;
    width: 150px;
    height: 150px;
    margin-top: 45px;
    border-radius: 100%;
    box-shadow: 0 0 20px rgba(0,0,0,0.75);
  }
  .red-gift-inner > a {
    position: absolute;
    right: 0;
    top: 10px;
    color: #fff;
    width: 35px;
  }
  .red-color-blue, .red-color-red {
    font-size: 14px;
  }
  .red-color-red {
    color: #ff4d5c;
  }
  .red-color-blue {
    color: #3497ff;
  }
  .red-gift-inner .red-gift-name {
    background: rgba(0,0,0,0.75);
    color: #fff;
    padding: 0 10px;
    display: inline-block;
    border-radius: 15px;
  }
  .red-list-gift {
    margin-top: 1px;
  }
  .red-list-gift a {
    background-clip: padding-box;
    border-left: 1px solid #f1f1f1;
    border-bottom: 1px solid #f1f1f1;
    display: block;
    height: 160px;
    position: relative;
  }
  .red-list-gift a.selected:before {
    position: absolute;
    content: '';
    border: 1px solid #20a0ff;
    left: -1px;
    top: 0;
    width: 100%;
    bottom: -2px;
    background: rgba( 32, 160, 255, 0.05);
    z-index: 2;
  }
  .red-list-gift a.selected:after {
    position: absolute;
    content: '\2713';
    width: 20px;
    height: 20px;
    right: 3px;
    top: 3px;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    line-height: 20px;
    color: #ffffff;
    background: #20a0ff;
    border-radius: 100%;
  }
  .red-list-gift-item-noborder {
    border-left: none;
  }
  .red-list-gift a > .red-list-gift-item-inner {
    background: #fff;
    height: 160px;
  }
  .red-list-gift a img {
    width: 100%;
    height: 100px;
    border: none;
  }
  .red-list-gift a .red-list-gift-item-tabbar {
    height: 60px;
    font-size: 14px;
    white-space: nowrap;
    margin-right: 1px;
    overflow: hidden;
    margin-left: 1px;
  }
</style>
