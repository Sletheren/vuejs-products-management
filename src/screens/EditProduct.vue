<template>
  <div>
    <ProductForm
      :initialData="product"
      :submitText="'Save'"
      :cancelText="'Cancel'"
      @formSubmitted="onFormSubmit"
      @formCancelled="onFormCancel"
      :excludeFields="['id']"
    >
      <template v-slot:title>Edit Product</template>
    </ProductForm>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

import ProductForm from "../components/Form";

export default {
  components: {
    ProductForm
  },
  data: function() {
    return {
      id: this.$route.params.id
    };
  },
  async mounted() {
    await this.getProduct(this.id);
  },
  computed: {
    ...mapState("products", ["product", "error"])
  },
  methods: {
    ...mapActions("products", ["getProduct", "updateProduct"]),
    onFormCancel: function() {
      this.$router.replace("/");
    },
    onFormSubmit: async function(data) {
      await this.updateProduct(data);
      if (!this.error) {
        this.$router.replace("/");
      }
    }
  }
};
</script>

<style lang="scss">
</style>
