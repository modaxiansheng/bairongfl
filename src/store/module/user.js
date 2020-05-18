const state = {
  sideList: [
  {
    path: '/dataManage',
    name: 'dataManage',
    title: '数据管理',
    icon: 'ios-paper',
    children: []
  },
  {
    path: '/safeIntersection',
    name: 'safeIntersection',
    title: '安全求交',
    icon: 'ios-paper',
    children: []
  },
  {
    path: '/featureEngineering',
    name: 'featureEngineering',
    title: '特征工程',
    icon: 'ios-paper',
    children: []
  },
  {
    path: '/studyTask',
    name: 'studyTask',
    title: '训练任务',
    icon: 'ios-paper',
    children: []
  },
    {
    path: '/predictTask',
    name: 'predictTask',
    title: '预测任务',
    icon: 'ios-paper',
    children: []
  },
  {
    path: '/resultPage',
    name: 'resultPage',
    title: '任务结果',
    icon: 'ios-paper',
    children: []
  },
  {
    path: '/historicalTasks',
    name: 'historicalTasks',
    title: '历史任务',
    icon: 'ios-paper',
    children: []
  }
],
  toolbarList: [],
  editPasswordStatus: false
};

const getters = {
  sideList: state => state.sideList,
  toolbarList: state => state.toolbarList,
  editPasswordStatus: state => state.editPasswordStatus
};

const mutations = {};

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
