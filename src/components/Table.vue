<template>
  <div class="table-wrapper">
    <table>
      <thead>
        <tr>
          <th :key="column.key" v-for="column in columns" @click="sort(column.key)">
            {{column.title}}
            <i class="fa fa-sort" />
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="row.id" v-for="row in rows">
          <td :key="column.key" v-for="column in columns">{{ row[column.key] }}</td>
          <td>
            <button
              @click="onActionClick('edit', row.id)"
              class="reset-btn action-button action-edit"
            >
              <i class="fa fa-edit" />
            </button>
            <button
              @click="onActionClick('delete', row.id)"
              class="reset-btn action-button action-delete"
            >
              <i class="fa fa-trash" />
            </button>
          </td>
        </tr>
        <tr v-if="!rows.length">
          <td :colspan="columns.length + 1">There are no results... 😢</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Table",
  props: {
    columns: Array,
    rows: Array
  },
  methods: {
    sort: function(target) {
      this.$emit("tableSort", target);
    },
    onActionClick: function(type, id) {
      this.$emit("actionClick", {
        type,
        id
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.table-wrapper {
  width: 100%;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }

  &::-webkit-scrollbar-thumb {
    background-color: $color-yellow-dark;
    outline: 1px solid $color-yellow-light;
  }
}
table {
  margin: 0;
  width: 100%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  border-collapse: collapse;

  th,
  td {
    padding: 6px 12px;
    text-align: left;
  }
  td[colspan]:not([colspan="1"]) {
    text-align: center;
  }
  th {
    font-weight: bold;
    text-transform: capitalize;
    cursor: pointer;
  }
  > thead {
    tr {
      font-weight: 900;
      color: #ffffff;
      background: $color-gray-dark;
    }
  }
  > tbody {
    tr {
      background: $color-white;
      &:nth-of-type(odd) {
        background: darken($color-white, 10);
      }
    }
  }
}
</style>
