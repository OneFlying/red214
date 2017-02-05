<template>
  <div>
    <group :title="$t('base.setLanguage')">
      <radio :options="list" :value.sync="language" @on-change="change"></radio>
    </group>
  </div>
</template>
<script>
  import { Group, Radio } from 'vux/src/components'
  import { setLanguage } from '../../vuex/actions'
  import { getLanguage } from '../../vuex/getters'

  export default {
    components: {
      Group,
      Radio
    },
    vuex: {
      actions: {
        setLanguage
      },
      getters: {
        getLanguage
      }
    },
    data () {
      return {
        list: ['简体中文', '繁体中文', 'English'],
        language: this.getLanguage === 'ch' ? '简体中文' : (this.getLanguage === 'en') ? 'English' : '繁体中文'
      }
    },
    methods: {
      change (val) {
        let storage = window.localStorage
        if (val === '简体中文') {
          window.Vue.config.lang = 'ch'
          this.setLanguage('ch')
          storage.setItem('locale', 'ch')
        } else if (val === 'English') {
          window.Vue.config.lang = 'en'
          this.setLanguage('en')
          storage.setItem('locale', 'en')
        } else {
          window.Vue.config.lang = 'ft'
          this.setLanguage('ft')
          storage.setItem('locale', 'ft')
        }
      }
    }
  }
</script>
<style>

</style>

