<template>
  <div>
    <div class="p-3 desktop">
      <h1>Win 3.1 testcase using vue!</h1>
      <p>
        Hello there. This is a ux textcase, please feel free to click around, double click a program
        and have fun!
      </p>
      <p>
        Please note that this is very alpha and will probably never go anywhere. That said we can
        have fun with the code.
      </p>
      <hr>
      <div class="desktop-programs">
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
