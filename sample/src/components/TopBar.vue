<template>
  <div class="top-bar">
    <title-bar :title="titleBar.title"></title-bar>
    <user-bar></user-bar>
  </div>
</template>

<script>
import TitleBar from '@/components/TitleBar.vue'
import UserBar from '@/components/UserBar.vue'

export default {
  name: 'TopBar',
  props: {
    title: String,
  },
  components: {
    TitleBar,
    UserBar
  },
  data() {
    return {
      titleBar: {
        title: this.title
      }
    }
  }
}
</script>
