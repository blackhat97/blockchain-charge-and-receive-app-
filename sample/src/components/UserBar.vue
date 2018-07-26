<template>
  <div class="user-bar">
    <span v-if="$User.isLogin()" >사용자</span>
    <router-link v-else to="/login">로그인</router-link>
  </div>
</template>

<script>
export default {
  name: 'UserBar'
}
</script>
