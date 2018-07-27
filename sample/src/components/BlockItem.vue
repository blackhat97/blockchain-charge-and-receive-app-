<template>
  <div class="block-item" @click="$router.push(`/${type}/view?id=${item.blockId}&name=${item.name}&balance=${item.balance}&confirm=${item.confirm}`)">
      <div class="block-id">{{ item.blockId }}</div>
      <div class="name">물품명  : {{ item.name }}</div>
      <div class="balance">잔금 : {{ item.balance }}</div>
  </div>
</template>


<script>
export default {
  name: 'BlockItem',
  props: ['item', 'type']
}
</script>
