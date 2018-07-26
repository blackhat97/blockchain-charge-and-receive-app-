<template>
  <div class="block-list">
    <block-item v-bind:key="item.key" v-for="item in items" :item="item"></block-item>
  </div>
</template>

<script>
import BlockItem from '@/components/BlockItem.vue'

export default {
  name: 'BlockList',
  props: ['items'],
  components: {
    BlockItem
  }
}
</script>
