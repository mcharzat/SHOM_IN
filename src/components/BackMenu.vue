<template>
    <button :hidden="isPush" :class="{backMenu:true, backMenuOpen: moveButton}" @click="backToMenu">
      <img src="../assets/backMenu.png" height ="34" width="34"/>
    </button>
</template>

<script>

export default {
  name: 'BackMenu',
  emits: ['openMenu'],
  props: {
    widthPdf:  {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      isPush: false
    }
  },
  computed : {
    moveButton() {
      return this.widthPdf != 0;
    }
  },
  methods: {
    backToMenu() {
      this.isPush = !this.isPush;
      this.$emit('openMenu', this.isPush);
    }
  },
}
</script>

<style scoped>

.backMenu {
  position: absolute;
  height: 50px;
  width: 50px;
  top: 155px;
  right: 5px;
  z-index: 30;
  
  background-color:white;

  border:solid;
  border-color: white;

  box-shadow: 0 0 5px rgba(0,0,0,0.19), 0 0 5px rgba(0,0,0,0.19)
}

.backMenuOpen {
  right: calc(36% + 10px);
}

</style>