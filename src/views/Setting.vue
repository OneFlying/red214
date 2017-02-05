<template>
  <div>
    <group>
      <cell :title="$t('setting.yinsi')" is-link v-link="{path: '/setting/privacy'}">
        <span slot="icon" width="20" class="red-icon red-my-icon redfont icon-yinsiicon01"></span>
      </cell>
      <cell :title="$t('setting.mima')" is-link v-link="{path: '/setting/modify'}">
        <span slot="icon" width="20" class="red-icon red-my-icon redfont icon-xiugaimima" style="font-size: 20px"></span>
      </cell>
      <cell :title="$t('setting.yuyan')" is-link v-link="{path: '/setting/lang'}">
        <span slot="icon" width="20" class="red-icon red-my-icon redfont icon-yuyan"></span>
      </cell>
    </group>
    <group>
      <cell :title="$t('my.bangzhu')" is-link v-link="{path: '/setting/help'}">
        <span slot="icon" width="20" class="red-icon red-my-icon redfont icon-bangzhu"></span>
      </cell>
      <cell :title="$t('my.guanyu')" is-link v-link="{path: '/setting/about'}">
        <span slot="icon" width="20" class="red-icon red-my-icon redfont icon-dengpaotishi"></span>
      </cell>
    </group>
  </div>
</template>
<script>
  import {
    Group,
    Cell
  } from 'vux/src/components'

  export default {
    components: {
      Group,
      Cell
    }
  }
</script>
