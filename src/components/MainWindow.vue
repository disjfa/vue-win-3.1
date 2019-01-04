<template>
  <div>
    <div class="p-3 position-absolute">
      <div v-for="program in programs" :key="program.name">
        <a href="#" @click="activateProgram(program)">
          {{ program.title }}
        </a>
      </div>
    </div>
    <window
      v-for="program in activePrograms"
      :id="program._id"
      :key="program._id"
    >
      <component :is="getComponent(program.name)" :id="program._id"></component>
    </window>
  </div>
</template>

<script>
import Window from './Window.vue';

export default {
  name: 'MainWindow',
  components: {
    Window,
  },
  mounted() {
    this.$store.dispatch('initialize');
  },
  computed: {
    programs() {
      return this.$store.state.programs;
    },
    activePrograms() {
      return this.$store.state.activePrograms;
    },
  },
  methods: {
    getComponent(name) {
      const program = this.$store.state.programs.find(p => p.name === name);
      return program.component;
    },
    activateProgram(program) {
      this.$store.dispatch('addProgram', program);
    },
  },
};
</script>
