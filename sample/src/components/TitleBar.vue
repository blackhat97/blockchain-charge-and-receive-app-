<template>
  <div class="title-bar">
    {{ title }}
  </div>
</template>

<script>
export default {
  name: 'TitleBar',
  props: {
    title: String,
  }
}
</script>
