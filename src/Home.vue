<template>
  <div class="red-scroller-home">
    <scroller lock-x scrollbar-y use-pullup use-pulldown class="red-scroller-body" :height="isWebApp? -55+'px' : -40+'px'"
              @pullup:loading="loadMore"
              @pulldown:loading="refresh"
              :pullup-status.sync="pullupStatus"
              :pulldown-config="pulldownConfig"
              v-ref:scroller>
      <!-- 加载体 -->
      <div style="padding-bottom: 50px">
        <flexbox :gutter="0" wrap="wrap">
          <flexbox-item :span="1/3" v-for="user in userlist">
            <a
              class="red-list-user-item"
              v-link="{name:'space', params: {userId: user['user_id'], userName: user['user_name']}}">
              <img src="./assets/user.jpg" alt="{{ user['user_id'] }}" :src="user['user_ico'] | fmtUserIco baseImgSrc">
              <div class="red-list-user-item-tabbar">{{ user['user_name'] }}</div>
            </a>
          </flexbox-item>
        </flexbox>
      </div>
      <!--pullup slot-->
      <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up"
           style="position: absolute; width: 100%; height: 40px; bottom: 15px; text-align: center;">
        <span v-show="pullupStatus === 'default'"></span>
        <span class="pullup-arrow" v-show="pullupStatus === 'down' || pullupStatus === 'up'" :class="{'rotate': pullupStatus === 'up'}">↑</span>
        <span v-show="pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
      </div>
    </scroller>
    <alert :show.sync="showToast" :title="$t('register.title')">{{ errorText }}</alert>
  </div>
</template>
<script>
  import { Flexbox, FlexboxItem, Scroller, Spinner, Alert } from 'vux/src/components'
  import { setUserList, resetUserList, setFirstLoading } from './vuex/actions'
  import { getUserList, getLanguage, getUserInfo, baseServerPath, baseImgSrc, getFirstLoading, getHeaders } from './vuex/getters'

  export default {
    components: {
      Flexbox,
      FlexboxItem,
      Scroller,
      Spinner,
      Alert
    },
    vuex: {
      actions: {
        setUserList,
        resetUserList,
        setFirstLoading
      },
      getters: {
        getUserList,
        getLanguage,
        getUserInfo,
        baseServerPath,
        baseImgSrc,
        getFirstLoading,
        getHeaders
      }
    },
    computed: {
      isWebApp () {
        return !!window.navigator.standalone
      }
    },
    methods: {
      loadMore (uuid) {
        setTimeout(() => {
          if (this.n > this.total) {
            this.fn(this, 'pullup:reset', uuid)
            return
          }
          this.n += 30
          this.getuserlist(this.n, 'pullup:reset', uuid)
        }, 10)
      },
      refresh (uuid) {
        setTimeout(() => {
          this.n = 0
          this.resetUserList()
          this.getuserlist(this.n, 'pulldown:reset', uuid)
        }, 10)
      },
      fn (self, type, uuid) {
        self.$nextTick(() => {
          self.$broadcast(type, uuid)
        })
      },
      getuserlist (page, type, uuid) {
        let self = this
        let sex = self.getUserInfo['user_sex']
        let userid = self.getUserInfo['user_id']

        this.$http.jsonp(self.baseServerPath, {
          params: {act: 'getall', page: page, sex: sex, lang: self.getLanguage, 'isMobile': true, userid: userid},
          callback: '_callback'
        }).then((response) => {
          let res = JSON.parse(response.data)
          if (res.success) {
            this.total = res.total['0']
            this.setUserList(res.msg)
            this.userlist = this.getUserList
            setTimeout(() => {
              if (type) { // fix first loading bug
                self.fn(self, type, uuid)
              }
            }, 10)
          } else {
            // 错误逻辑处理
            setTimeout(() => {
              if (type) { // fix first loading bug
                self.fn(self, type, uuid)
              }
              this.errorText = res.msg
              this.showToast = true
            }, 10)
          }
        }, (response) => {
          // 失败回调
          console.log(response.data)
        })
      },
      reloaduserlist () {
        this.userlist = this.getUserList
        this.$nextTick(() => {
          this.$refs.scroller.reset()
        })
      },
      showMySpace (userid) {
        console.log(userid)
      }
    },
    data () {
      return {
        n: 0,
        pullupStatus: 'default',
        userlist: '',
        total: 30,
        showToast: false,
        errorText: '',
        height: '600px',
        pulldownConfig: {content: 'Pull down refresh', downContent: 'Pull down refresh', upContent: 'Release refresh', loadingContent: 'Loading...'},
        pulldownConfigFt: {content: '下拉刷新', downContent: '下拉刷新', upContent: '释放刷新', loadingContent: '加載中...'},
        pulldownConfigCh: {content: '下拉刷新', downContent: '下拉刷新', upContent: '释放刷新', loadingContent: '加载中...'}
      }
    },
    created () {
      // 路由跳转重复加载，fix bug#10000
      let locale = this.getLanguage
      if (locale === 'ch') {
        this.pulldownConfig = this.pulldownConfigCh
      } else if (locale === 'ft') {
        this.pulldownConfig = this.pulldownConfigFt
      }
      setTimeout(() => {
        if (this.getUserInfo) {
          if (this.getFirstLoading) {
            this.getuserlist(this.n)
            this.setFirstLoading(false)
          } else {
            this.reloaduserlist()
          }
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
<style scoped>
  .red-list-user-item {
    position: relative;
    background-clip: padding-box;
    padding: 0 2px;
    display: block;
  }
  .red-pop-out-transition.red-list-user,
  .red-pop-in-transition.red-list-user {
    width: auto !important;
  }
  .red-list-user-item > img {
    width: 100%;
  }
  .red-list-user-item > .red-list-user-item-tabbar {
    position: absolute;
    background: rgba(0, 0, 0, 0.5);
    backdrop: blur(10px);
    left: 2px;
    right: 2px;
    bottom: 7px;
    color: #fff;
    text-align: center;
  }
  .red-scroller-body {
    margin-top: -5px;
  }
</style>
