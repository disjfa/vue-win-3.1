<template>
  <div>
    <div class="p-3 desktop">
      <a
        v-for="program in programs"
        :key="program.name"
        href="#"
        @dblclick="activateProgram(program)"
        class="desktop-program"
      >
        <div>
          <i class="fa-2x" :class="program.icon"></i>
        </div>
        {{ program.title }}
      </a>
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
      this.$store.dispatch('activateProgram', program);
    },
  },
};
</script>
