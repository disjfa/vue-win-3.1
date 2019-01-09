import Vue from 'vue';
import Vuex from 'vuex';
import PouchDB from 'pouchdb-browser';
import { v4 } from 'uuid';
import About from './components/About.vue';
import TaskList from './components/TaskList.vue';
import browserStore from './modules/browser/store';

const activeProgramDb = new PouchDB('activePrograms');
Vue.use(Vuex);

function setPositions(program, data) {
  const {
    x,
    y,
    width,
    height,
    active,
  } = data;

  Vue.set(program, 'x', x);
  Vue.set(program, 'y', y);
  if (width) {
    Vue.set(program, 'width', width);
  }
  if (height) {
    Vue.set(program, 'height', height);
  }
  if (active) {
    Vue.set(program, 'active', active);
  }
}

export default new Vuex.Store({
  modules: {
    browserStore,
  },
  state: {
    programs: [
      {
        name: 'about',
        title: 'About',
        icon: 'fa fa-question-circle',
        component: About,
      },
      {
        name: 'task-list',
        title: 'Task list',
        icon: 'fa fa-tasks',
        component: TaskList,
      },
    ],
    activePrograms: [],
  },
  mutations: {
    removeProgram(state, id) {
      const { activePrograms } = state;
      const filtered = activePrograms.filter(p => p._id !== id);

      activeProgramDb.get(id)
        .then((result) => {
          activeProgramDb.remove(result);
        });
      Vue.set(state, 'activePrograms', filtered);
    },
    activateCurrentProgram(state, programId) {
      const { activePrograms } = state;
      activePrograms.map((activeProgram) => {
        Vue.set(activeProgram, 'active', activeProgram._id === programId);
      });
    },
    activateProgram(state, row) {
      const { activePrograms } = state;

      activeProgramDb.get(row.id)
        .then((newProgram) => {
          activePrograms.push(newProgram);
        });
    },
    setWindowSize(state, payload) {
      const { id } = payload;
      activeProgramDb.get(id)
        .then((program) => {
          setPositions(program, payload);
          activeProgramDb.put(program);
        });
    },
    addProgram(state, payload) {
      const {programs} = state;
      programs.push(payload);
      Vue.set(state, 'programs', programs);
    },
  },
  actions: {
    activateProgram(context, payload) {
      const { name } = payload;
      const { programs } = context.state;
      const program = programs.find(p => p.name === name);
      const newProgram = Object.assign({}, program);
      newProgram._id = v4();
      delete newProgram.component;
      activeProgramDb.put(newProgram, (err, result) => {
        context.commit('activateProgram', result);
      });
    },
    initialize(store) {
      activeProgramDb.allDocs({
        include_docs: true,
        descending: true,
      }, (err, doc) => {
        if (err) {
          return;
        }
        doc.rows.forEach((row) => {
          store.commit('activateProgram', row);
        });
      });
    },
  },
});
