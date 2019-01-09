import TheBrowser from './components/TheBrowser.vue';

export default {
  state: {},
  actions: {
    initialize(store) {
      store.commit('addProgram', {
        name: 'browser',
        title: 'Internet browser',
        icon: 'fab fa-internet-explorer',
        component: TheBrowser,
      });
    },
  },
};
