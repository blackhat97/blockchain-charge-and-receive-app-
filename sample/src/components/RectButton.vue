<template>
  <div class="rect-button">
    <div class="button" v-bind:key="item.key" v-for="item in items" @click="$router.push(item.link)">
      {{ item.title }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Button',
  props: ['items']
}
</script>
