<template>
  <div>
    <template v-if="currentStep === 1">
      <ProductForm
        :initialData="newProduct"
        @formSubmitted="onFormSubmit"
        @formCancelled="onFormCancel"
        :submitText="'Next'"
        :cancelText="'Cancel'"
      >
        <template v-slot:title>Create Product</template>
      </ProductForm>
    </template>
    <template v-else>
      <div class="confirm-box">
        <h2 class="form-title">Do you confirm?</h2>
        <p>You're about to create a product with these information, if the data is correct then proceedd by clicking on Save.</p>
        <ul>
          <li :key="key" v-for="key in Object.keys(newProduct)">
            <span class="input-label">{{ key }}</span>
            <span class="input-value">{{ newProduct[key] }}</span>
          </li>
        </ul>
        <div class="buttons">
          <button class="btn-primary" type="button" @click="onConfirm">Save</button>
          <button type="button" @click="GoToStep(1)">Go back</button>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

import ProductForm from "../components/Form";
import config from "../config";

// Extracting the fields from the Columns config :)
const columns = config.data.columns;
const initialProduct = columns.reduce((acc, column) => {
  acc[column.key] = "";
  return acc;
}, {});

export default {
  components: {
    ProductForm
  },
  data: function() {
    return {
      currentStep: 1,
      newProduct: initialProduct
    };
  },
  computed: {
    ...mapState("products", ["error"])
  },
  methods: {
    ...mapActions("products", ["createProduct"]),
    onFormSubmit: function(data) {
      this.newProduct = data;
      this.GoToStep(2);
    },
    onFormCancel: function() {
      this.$router.replace("/");
    },
    onConfirm: async function() {
      await this.createProduct(this.newProduct);
      if (!this.error) {
        this.$router.replace("/");
      }
    },
    GoToStep: function(step) {
      this.currentStep = step;
    }
  }
};
</script>

<style lang="scss">
.confirm-box {
  p {
    color: $color-gray-light;
    font-size: 15px;
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      color: $color-white;
      background-color: $color-gray-light;
      margin: 10px 0;
      border-radius: 15px;
      overflow: hidden;
      > .input-label {
        display: inline-block;
        padding: 10px 0;
        margin-right: 10px;
        text-transform: uppercase;
        background-color: $color-gray-dark;

        width: 100px;
        text-align: center;
      }
      > .input-value {
        padding: 10px;
      }
    }
  }
}
</style>
