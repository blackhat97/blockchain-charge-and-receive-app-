<template>
  <div class="charge-new">
    <top-bar title="청구"></top-bar>
    <h1>청구 하기</h1>
    <form id="charge-form">
      <div class="target">
        대상 : 
        <select name="target" form="charge-form">
          <option value="기업B">기업B</option>
          <option value="기업C">기업C</option>
          <option value="기업D">기업D</option>
        </select>
      </div>
      <ul class="product">
        <component v-for="(item, index) in items" :is="item" :index="index" :items="items"></component>
        <button type="button" @click="addItem">추가하기</button>
      </ul>
      <div class="total">총액 :
      </div>
      <input type="submit" value="청구하기">
    </form>
  </div>
</template>

<script>
export default {
  methods: {
    addItem: function () { this.items.push('product-items') }
  },
  name: 'ChargeNew',
  data() {
    return { items: ['product-items'] } 
  }
}
</script>
