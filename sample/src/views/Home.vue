<template>
  <div class="home">
    <top-bar title="Home"></top-bar>
    <h1>Blockchain C&R</h1>
    <h2>블록체인 기반 청구 및 수금 시스템</h2>
    <rect-button-container :items="rectButtonList"></rect-button-container>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      rectButtonList: [
      { key: 1, title : '청구', link : '/charge' },
      { key: 2, title : '대금', link : '/payment' }
      ]
    }
  }
}
</script>
