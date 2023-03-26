<template>
  <div class="mesBoard-container">
    <mes-board-add @refresh="refresh()"></mes-board-add>
    <mes-board-list ref="mesBoardList"></mes-board-list>
  </div>
</template>

<script>
  import MesBoardAdd from './MesBoardAdd'
  import MesBoardList from './MesBoardList'

  export default {
    name: "MesBoard",
    components: {
      "mesBoardAdd": MesBoardAdd,
      "mesBoardList": MesBoardList
    },
    methods: {
      refresh() {
        this.$refs.mesBoardList.getMesList();
      }
    }
  }
</script>

<style scoped>

</style>
