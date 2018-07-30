<template>
  <ul class="item">
          <li><input type="text" placeholder="이름"></li>
          <li><input type="text" placeholder="수량"></li>
          <li><input type="text" placeholder="가격"></li>
          <button type="button" @click="removeItem(index, items)">{{ index }} 취소하기</button>
  </ul>
</template>

<script>
export default {
  props: ['index', 'items'],
  methods: {
    removeItem: function (index, items) { items.splice(index, 1) }
  },
  name: 'ProductItems'
}
</script>
