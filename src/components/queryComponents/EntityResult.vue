<template>
  <div class="myEntity">
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
export default {
  name: "EntityResult",
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
    checkType(field) {
      return !["uri", "bnode"].includes(this.values[field].type) && !["wkt", "category"].includes(field);
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