<template>
  <div class="router-body study-task-page">
    <div class="router-body-inner">
      <div style="position: relative">
      
        <Form ref="taskForm" :model="taskForm" :rules="taskRule" :label-width="100" style="width: 400px;">
          <FormItem label="项目名称" prop="projectname">
            <Input v-model="projectname" placeholder="请输入项目的名称"></Input>
          </FormItem>
 
          <FormItem v-show="tabType === 'study'" label="选择模型" prop="model_type">
            <RadioGroup v-model="taskForm.model_type" vertical>
              <Radio label="Hetero Logistic Regression"></Radio>
              <Radio label="Hetero Secureboost"></Radio>
            </RadioGroup>
          </FormItem>
        <div class="stmodelparams" v-if="taskForm.model_type=='Hetero Logistic Regression'">
              <div class="modelparam" >
                  <FormItem label="正则化类型" >
                      <Select v-model="lrreguvalue">
                        <Option v-for="item in lrregu" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </Select>
                  </FormItem>
              </div>
              <div class="modelparam"  v-for="item in lrparams" :key="item">
                  <FormItem :label="item.label" >
                        <Input v-model="item.value" clearable style="width: 200px"></Input>                      
                  </FormItem>	
              </div>
               
        </div>
        <div class="stmodelparams" v-if="taskForm.model_type=='Hetero Secureboost'">
              <div class="modelparam"  v-for="item in xgboostparams" :key="item">
                  <FormItem :label="item.label" >
                        <Input v-model="item.value" clearable style="width: 200px"></Input>                      
                  </FormItem>	
              </div>            
        </div>
          <FormItem label="">
            <Button type="primary" :loading="btnLoading" @click="handleSubmit">提交{{tabType === 'study' ? '训练' : '预测'}}任务</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import http from '@/utils/http';
import { taskForm } from '@/store/module/studyTask';

export default {
  name: 'StudyTask',
  data () {
    return {
      lrreguvalue:"L1",
      lrregu:[
        {label:"L1",value:"L1"},
        {label:"L2",value:"L2"},
      ],
      lrparams:[
        {label:"最大迭代次数",value:1000},
        {label:"收敛阈值",value:0.00001},
        {label:"学习率",value:0.01},
        {label:"正则化惩罚系数",value:2},
        {label:"训练集比例",value:0.8},
        {label:"最大迭代次数",value:1000},
      ],
      xgboostparams:[
        {label:"树数",value:100},
        {label:"学习率",value:0.01},
        {label:"最小分裂增益",value:0.001},
        {label:"特征采样比例",value:0.8},
        {label:"正则化系数",value:0.5},
        {label:"分箱数	",value:32},
        {label:"可分裂节点最小样本数	",value:2},
        {label:"训练集比例	",value:0.8},
      ],
      tabType: 'study',
      hostData: [
      ],
      guestData: [],
      btnLoading: false,
      taskForm,
      taskRule: {},
      // baseRule: {
      //   'projectname': [
      //     { required: true, message: '请输入项目的名称', trigger: 'blur' }
      //   ],
      //   'host.namespace': [
      //     { required: true, message: '请选择Host方数据', trigger: 'change' }
      //   ],
      //   'guest.namespace': [
      //     { required: true, message: '请选择Guest方数据', trigger: 'change' }
      //   ],
      // },
    };
  },
  methods: {
    handleSubmit () {
      this.taskRule = Object.assign({}, this.baseRule, this.tabType === 'study' ? this.studyRule : this.testRule);
      setTimeout(() => {
        this.$refs.taskForm.validate(bool => {
          if (!bool) {
            return false;
          }
          this.btnLoading = true;
          const params = {
            data: {
              host: this.taskForm.host,
              guest: this.taskForm.guest
            }
          };
        });
      }, 10);
    },
    getdata(){
        Promise.all([http.get("getDatainfo")]).then(resList => {
            resList.forEach((item)=>{
               console.log(item)
               item.forEach((itemson)=>{
                 console.log(itemson.data_attribution)
                 if(itemson.data_attribution==0){
                   this.hostData.push(itemson)
                 }else if(itemson.data_attribution==1){
                   this.guestData.push(itemson)
                 }
               })
               
            })
        });
    },
  },
  mounted(){
    this.getdata()
  }
};

</script>

<style lang="less" scoped>
.study-task-page {
  .ivu-tabs-bar {
    margin-bottom: 30px;
  }
}
.stmodelparams{
  position: absolute;
  top: 0px;
  left: 500px;
}
</style>
