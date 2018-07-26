<template>
  <div class="rect-button-container">
    <rect-button :items="this.items"></rect-button>
  </div>
</template>

<script>
import RectButton from './RectButton'
export default {
  name: 'ButtonContainer',
  props: [ 'items' ],
  components: {
    'rect-button': RectButton
  }
}
</script>
