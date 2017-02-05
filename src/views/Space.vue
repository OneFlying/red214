<template>
  <div>
    <a v-link="{name: 'gift', params: {userId: userid}}">访问她的空间</a>
    {{ userid }}<br>
    {{ username }}
  </div>
</template>
<script>
  export default {
    data () {
      return {
        username: '',
        userid: ''
      }
    },
    created () {
      this.userid = this.$route.params.userId
      this.username = this.$route.params.userName
    }
  }
</script>

