<template>
  <div>
    <tab :line-width=2 active-color='#58b7ff' :index.sync="index">
      <tab-item class="vux-center" :selected="tabactive === 1" @click="tabactive = 1">{{ $t('paypal.chongzhi') }}</tab-item>
      <tab-item class="vux-center" :selected="tabactive === 2" @click="tabactive = 2">{{ $t('paypal.shengji') }}</tab-item>
    </tab>
    <swiper :index.sync="index" height="880px" :show-dots="false">
      <swiper-item>
        <div class="tab-swiper">
          <group :title="$t('paypal.payUser')">
            <checker
              :value.sync="touser"
              default-item-class="red-paypal-item"
              selected-item-class="red-paypal-item-selected">
              <checker-item value="1">{{ $t('paypal.payToMe') }}</checker-item>
              <checker-item value="2">{{ $t('paypal.payToFri') }}</checker-item>
            </checker>
            <cell is-link class="red-item-cell"
                  :title="$t('paypal.selectFri')"
                  @click="showPopup=true"
                  :style="touser === '2' ? '' : 'display:none'">
              <div slot="value">
                <span style="color: #999">{{ selfriend }}</span>
              </div>
            </cell>
          </group>
          <group :title="$t('paypal.payCount')">
            <checker :value.sync="zibi" default-item-class="red-paypal-item" selected-item-class="red-paypal-item-selected">
              <checker-item value="20"><span class="redfont red-icon icon-weibiaoti- red-paypal-item-coin"></span>20</checker-item>
              <checker-item value="50"><span class="redfont red-icon icon-weibiaoti- red-paypal-item-coin"></span>50</checker-item>
              <checker-item value="100"><span class="redfont red-icon icon-weibiaoti- red-paypal-item-coin"></span>100</checker-item>
              <checker-item value="200"><span class="redfont red-icon icon-weibiaoti- red-paypal-item-coin"></span>200</checker-item>
              <checker-item value="500"><span class="redfont red-icon icon-weibiaoti- red-paypal-item-coin"></span>500</checker-item>
              <checker-item value="1000"><span class="redfont red-icon icon-weibiaoti- red-paypal-item-coin"></span>1000</checker-item>
            </checker>
          </group>
          <group :title="$t('paypal.payMethod')">
            <checker :value.sync="paySelect" default-item-class="red-paypal-item" selected-item-class="red-paypal-item-selected">
              <checker-item value="PayPal"><img alt="PayPal" src="../assets/paypal.png" style="height:26px;"></checker-item>
            </checker>
          </group>
          <box gap="30px 10px">
            <x-button class="btn-blueer">{{ $t('paypal.sureToPay') }}</x-button>
          </box>
        </div>
      </swiper-item>
      <swiper-item>
        <div class="tab-swiper">
          <group :title="$t('paypal.huangjin')">
            <checker :value.sync="upgrade_type" default-item-class="red-paypal-item" selected-item-class="red-paypal-item-selected">
              <checker-item value="utypea_1">
                <div class="red-upgrade-item">
                  <p class="red-item-title"><i>{{ $t('paypal.onemonth') }}</i><span class="redfont red-icon icon-weibiaoti- red-paypal-item-coin"></span>10</p>
                  <div class="red-item-subtitle">{{ $t('paypal.need') }} 10 {{ $t('paypal.dollar') }} / {{ $t('paypal.month') }}</div>
                </div>
              </checker-item>
              <checker-item value="utypea_3">
                <div class="red-upgrade-item">
                  <p class="red-item-title"><i>{{ $t('paypal.thrmonth') }}</i><span class="redfont red-icon icon-weibiaoti- red-paypal-item-coin"></span>25</p>
                  <div class="red-item-subtitle">{{ $t('paypal.need') }} 8.33 {{ $t('paypal.dollar') }} / {{ $t('paypal.month') }}</div>
                </div>
              </checker-item>
              <checker-item value="utypea_6">
                <div class="red-upgrade-item">
                  <p class="red-item-title"><i>{{ $t('paypal.sixmonth') }}</i><span class="redfont red-icon icon-weibiaoti- red-paypal-item-coin"></span>40</p>
                  <div class="red-item-subtitle">{{ $t('paypal.need') }} 7.5 {{ $t('paypal.dollar') }} / {{ $t('paypal.month') }}</div>
                </div>
              </checker-item>
              <checker-item value="utypea_12">
                <div class="red-upgrade-item">
                  <p class="red-item-title"><i>{{ $t('paypal.twemonth') }}</i><span class="redfont red-icon icon-weibiaoti- red-paypal-item-coin"></span>80</p>
                  <div class="red-item-subtitle">{{ $t('paypal.need') }} 6.67 {{ $t('paypal.dollar') }} / {{ $t('paypal.month') }}</div>
                </div>
              </checker-item>
            </checker>
          </group>
          <group :title="$t('paypal.zuanshi')">
            <checker :value.sync="upgrade_type" default-item-class="red-paypal-item" selected-item-class="red-paypal-item-selected">
              <checker-item value="utypeb_1">
                <div class="red-upgrade-item">
                  <p class="red-item-title"><i>{{ $t('paypal.onemonth') }}</i><span class="redfont red-icon icon-weibiaoti- red-paypal-item-coin"></span>30</p>
                  <div class="red-item-subtitle">{{ $t('paypal.need') }} 30 {{ $t('paypal.dollar') }} / {{ $t('paypal.month') }}</div>
                </div>
              </checker-item>
              <checker-item value="utypeb_3">
                <div class="red-upgrade-item">
                  <p class="red-item-title"><i>{{ $t('paypal.thrmonth') }}</i><span class="redfont red-icon icon-weibiaoti- red-paypal-item-coin"></span>80</p>
                  <div class="red-item-subtitle">{{ $t('paypal.need') }} 26.67 {{ $t('paypal.dollar') }} / {{ $t('paypal.month') }}</div>
                </div>
              </checker-item>
              <checker-item value="utypeb_6">
                <div class="red-upgrade-item">
                  <p class="red-item-title"><i>{{ $t('paypal.sixmonth') }}</i><span class="redfont red-icon icon-weibiaoti- red-paypal-item-coin"></span>150</p>
                  <div class="red-item-subtitle">{{ $t('paypal.need') }} 25 {{ $t('paypal.dollar') }} / {{ $t('paypal.month') }}</div>
                </div>
              </checker-item>
              <checker-item value="utypeb_12">
                <div class="red-upgrade-item">
                  <p class="red-item-title"><i>{{ $t('paypal.twemonth') }}</i><span class="redfont red-icon icon-weibiaoti- red-paypal-item-coin"></span>280</p>
                  <div class="red-item-subtitle">{{ $t('paypal.need') }} 23.33 {{ $t('paypal.dollar') }} / {{ $t('paypal.month') }}</div>
                </div>
              </checker-item>
            </checker>
          </group>
          <group :title="$t('paypal.upgradeUser')">
            <checker :value.sync="touser" default-item-class="red-paypal-item" selected-item-class="red-paypal-item-selected">
              <checker-item value="1">{{ $t('paypal.payToMe') }}</checker-item>
              <checker-item value="2">{{ $t('paypal.payToFri') }}</checker-item>
              <cell is-link class="red-item-cell"
                    :title="$t('paypal.selectFri')"
                    @click="showPopup=true"
                    :style="touser === '2' ? '' : 'display:none'">
                <div slot="value">
                  <span style="color: #999">{{ selfriend }}</span>
                </div>
              </cell>
            </checker>
          </group>
          <box gap="30px 10px">
            <x-button class="btn-blueer">{{ $t('paypal.sureToUpgrade') }}</x-button>
          </box>
        </div>
      </swiper-item>
    </swiper>
    <popup :show.sync="showPopup" height="288px">
      <cell :title="$t('paypal.selectFri')" class="vux-center"></cell>
      <picker :data='friendList' :value.sync='selfriend'></picker>
    </popup>
  </div>
</template>
<script>
  import {
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    Group,
    Cell,
    Switch,
    Radio,
    Selector,
    XButton,
    Box,
    Checker,
    CheckerItem,
    Popup,
    Picker
  } from 'vux/src/components'
  import { baseServerPath, getUserInfo, getLanguage } from '../vuex/getters'

  export default {
    components: {
      Tab,
      TabItem,
      Swiper,
      SwiperItem,
      Group,
      Cell,
      Switch,
      Radio,
      Selector,
      XButton,
      Box,
      Checker,
      CheckerItem,
      Popup,
      Picker
    },
    vuex: {
      getters: {
        baseServerPath,
        getUserInfo,
        getLanguage
      }
    },
    data () {
      return {
        tabactive: 1,
        touser: '1',
        index: 0,
        selfriend: [''],
        paySelect: 'PayPal',
        zibi: '200',
        show: false,
        upgrade_type: 'utypea_1',
        isShow: false,
        showPopup: false,
        friends: [],
        friendList: []
      }
    },
    created () {
      let storage = window.localStorage
      let userinfo = JSON.parse(storage.getItem('userinfo'))
      this.$http.jsonp(this.baseServerPath, {
        params: {
          act: 'getfriend',
          lang: this.getLanguage,
          isMobile: true,
          userid: userinfo['user_id']
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
  }
</script>
<style>
  .btn-blueer {
    background: #58b7ff;
    color: #fff !important;
  }
  .btn-blueer:hover, .btn-blueer:focus {
    background: #20a0ff;
  }
  .btn-blueer:active {
    background: #1d8ce0 !important;
  }
  .weui_cells_radio .weui_check:checked + .weui_icon_checked:before {
    color: #20a0ff !important;
  }
  .weui_cells_title {
    margin-top: 1.5em !important;
  }
  .red-paypal-item {
    padding: 10px 15px;
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    box-align: center;
    flex-align: center;
    align-items: center;
  }
  .red-paypal-item:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 1px;
    border-top: 1px solid #D9D9D9;
    color: #D9D9D9;
    transform-origin: 0 0;
    transform: scaleY(0.5);
    left: 15px;
  }
  .red-paypal-item-selected:after {
    content: '\ea08';
    font-size: 16px;
    color: #20a0ff;
    font-family: "weui";
    position: absolute;
    right: 15px;
    top: 12px;
  }
  .red-paypal-item-coin {
    font-size: 16px;
    color: #ffb026;
    padding-right: 5px;
  }
  .red-item-subtitle {
    font-size: 14px;
    color: #666;
  }
  .red-item-title > i {
    font-style: normal;
    width: 105px;
    display: inline-block;
  }
  .red-item-title > span {
    margin-left: 10px;
  }
  .red-item-cell {
    padding-right: 25px;
  }
  .red-item-cell .weui_cell_ft:after {
    position: absolute;
    display: block;
    top: 18px;
    right: 10px;
  }
</style>
