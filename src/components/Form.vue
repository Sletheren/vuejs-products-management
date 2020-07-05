<template>
  <div>
    <h2 class="form-title">
      <slot name="title" />
    </h2>
    <div class="form-errors" v-if="hasErrors">
      <i class="fa fa-times" />
      <span>Please fill all the required fileds</span>
    </div>
    <form action="#" @submit="formSubmit">
      <div class="form-row" :key="column.key" v-for="column in columns">
        <label :for="column.key">{{ column.title }}</label>
        <input
          :id="column.key"
          :type="column.type"
          :name="column.key"
          v-model="product[column.key]"
          :step="column.type === 'number' ? 0.01 : 0"
          placeholder="Please type a value..."
        />
      </div>
      <div class="buttons">
        <button id="form-submit-btn" class="btn-primary" type="submit">{{submitText}}</button>
        <button id="form-cancel-btn" type="button" @click="cancel">{{cancelText}}</button>
      </div>
    </form>
  </div>
</template>

<script>
import config from "../config";

const columns = config.data.columns;

export default {
  props: {
    initialData: { type: Object, default: () => {} },
    submitText: { type: String, default: () => "Submit" },
    cancelText: { type: String, default: () => "Cancel" },
    excludeFields: { type: Array, default: () => [] }
  },
  data: function() {
    return {
      hasErrors: false,
      columns: columns.filter(
        column => !this.excludeFields.includes(column.key)
      )
    };
  },
  computed: {
    product: function() {
      return { ...this.initialData };
    }
  },
  methods: {
    cancel: function() {
      this.$emit("formCancelled");
    },
    formSubmit: function(e) {
      this.hasErrors = false;
      e.preventDefault();
      const isValid = Object.keys(this.product).every(
        key => !!this.product[key]
      );
      if (isValid) {
        this.$emit("formSubmitted", this.product);
      } else {
        this.hasErrors = true;
      }
    }
  }
};
</script>


<style lang="scss">
.form-title {
  color: $color-white;
  font-size: 25px;
  margin: 0 0 20px;
}
.form-errors {
  background-color: $color-yellow-light;
  color: $color-black;
  padding: 10px;
  border-radius: 20px;
  > span {
    margin-left: 10px;
  }
}
.form-row {
  padding: 10px 0;
  margin: 10px 0;
  label {
    display: block;
    color: $color-white;
    font-size: 15px;
    margin-bottom: 10px;
  }
  input {
    display: block;
    background-color: $color-dark-light;
    color: $color-white;
    border: 1px solid $color-gray-dark;
    outline: none;
    padding: 10px;
    width: 100%;
    border-radius: 23px;
  }
}
</style>
