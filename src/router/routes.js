import StudyTask from '@/views/studyTask/StudyTask';
import PredictTask from '@/views/predictTask/PredictTask';
import ResultPage from '@/views/resultPage/ResultPage';
import SafeIntersection from '@/views/safeIntersection/SafeIntersection';
import FeatureEngineering from '@/views/featureEngineering/FeatureEngineering';
import DataManage from '@/views/dataManage/DataManage';
import HistoricalTasks from '@/views/historicalTasks/HistoricalTasks';
import HistoricalParams from '@/views/historicalTasks/historicalParams/HistoricalParams';
import DataRegistration from '@/views/dataManage/dataRegistration/DataRegistration';
const routes = [
  {
    path: '/dataManage',
    name: 'dataManage',
    meta: {
      title: '数据管理'
    },
    component: DataManage
  },
  {
    path: '/dataManage/dataRegistration',
    name: 'dataRegistration',
    meta: {
      title: '数据注册'
    },
    component: DataRegistration
  },
  {
    path: '/safeIntersection',
    name: 'safeIntersection',
    meta: {
      title: '安全求交'
    },
    component: SafeIntersection
  },
  {
    path: '/featureEngineering',
    name: 'featureEngineering',
    meta: {
      title: '特征成功'
    },
    component: FeatureEngineering
  },
  {
    path: '/studyTask',
    name: 'studyTask',
    meta: {
      title: '训练任务'
    },
    component: StudyTask
  },
  {
    path: '/predictTask',
    name: 'predictTask',
    meta: {
      title: '预测任务'
    },
    component: PredictTask
  },
  {
    path: '/resultPage',
    name: 'resultPage',
    meta: {
      title: '任务结果'
    },
    component: ResultPage
  },
  {
    path: '/historicalTasks',
    name: 'historicalTasks',
    meta: {
      title: '历史任务'
    },
    component: HistoricalTasks
  },
  {
    path: '/historicalTasks/historicalParams',
    name: 'historicalParams',
    meta: {
      title: '历史参数'
    },
    component: HistoricalParams
  },
  {
    path: '',
    redirect: '/safeIntersection'
  }
];

export default routes;
