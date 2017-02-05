<template>
  <div class="red-contact">
    <scroller lock-x v-ref:scroller :height="-50+'px'" style="margin-top: -4px;">
      <div style="padding-bottom: 85px; height: 100%;" class="red-chat-list">
        <search
          @result-click="resultClick"
          @on-change="getResult"
          :results="results"
          :auto-fixed="autoFixed"
          :value.sync="value"
          :placeholder="$t('contact.placeholder')"
          :cancel-text="$t('contact.cancel')"></search>
        <div style="margin-top: -10px">
          <group :title="$t('contact.lastcontact')" :style.sync="showlastcontact === true ? '' : 'display:none'">
            <cell
              is-link
              v-for="custom in lastcontact"
              :title="custom['pals_name']"
              v-link="{name:'/space', params:{userId: custom['pals_id'], userName: custom['pals_name']}}">
              <img slot="icon" width="35" :src="custom['pals_ico']" alt="ico">
            </cell>
          </group>
          <group :title="$t('contact.online')" :style.sync="showonline === true ? '' : 'display:none'">
            <cell
              is-link
              v-for="custom in online"
              :title="custom['pals_name']"
              v-link="{name:'/space', params:{userId: custom['pals_id'], userName: custom['pals_name']}}">
              <img slot="icon" width="35" :src="custom['pals_ico']" alt="ico">
            </cell>
          </group>
          <group :title="$t('contact.myfriends')" :style.sync="showmyfriends === true ? '' : 'display:none'">
            <cell
              is-link
              v-for="custom in myfriends"
              :title="custom['pals_name']"
              v-link="{name:'space', params:{userId: custom['pals_id'], userName: custom['pals_name']}}">
              <img slot="icon" width="35" :src="custom['pals_ico']" alt="ico">
            </cell>
          </group>
        </div>
      </div>
    </scroller>
    <confirm
      :show.sync="show"
      :title="$t('register.title')"
      @on-confirm="onconfirm">{{ $t('contact.need') }}</confirm>
  </div>
</template>
<style>
  .red-contact .weui_search_cancel {
    color: #20a0ff;
  }
  .red-chat-list .weui_cell {
    padding: 8px 15px;
  }
  .red-chat-list .weui_cell img {
    display: block;
    margin-right: 10px;
    border-radius: 5px;
  }
</style>
<script>
  import {
    Scroller,
    Search,
    Confirm,
    Group,
    Cell
  } from 'vux/src/components'
  import {
    baseImPath,
    getUserInfo,
    getLanguage,
    getHeaders,
    baseImgSrc
  } from '../vuex/getters'

  export default {
    components: {
      Scroller,
      Search,
      Confirm,
      Group,
      Cell
    },
    vuex: {
      getters: {
        baseImPath,
        getUserInfo,
        getLanguage,
        getHeaders,
        baseImgSrc
      }
    },
    methods: {
      resultClick (item) {
        window.alert('you click the result item: ' + JSON.stringify(item))
      },
      getResult (val) {
        this.results = val ? getResult(this.value) : []
      },
      onconfirm () {
        window.router.go({
          path: '/paypal',
          replace: false
        })
      },
      updatepals () {
        this.$http({
          url: this.baseImPath,
          method: 'POST',
          headers: this.getHeaders,
          params: {
            act: 'updatepals',
            lang: this.getLanguage,
            isMobile: true
          },
          body: {
            userid: this.getUserInfo['user_id']
          }
        }).then((response) => {
          // 成功回调
        }, (response) => {
          // 失败回调
        })
      },
      customgroup () {
        this.$http({
          url: this.baseImPath,
          method: 'POST',
          headers: this.getHeaders,
          params: {
            act: 'customgroup',
            lang: this.getLanguage,
            isMobile: true
          },
          body: {
            userid: this.getUserInfo['user_id']
          }
        }).then((response) => {
          let res = JSON.parse(response.body)
          if (res.success) {
            this.custom = []
            res.msg.forEach((item, index) => {
              let obj = {}
              obj.customGroupName = item.groupName
              obj.customGroupId = item.id
              this.custom.push(obj)
            })
          }
        }, (response) => {
          console.log(response.body)
        })
      },
      getfriendlist () {
        this.$http({
          url: this.baseImPath,
          method: 'POST',
          headers: this.getHeaders,
          params: {
            act: 'getfriendlist',
            lang: this.getLanguage,
            isMobile: true
          },
          body: {
            userid: this.getUserInfo['user_id']
          }
        }).then((response) => {
          let res = JSON.parse(response.body)
          if (res.success) {
            this.lastcontact = []
            this.online = []
            this.myfriends = []
            res.msg.forEach((item, index) => {
              if (item['groupId'] === '1') {
                this.lastcontact.push(item)
              }
              if (item['groupId'] === 'online') {
                this.online.push(item)
              }
              if (item['groupId'] === '0') {
                this.myfriends.push(item)
              }
            })
            if (this.lastcontact.length !== 0) this.showlastcontact = true
            if (this.online.length !== 0) this.showonline = true
            if (this.myfriends.length !== 0) this.showmyfriends = true
            this.$nextTick(() => {
              this.$refs.scroller.reset()
            })
          }
        }, (response) => {
          console.log(response.body)
        })
      },
      getstranger () {
        this.$http({
          url: this.baseImPath,
          method: 'POST',
          headers: this.getHeaders,
          params: {
            act: 'getstranger',
            lang: this.getLanguage,
            isMobile: true
          },
          body: {
            userid: this.getUserInfo['user_id']
          }
        }).then((response) => {
          let res = JSON.parse(response.body)
          if (res.success) {
            console.log(res.msg)
          }
        }, (response) => {
          console.log(response.body)
        })
      }
    },
    created () {
      this.group = this.getUserInfo['user_group']
      if (this.group === 'base') {
        this.show = true
      } else {
        // 更新好友关系
        this.updatepals()
        // 获取自定义分组
        this.customgroup()
        // 获取好友列表
        this.getfriendlist()
        // 火球陌生人列表
        this.getstranger()
      }
    },
    ready () {
      this.$nextTick(() => {
        this.$refs.scroller.reset()
      })
    },
    data () {
      return {
        value: '',
        results: [],
        show: false,
        group: 'base',
        custom: [],
        lastcontact: [],
        online: [],
        myfriends: [],
        showlastcontact: false,
        showonline: false,
        showmyfriends: false
      }
    }
  }

  function getResult (val) {
    let rs = []
    for (let i = 0; i < 8; i++) {
      rs.push({
        title: `${val} result: ${i + 1} `,
        other: i
      })
    }
    return rs
  }
</script>
