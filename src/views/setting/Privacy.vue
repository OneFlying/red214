<template>
  <div>
    <group title="主页访问权限">
      <checker
        :value.sync="home"
        default-item-class="red-privacy-item"
        selected-item-class="red-privacy-item-selected"
        @on-change="change">
        <checker-item :value="0">对所有人开放</checker-item>
        <checker-item :value="1">只对注册用户开放</checker-item>
        <checker-item :value="2">只对好友开放</checker-item>
        <checker-item :value="3">用户凭密码访问</checker-item>
      </checker>
      <div v-show="show">
        <group>
          <x-input title="问题1" placeholder="" :show-clear="true"></x-input>
          <x-input title="答案1" placeholder="" :show-clear="true"></x-input>
          <x-input title="问题2" placeholder="" :show-clear="true"></x-input>
          <x-input title="答案2" placeholder="" :show-clear="true"></x-input>
          <x-input title="问题3" placeholder="" :show-clear="true"></x-input>
          <x-input title="答案3" placeholder="" :show-clear="true"></x-input>
        </group>
        <tip style="color: #333;padding-bottom: 10px">
          <div>问题或答案最多可输入20个字符。</div>
          <div><span style="font-weight: bold">示例</span> 问题：我的绰号是什么？</div>
          <div>答案：猪坚强</div>
        </tip>
      </div>
    </group>
    <group title="留言权限设置">
      <checker
        :value.sync="message"
        default-item-class="red-privacy-item"
        selected-item-class="red-privacy-item-selected"
        @on-change="change">
        <checker-item :value="0">任何用户都可以留言或发表评论</checker-item>
        <checker-item :value="1">只允许好友留言或发表评论</checker-item>
        <checker-item :value="2">不允许任何人留言或发表评论</checker-item>
      </checker>
    </group>
    <group title="防骚扰设置">
      <checker
        :value.sync="deny"
        default-item-class="red-privacy-item"
        selected-item-class="red-privacy-item-selected"
        @on-change="change">
        <checker-item :value="0">允许任何人加我为好友</checker-item>
        <checker-item :value="1">需要验证才能把我列为好友</checker-item>
        <checker-item :value="2">不允许任何人把我列为好友</checker-item>
      </checker>
    </group>
  </div>
</template>
<style>
  .red-privacy-item {
    padding: 10px 15px 10px 45px;
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    box-align: center;
    flex-align: center;
    align-items: center;
  }
  .red-privacy-item:before {
    width: 20px;
    height: 20px;
    position: absolute;
    content: '';
    background: #ddd;
    border-radius: 100%;
    left: 15px;
    margin-top: 2px;
  }
  .red-privacy-item:after {
    content: " ";
    position: absolute;
    top: 0;
    width: 100%;
    height: 1px;
    border-top: 1px solid #D9D9D9;
    color: #D9D9D9;
    transform-origin: 0 0;
    transform: scaleY(0.5);
    left: 15px;
  }
  .red-privacy-item-selected:before {
    content: '\ea08';
    font-size: 14px;
    color: #fff;
    background: #20a0ff;
    font-family: "weui";
    position: absolute;
    text-indent: 3px;
    line-height: 20px;
  }
</style>
<script>
  import {
    Group,
    Checker,
    CheckerItem,
    XInput,
    Tip
  } from 'vux/src/components'
  export default{
    components: {
      Group,
      Checker,
      CheckerItem,
      XInput,
      Tip
    },
    methods: {
      change (val) {
        if (val === 3) {
          this.show = true
        } else {
          this.show = false
        }
      }
    },
    data () {
      return {
        home: 0,
        message: 1,
        deny: 2,
        show: false
      }
    }
  }
</script>
