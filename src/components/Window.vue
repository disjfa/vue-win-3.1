<template>
  <div class="position-absolute window d-flex flex-column" :class="activeClass()">
    <div class="window-inner">
      <div class="d-flex window-header">
        <div class="dropdown">
          <a href="#" class="btn btn-menu" @dblclick="removeProgram" @click="openDropdown">
            <i class="fa fa-fw fa-minus"></i>
          </a>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" :class="isDropdownOpen">
            <a class="dropdown-item disabled" href="#">Move</a>
            <a class="dropdown-item disabled" href="#">Size</a>
            <a class="dropdown-item disabled" href="#">Minimize</a>
            <a class="dropdown-item disabled" href="#">Maximize</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#" @click="removeProgram">Close</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#" @click="switchTo">Switch to</a>
          </div>
        </div>
        <div class="col text-center window-title">{{ currentProgram.title }}</div>
        <a href="#" class="btn btn-default">
          <i class="fa fa-fw fa-caret-down"></i>
        </a>
        <a href="#" class="btn btn-default">
          <i class="fa fa-fw fa-caret-up"></i>
        </a>
      </div>
      <div class="window-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import interact from 'interactjs';

export default {
  name: 'Window',
  data() {
    return {
      dropdownOpen: false,
      timer: false,
    };
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  mounted() {
    this.$el.addEventListener('click', this.activateCurrentProgram);

    if (this.currentProgram.x && this.currentProgram.y) {
      this.setPosition(this.$el,
        this.currentProgram.x,
        this.currentProgram.y,
        this.currentProgram.width,
        this.currentProgram.height);
    }
    interact(this.$el)
      .draggable({
        allowFrom: '.window-title',
        inertia: true,
        restrict: {
          endOnly: true,
          elementRect: {
            top: 0,
            left: 0,
            bottom: 1,
            right: 1,
          },
        },
        autoScroll: true,
        onmove: this.dragMoveListener,
      })
      .resizable({
        inertia: true,
        edges: {
          left: true,
          right: true,
          bottom: true,
          top: true,
        },
        restrictSize: {
          min: {
            width: 250,
            height: 150,
          },
        },
      })
      .on('resizemove', this.resizeMoveListener);
  },
  computed: {
    isDropdownOpen() {
      return this.dropdownOpen ? 'show' : false;
    },
    currentProgram() {
      return this.$store.state.activePrograms.find(activeProgram => activeProgram._id === this.id);
    },
  },
  methods: {
    switchTo() {
      const program = this.$store.state.programs.find(p => p.name === 'task-list');
      this.$store.dispatch('activateProgram', program);
      this.dropdownOpen = false;
    },
    openDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    removeProgram() {
      this.$store.commit('removeProgram', this.currentProgram._id);
    },
    activateCurrentProgram() {
      const { _id, active } = this.currentProgram;
      if (active !== true) {
        this.$store.commit('activateCurrentProgram', _id);
      }
    },
    activeClass() {
      const { active } = this.currentProgram;
      return active === true ? 'window-active' : '';
    },
    dragMoveListener(event) {
      const { target } = event;
      const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
      const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
      this.setPosition(target, x, y);
    },
    resizeMoveListener(event) {
      const { target } = event;
      const { width, height } = event.rect;
      let x = (parseFloat(target.getAttribute('data-x')) || 0);
      let y = (parseFloat(target.getAttribute('data-y')) || 0);

      x += event.deltaRect.left;
      y += event.deltaRect.top;
      this.setPosition(target, x, y, width, height);
    },
    setPosition(target, x, y, width, height) {
      target.style.transform = `translate(${x}px, ${y}px)`;
      target.setAttribute('data-x', x);
      target.setAttribute('data-y', y);
      if (width) {
        target.style.width = `${width}px`;
      }
      if (height) {
        target.style.height = `${height}px`;
      }
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.$store.commit('setWindowSize', {
          id: this.id,
          x,
          y,
          width,
          height,
        });
      }, 500);
    },
  },
};
</script>
