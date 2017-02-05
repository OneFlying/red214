<template>
  <div>
    <group>
      <x-input title="原始密码" placeholder="" :show-clear="true"></x-input>
      <x-input title="新密码" placeholder="" :show-clear="true"></x-input>
      <x-input title="重复密码" placeholder="" :show-clear="true"></x-input>
    </group>
    <box gap="20px 10px">
      <x-button class="btn-blueer">提交</x-button>
    </box>
  </div>
</template>
<script>
  import {
    Group,
    XInput,
    XButton,
    Box
  } from 'vux/src/components'
  export default{
    components: {
      Group,
      XInput,
      XButton,
      Box
    }
  }
</script>
