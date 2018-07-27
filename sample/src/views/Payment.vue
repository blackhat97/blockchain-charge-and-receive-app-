<template>
  <div class="payment">
    <top-bar title="대금 지급"></top-bar>
    <h1>대금 지급 현황</h1>
    <block-list type="payment" :items="receiveItems"></block-list>
  </div>
</template>

<script>
export default {
  name: 'Payment',
  data() {
    return {
      receiveItems: [
        { key: 3, blockId: 'AAF14C0', name: '물품3', balance: '1,150,000'},
        { key: 1, blockId: 'A3F14C0', name: '물품1', balance: '250,000'},
        { key: 2, blockId: '134C093', name: '물품2', balance: '350,000'},
        { key: 4, blockId: '0931454', name: '물품4', balance: '0', confirm: true},
        { key: 5, blockId: '21F1423', name: '물품5', balance: '0', confirm: false}
      ]
    }
  }
}
</script>
