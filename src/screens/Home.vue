<template>
  <div>
    <SearchInput v-model="textSearch" />
    <div class="section-title">
      <h1>Our products</h1>
      <router-link to="/create" class="reset-btn create-button">
        <span>Add product</span>
        <i class="fa fa-plus-circle" />
      </router-link>
    </div>
    <Table :columns="columns" :rows="rows" @tableSort="onTableSort" @actionClick="onActionClick" />
    <ModalPage v-if="showModal">
      <router-view></router-view>
    </ModalPage>
    <transition name="fade">
      <Notification
        v-if="notificationSettings.show"
        :type="notificationSettings.type"
        :message="notificationSettings.message"
      />
    </transition>
    <transition name="fade">
      <DeleteAlert
        v-if="showDeleteAlert"
        title="Are you sure?"
        description="Do you really want to delete this product?"
        @confirm="confirmDelete"
        @cancel="cancelDelete"
      />
    </transition>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

import Table from "../components/Table";
import ModalPage from "../components/Modal";
import SearchInput from "../components/SearchInput";
import DeleteAlert from "../components/Alert";
import Notification from "../components/Notification";

import config from "../config";

export default {
  name: "home-screen",
  components: { Table, SearchInput, ModalPage, Notification, DeleteAlert },

  data: function() {
    return {
      sortDirection: "asc",
      sortTarget: config.data.columns[0].key,
      columns: config.data.columns,
      textSearch: "",
      showModal: false,
      showDeleteAlert: false,
      toBeDeletedId: null
    };
  },
  async mounted() {
    await this.initProducts();
  },
  computed: {
    ...mapState("products", ["products"]),
    ...mapState("notification", ["notificationSettings"]),
    rows: function() {
      let results = [];
      if (!this.textSearch) {
        results = this.products;
      } else {
        results = this.products.filter(product =>
          Object.keys(product).some(prop => {
            const value = product[prop];
            return `${value}`.toLowerCase().includes(this.textSearch);
          })
        );
      }
      // We sort the search results ASC or DESC depending on which column has been clicked
      return results.sort((a, b) => {
        const valueA = a[this.sortTarget];
        const valueB = b[this.sortTarget];
        if (this.sortDirection === "asc") {
          return valueA >= valueB ? 1 : -1;
        }
        return valueA <= valueB ? 1 : -1;
      });
    }
  },
  methods: {
    ...mapActions("products", ["initProducts", "deleteProduct"]),
    onTableSort: function(target) {
      if (this.sortTarget === target) {
        this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
      } else {
        this.sortTarget = target;
      }
    },
    onActionClick: function(payload) {
      if (payload.type === "delete") {
        this.toBeDeletedId = payload.id;
        this.showDeleteAlert = true;
      } else if (payload.type === "edit") {
        this.$router.push(`/edit/${payload.id}`);
      }
    },
    confirmDelete: async function() {
      await this.deleteProduct(this.toBeDeletedId);
      this.toBeDeletedId = null;
      this.showDeleteAlert = false;
    },
    cancelDelete: function() {
      this.toBeDeletedId = null;
      this.showDeleteAlert = false;
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler: function(newVal) {
        this.showModal = newVal.meta && newVal.meta.showModal;
      }
    }
  }
};
</script>

<style lang="scss">
.section-title {
  display: flex;
  width: 100%;
  margin: 20px 0;
  h1 {
    margin: 0;
  }
}
.create-button {
  background-color: $color-yellow-light;
  color: $color-black;
  text-decoration: none;
  padding: 10px 20px;
  margin-left: auto;
  border-radius: 23px;
  &:hover {
    background-color: $color-yellow-dark;
  }
  > span {
    font-weight: 700;
    margin-right: 10px;
  }
}
</style>
