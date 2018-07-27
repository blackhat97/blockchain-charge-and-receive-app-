<template>
  <div class="payment-view">
    <top-bar title="대금 청구서"></top-bar>
    <h1>대금 청구서 보기</h1>
    <p>청구서 ID : {{ query.id }}</p>
    <p>물품명 : {{ query.name }}</p>
    <p>미수납금 : {{ query.balance }} 원</p>
    <p>수금확인 : {{ query.confirm == 'true' ? '완료' : '미완료'}}</p>
  </div>
</template>

<script>
const qs = require('query-string');
export default {
  name: 'PaymentView',
  data() {
    return {
      query: qs.parse(location.search)
    }
  }
}
</script>
