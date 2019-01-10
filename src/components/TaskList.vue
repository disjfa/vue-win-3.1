<template>
  <div class="p-3">
    <div class="form-group">
      <select
        name="task-list"
        size="8"
        class="form-control"
        v-model="selectedProgram"
      >
        <option
          v-for="program in activePrograms"
          :value="program._id"
          :key="program._id"
        >
          {{program.title}}
        </option>
      </select>
    </div>
    <div class="d-flex row">
      <div class="col">
        <a href="#" class="btn btn-block btn-default" @click.stop="switchTo()">Switch to</a>
      </div>
      <div class="col">
        <a href="#" class="btn btn-block btn-default" @click.stop="endTask()">End task</a>
      </div>
      <div class="col">
        <a href="#" class="btn btn-block btn-default" @click.stop="cancel()">Cancel</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskList',
  data() {
    return {
      selectedProgram: false,
    };
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  methods: {
    switchTo() {
      if (this.selectedProgram) {
        this.$store.commit('activateCurrentProgram', this.selectedProgram);
      }
    },
    endTask() {
      if (this.selectedProgram) {
        this.$store.commit('removeProgram', this.selectedProgram);
        this.selectedProgram = false;
      }
    },
    cancel() {
      this.$store.commit('removeProgram', this.id);
    },
  },
  computed: {
    activePrograms() {
      return this.$store.state.activePrograms;
    },
  },
};
</script>
