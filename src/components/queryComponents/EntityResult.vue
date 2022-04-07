<template>
  <div class="myEntity" @click="sendPageOuvrage">
    <ul class="fieldList" v-for="field in extractFields" :key="field">
      <div v-if="checkType(field)">
        <h5 class="field"> {{ field }} </h5>
        <ul>
          <li v-for="datum in values[field].value" :key="datum"> {{ datum }} </li>
        </ul>
      </div>
    </ul>
  </div>
</template>

<script>
/**
 * @module entityResult
 * @vue-event {Array} pageOuvrage - File and page of where the entity is describe
 * @vue-prop {Object} values - Data of the entity
 * @vue-computed {Array} extractFields - All fields of values
 */
export default {
  name: "EntityResult",
  emits:["pageOuvrage"],
  props: {
    values:  {
      type: Object,
      default: () => {}
    },
  },
  computed: {
    extractFields() {
      
      return Object.keys(this.values);
    }
  },
  methods: {
    /**
     * Check wethrer the data should be display
     * @param {String} field - field to check
     */
    checkType(field) {
      return !["uri", "bnode"].includes(this.values[field].type) 
              && !["wkt", "category"].includes(field);
    },
    /**
     * Send pageOuvrage
     */
    sendPageOuvrage() {
      this.$emit("pageOuvrage", this.values["reference"].value[0].split(' page '));
    }
  },
}
</script>

<style scoped>
.myEntity {
    margin: 10px;
    padding: 1px 15px 1px 0px;
    background-color: rgba(44, 62, 80, 0.8);
    color: white;
    box-shadow: 0 0 50px rgba(255,255,255,0.5), 0 0 5px rgba(255,255,255,0.5);
    border-radius: 5px;
    text-align: left;
}

.field {
    margin-bottom: 5px;
}

.fieldList {
  padding-left: 20px;
}
</style>
