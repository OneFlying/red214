<!-- 充值记录 -->
<template>
  <div>
    <scroller lock-x v-ref:scroller :height="-40+'px'" style="margin-top: -4px">
      <div style="padding-bottom: 50px;">
        <div class="red-payment-countup">
          <countup :start-val="1" :end-val="total" :duration="4" ></countup>
        </div>
        <group>
          <flexbox :gutter="0">
            <flexbox-item :span="5">
              <div class="red-payment-item-1" style="font-size: 16px;color:#000">
                {{ $t('payment.dingdanhao') }}
              </div>
            </flexbox-item>
            <flexbox-item :span="3">
              <div class="red-payment-item-1" style="font-size: 16px;color:#000">
                {{ $t('payment.jiaoyijine') }}
              </div>
            </flexbox-item>
            <flexbox-item :span="4">
              <div class="red-payment-item-1" style="font-size: 16px;color:#000">
                {{ $t('payment.jiaoyishijian') }}
              </div>
            </flexbox-item>
          </flexbox>
          <flexbox :gutter="0" v-for="balance in balances">
            <flexbox-item :span="5">
              <div class="red-payment-item-1">
                {{ balance['ordernumber'] }}
              </div>
            </flexbox-item>
            <flexbox-item :span="3">
              <div class="red-payment-item-1">
                {{ balance['money'] | fmtMoney }}
              </div>
            </flexbox-item>
            <flexbox-item :span="4">
              <div class="red-payment-item-1">
                {{ balance['addtime'] | fmtDate }}
              </div>
            </flexbox-item>
          </flexbox>
        </group>
      </div>
    </scroller>
  </div>
</template>
<style>
  .red-payment-item-1 {
    height: 40px;
    border-bottom: 1px solid #dddddd;
    border-right: 1px solid #dddddd;
    padding-left: 5px;
    line-height: 40px;
    font-size: 14px;
    color: #555;
  }
  .red-payment-countup {
    font-size: 4em;
    color: #20a0ff;
    text-align: center;
  }
</style>
<script>
  import {
    Scroller,
    Flexbox,
    FlexboxItem,
    Group,
    Countup
  } from 'vux/src/components'
  import {
    getLanguage,
    getUserInfo,
    baseServerPath,
    getBalance
  } from '../../vuex/getters'

  export default{
    components: {
      Scroller,
      Flexbox,
      FlexboxItem,
      Group,
      Countup
    },
    vuex: {
      getters: {
        getLanguage,
        getUserInfo,
        baseServerPath,
        getBalance
      }
    },
    methods: {
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
            this.balances = res.msg
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
        balances: [],
        total: this.getBalance
      }
    },
    ready () {
      this.$nextTick(() => {
        this.$refs.scroller.reset()
      })
    },
    created () {
      this.getbalance()
    }
  }
</script>
