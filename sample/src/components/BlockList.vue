<template>
  <div class="block-list">
    <block-item v-bind:key="item.key" v-for="item in items" :item="item" :type="type"></block-item>
  </div>
</template>

<script>
import BlockItem from '@/components/BlockItem.vue'

export default {
  name: 'BlockList',
  props: ['items', 'type'],
  components: {
    BlockItem
  }
}
</script>
