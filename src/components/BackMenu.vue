<template>
    <button v-if="buttonState" :class="{backMenu:true, backMenuOpen: widthPdf}" @click="backToMenu">
      <img src="../assets/backMenu.png" height ="34" width="34"/>
    </button>
</template>

<script>
/**
 * @module backMenu
 * @vue-event openMenu - Back to menu signal
 * @vue-prop {Boolean} [widthPdf=false] - Wether the pdf is open
 * @vue-prop {Boolean} [buttonMenuState=false] - Wether the button is display
 * @vue-data {Boolean} [buttonState=false] - Recieve the state of the button
 */

export default {
  name: 'BackMenu',
  emits: ['openMenu'],
  props: {
    widthPdf:  {
      type: Boolean,
      default: false
    },
    buttonMenuState:  {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      buttonState: false
    }
  },
  watch: {
    buttonMenuState: function () {
      this.buttonState = true;
    }
  },
  methods: {
    /**
     * Send a signal ot return to the menu pdf
     * @emits openMenu
     */
    backToMenu() {
      this.buttonState = false;
      this.$emit('openMenu');
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

  border:white solid;
  border-radius: 10%;

  box-shadow: 0 0 5px rgba(0,0,0,0.19), 0 0 5px rgba(0,0,0,0.19)
}

.backMenuOpen {
  right: calc(36% + 10px);
}

</style>