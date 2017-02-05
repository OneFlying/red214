<template>
  <!-- 0 是女， 1 是男 -->
  <div>
    <scroller lock-x v-ref:scroller :height="-50+'px'">
      <div class="red-userinfo">
        <group>
          <cell title="用户头像" is-link class="red-item-cell">
            <div slot="value">
              <img src="../../assets/user.jpg" :src="imgsrc" class="red-userinfo-img">
            </div>
          </cell>
          <cell title="用户名">
            <div slot="value">
              <span style="color: #999">{{ getUserInfo['user_name'] }}</span>
            </div>
          </cell>
          <cell title="性别">
            <div clot="value">
              <span style="color: #999" v-if="getUserInfo['user_sex'] === 0">女</span>
              <span style="color: #999" v-else>男</span>
            </div>
          </cell>
          <cell title="注册时间">
            <div slot="value">
              <span style="color: #999">{{ getUserInfo['user_add_time'] | fmtDate }}</span>
            </div>
          </cell>
        </group>
        <group>
          <cell title="出生年月" is-link class="red-item-cell red-item-s-cell">
            <div slot="value">
              <span style="color: #999">{{ getUserInfo['birth_year'] | fmtBirth getUserInfo['birth_month'] getUserInfo['birth_day'] }}</span>
            </div>
          </cell>
          <cell title="星座" is-link class="red-item-cell red-item-s-cell">
            <div slot="value">
              <span style="color: #999">{{ getUserInfo['xingzu'] }}</span>
            </div>
          </cell>
          <cell title="所在地区" is-link class="red-item-cell red-item-s-cell">
            <div slot="value">
              <span style="color: #999">{{ getUserInfo['address'] }}</span>
            </div>
          </cell>
        </group>
        <group>
          <cell title="年收入" is-link class="red-item-cell red-item-s-cell">
            <div slot="value">
              <span style="color: #999">{{ getUserInfo['shouru'] }}</span>
            </div>
          </cell>
          <cell title="婚姻状态" is-link class="red-item-cell red-item-s-cell">
            <div slot="value">
              <span style="color: #999">{{ getUserInfo['hunyin'] }}</span>
            </div>
          </cell>
        </group>
      </div>
    </scroller>
  </div>
</template>
<style>
  .red-userinfo {
    padding-bottom: 60px;
  }
  .red-userinfo-img {
    width: 4em;
    height: 4em;
    border-radius: 5px;
  }
  .red-item-cell.weui_cell {
    padding: 10px 30px 4px 15px;
  }
  .red-userinfo .red-item-cell .weui_cell_ft:after {
    top: 40px;
  }
  .red-item-s-cell.red-item-cell.weui_cell {
    padding: 12px 30px 12px 15px;
  }
  .red-userinfo .red-item-s-cell .weui_cell_ft:after {
    top: 20px;
  }
</style>
<script>
  import {
    Group,
    Cell,
    Scroller
  } from 'vux/src/components'
  import {
    getUserInfo,
    baseImgSrc
  } from '../../vuex/getters'

  export default {
    components: {
      Group,
      Cell,
      Scroller
    },
    vuex: {
      getters: {
        getUserInfo,
        baseImgSrc
      }
    },
    data () {
      return {
        imgsrc: ''
      }
    },
    created () {
      this.imgsrc = this.baseImgSrc + this.getUserInfo['user_ico'].replace(/_small/g, '')
    },
    ready () {
      this.$nextTick(() => {
        this.$refs.scroller.reset()
      })
    }
  }
</script>
