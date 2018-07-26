<template>
  <button class="plus-button" @click="$router.push(link)"></button>
</template>

<script>
export default {
  name: 'PlusButton',
  props: ['link']
}
</script>
