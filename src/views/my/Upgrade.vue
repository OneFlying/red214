<template>
  <div>
    <scroller lock-x v-ref:scroller :height="-40+'px'" style="margin-top: -4px">
      <div style="height: 100%; padding-bottom: 60px">
        <group :title="$t('upgrade.huiyuanjieshao')">
          <flexbox :gutter="0" style="border-bottom: 1px solid #ddd;" class="red-upgrade-table">
            <flexbox-item :span="3">
              <div class="red-upgrade-item-1">
                {{ $t('upgrade.putonghuiyuan') }}
              </div>
            </flexbox-item>
            <flexbox-item :span="2">
              <div class="red-upgrade-item-1">
                <span class="redfont red-icon icon-huiyuan" style="color: #999"></span>
              </div>
            </flexbox-item>
            <flexbox-item :span="7">
              <div class="red-upgrade-item-1" style="border:none">
                {{ $t('upgrade.putongjieshao') }}
              </div>
            </flexbox-item>
          </flexbox>
          <flexbox :gutter="0" style="border-bottom: 1px solid #ddd;" class="red-upgrade-table">
            <flexbox-item :span="3">
              <div class="red-upgrade-item-2">
                {{ $t('upgrade.huangjinhuiyuan') }}
              </div>
            </flexbox-item>
            <flexbox-item :span="2">
              <div class="red-upgrade-item-2">
                <span class="redfont red-icon icon-huiyuan" style="color: #ffce75"></span>
              </div>
            </flexbox-item>
            <flexbox-item :span="7">
              <div class="red-upgrade-item-2" style="border:none">
                {{ $t('upgrade.huangjinjieshao') }}
              </div>
            </flexbox-item>
          </flexbox>
          <flexbox :gutter="0" class="red-upgrade-table">
            <flexbox-item :span="3">
              <div class="red-upgrade-item-3">
                {{ $t('upgrade.zuanshihuiyuan') }}
              </div>
            </flexbox-item>
            <flexbox-item :span="2">
              <div class="red-upgrade-item-3">
                <span class="redfont red-icon icon-diamond" style="color: #0099ff"></span>
              </div>
            </flexbox-item>
            <flexbox-item :span="7">
              <div class="red-upgrade-item-3" style="border:none">
                {{ $t('upgrade.zuanshijieshao') }}
              </div>
            </flexbox-item>
          </flexbox>
        </group>
        <group :title="$t('upgrade.quanxian')">
          <flexbox :gutter="0" class="red-upgrade-table red-upgrade-center" style="border-bottom: 1px solid #ddd;">
            <flexbox-item :span="3">
              <div class="red-upgrade-item-bottom-1">{{ $t('upgrade.gongneng') }}</div>
            </flexbox-item>
            <flexbox-item :span="3">
              <div class="red-upgrade-item-bottom-1">{{ $t('upgrade.putonghuiyuan') }}</div>
            </flexbox-item>
            <flexbox-item :span="3">
              <div class="red-upgrade-item-bottom-1">{{ $t('upgrade.huangjinhuiyuan') }}</div>
            </flexbox-item>
            <flexbox-item :span="3">
              <div>{{ $t('upgrade.zuanshihuiyuan') }}</div>
            </flexbox-item>
          </flexbox>
          <flexbox :gutter="0" class="red-upgrade-table red-upgrade-center" style="border-bottom: 1px solid #ddd;">
            <flexbox-item :span="3">
              <div class="red-upgrade-item-bottom-2">{{ $t('upgrade.huiyuanshengji') }}</div>
            </flexbox-item>
            <flexbox-item :span="3">
              <div class="red-upgrade-item-bottom-2"></div>
            </flexbox-item>
            <flexbox-item :span="3">
              <div style="border-right: 1px solid #ddd; height: 160px;padding-top: 10px;color:#ffce75">
                <div>10{{ $t('upgrade.golds') }}/1{{ $t('upgrade.month') }}</div>
                <div>25{{ $t('upgrade.golds') }}/3{{ $t('upgrade.month') }}</div>
                <div>40{{ $t('upgrade.golds') }}/6{{ $t('upgrade.month') }}</div>
                <div>80{{ $t('upgrade.golds') }}/12{{ $t('upgrade.month') }}</div>
              </div>
            </flexbox-item>
            <flexbox-item :span="3">
              <div style="height: 160px;padding-top: 10px;color: #0099ff;">
                <div>30{{ $t('upgrade.golds') }}/1{{ $t('upgrade.month') }}</div>
                <div>80{{ $t('upgrade.golds') }}/3{{ $t('upgrade.month') }}</div>
                <div>150{{ $t('upgrade.golds') }}/6{{ $t('upgrade.month') }}</div>
                <div>280{{ $t('upgrade.golds') }}/12{{ $t('upgrade.month') }}</div>
              </div>
            </flexbox-item>
          </flexbox>
          <flexbox :gutter="0" class="red-upgrade-table red-upgrade-center" style="border-bottom: 1px solid #ddd;">
            <flexbox-item :span="3">
              <div class="red-upgrade-item-bottom-1">{{ $t('upgrade.rizhi') }}</div>
            </flexbox-item>
            <flexbox-item :span="3">
              <div class="red-upgrade-item-bottom-1" style="color: #555;">{{ $t('upgrade.limit') }}</div>
            </flexbox-item>
            <flexbox-item :span="3">
              <div class="red-upgrade-item-bottom-1" style="color: #555;">{{ $t('upgrade.limit') }}</div>
            </flexbox-item>
            <flexbox-item :span="3">
              <div style="color: #555;">{{ $t('upgrade.limit') }}</div>
            </flexbox-item>
          </flexbox>
          <flexbox :gutter="0" class="red-upgrade-table red-upgrade-center" style="border-bottom: 1px solid #ddd;">
            <flexbox-item :span="3">
              <div class="red-upgrade-item-bottom-1">{{ $t('upgrade.zhaopian') }}</div>
            </flexbox-item>
            <flexbox-item :span="3">
              <div class="red-upgrade-item-bottom-1" style="color: #555;">{{ $t('upgrade.limit') }}</div>
            </flexbox-item>
            <flexbox-item :span="3">
              <div class="red-upgrade-item-bottom-1" style="color: #555;">{{ $t('upgrade.limit') }}</div>
            </flexbox-item>
            <flexbox-item :span="3">
              <div style="color: #555;">{{ $t('upgrade.limit') }}</div>
            </flexbox-item>
          </flexbox>
          <flexbox :gutter="0" class="red-upgrade-table red-upgrade-center" style="border-bottom: 1px solid #ddd;">
            <flexbox-item :span="3">
              <div class="red-upgrade-item-bottom-3">{{ $t('upgrade.email') }}</div>
            </flexbox-item>
            <flexbox-item :span="3">
              <div style="color: #555;" class="red-upgrade-item-bottom-3">
                {{ $t('upgrade.emailputong') }}
              </div>
            </flexbox-item>
            <flexbox-item :span="3">
              <div class="red-upgrade-item-bottom-3" style="color: #ffce75;">
                {{ $t('upgrade.emailhuangjin') }}
              </div>
            </flexbox-item>
            <flexbox-item :span="3">
              <div style="color: #0099ff;border: none;" class="red-upgrade-item-bottom-3">
                {{ $t('upgrade.emailzuanshi') }}
              </div>
            </flexbox-item>
          </flexbox>
          <flexbox :gutter="0" class="red-upgrade-table red-upgrade-center" style="border-bottom: 1px solid #ddd;">
            <flexbox-item :span="3">
              <div class="red-upgrade-item-bottom-4">{{ $t('upgrade.liwu') }}</div>
            </flexbox-item>
            <flexbox-item :span="3">
              <div class="red-upgrade-item-bottom-4" style="color: #555;">
                {{ $t('upgrade.liwuputong') }}
              </div>
            </flexbox-item>
            <flexbox-item :span="3">
              <div class="red-upgrade-item-bottom-4" style="color: #ffce75;">
                {{ $t('upgrade.liwuhuangjin') }}
              </div>
            </flexbox-item>
            <flexbox-item :span="3">
              <div style="color: #0099ff;border:none;" class="red-upgrade-item-bottom-4">
                {{ $t('upgrade.liwuzuanshi') }}
              </div>
            </flexbox-item>
          </flexbox>
          <flexbox :gutter="0" class="red-upgrade-table red-upgrade-center" style="border-bottom: 1px solid #ddd;">
            <flexbox-item :span="3">
              <div class="red-upgrade-item-bottom-5">{{ $t('upgrade.im') }}</div>
            </flexbox-item>
            <flexbox-item :span="3">
              <div class="red-upgrade-item-bottom-5" style="color: #555;">{{ $t('upgrade.wu') }}</div>
            </flexbox-item>
            <flexbox-item :span="3">
              <div class="red-upgrade-item-bottom-5" style="color: #ffce75;">{{ $t('upgrade.imhuangjin') }}</div>
            </flexbox-item>
            <flexbox-item :span="3">
              <div style="color: #0099ff;border: none;" class="red-upgrade-item-bottom-5">{{ $t('upgrade.imzuanshi') }}</div>
            </flexbox-item>
          </flexbox>
          <flexbox :gutter="0" class="red-upgrade-table red-upgrade-center">
            <flexbox-item :span="3">
              <div class="red-upgrade-item-bottom-1">{{ $t('upgrade.jiahaoyou') }}</div>
            </flexbox-item>
            <flexbox-item :span="3">
              <div class="red-upgrade-item-bottom-1" style="color: #555;">{{ $t('upgrade.limit') }}</div>
            </flexbox-item>
            <flexbox-item :span="3">
              <div class="red-upgrade-item-bottom-1" style="color: #555;">{{ $t('upgrade.limit') }}</div>
            </flexbox-item>
            <flexbox-item :span="3">
              <div style="color: #555;">{{ $t('upgrade.limit') }}</div>
            </flexbox-item>
          </flexbox>
        </group>
      </div>
    </scroller>
  </div>
</template>
<style>
  .red-upgrade-table {
    font-size: 14px !important;
  }
  .red-upgrade-center {
    text-align: center;
  }
  .red-upgrade-item-1 {
    border-right: 1px solid #ddd;
    text-align: center;
    height: 50px;
    padding-top: 10px;
  }
  .red-upgrade-item-2 {
    border-right: 1px solid #ddd;
    text-align: center;
    height: 90px;
    padding-top: 10px;
  }
  .red-upgrade-item-3 {
    border-right: 1px solid #ddd;
    text-align: center;
    height: 100px;
    padding-top: 10px;
  }
  .red-upgrade-item-right {
    padding-left: 5px;
  }
  .red-upgrade-item-bottom-1 {
    height: 40px;
    border-right: 1px solid #ddd;
    padding-top: 10px;
  }
  .red-upgrade-item-bottom-2 {
    height: 160px;
    border-right: 1px solid #ddd;
    padding-top: 10px;
  }
  .red-upgrade-item-bottom-3 {
    height: 100px;
    border-right: 1px solid #ddd;
    padding-top: 10px;
  }
  .red-upgrade-item-bottom-4 {
    height: 110px;
    border-right: 1px solid #ddd;
    padding-top: 10px;
  }
  .red-upgrade-item-bottom-5 {
    height: 60px;
    border-right: 1px solid #ddd;
    padding-top: 10px;
  }
</style>
<script>
  import {
    Scroller,
    Group,
    Cell,
    Flexbox,
    FlexboxItem
  } from 'vux/src/components'
  export default{
    components: {
      Scroller,
      Group,
      Cell,
      Flexbox,
      FlexboxItem
    },
    ready () {
      this.$nextTick(() => {
        this.$refs.scroller.reset()
      })
    }
  }
</script>
