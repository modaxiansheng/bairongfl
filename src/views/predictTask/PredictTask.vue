<template>
  <div class="router-body study-task-page">
    <div class="router-body-inner">
      <div style="position: relative">
      
        <Form ref="taskForm" :model="taskForm" :rules="taskRule" :label-width="100" style="width: 400px;">
          <FormItem label="项目名称" prop="projectName">
            <Input v-model="projectname" placeholder="请输入项目的名称"></Input>
          </FormItem>
          <FormItem label="Host方数据" prop="host.namespace">
            <Select v-model="hostselectedvalue">data_path
              <Option v-for="item in hostData" :value="item.data_name" :key="item.data_name">数据ID:{{item.data_id}}名称:{{ item.data_name }},类型:{{item.data_type==0?"用户特征":"样本标签"}}</Option>
            </Select>
          </FormItem>
          <FormItem label="Guest方数据" prop="guest.namespace">
            <Select v-model="guestselectedvalue">
              <Option v-for="item in guestData" :value="item.data_name" :key="item.data_name">数据ID:{{item.data_id}}名称:{{ item.data_name }},类型:{{item.data_type==0?"用户特征":"样本标签"}}</Option>
            </Select>
          </FormItem>
           <FormItem label="选择模型" prop="model.id">
              <Select v-model="modelInfo.selectedmodel">
                <Option v-for="(item,itemindex) in modelInfo.modelInfos" :value="item" :key="itemindex">{{ item }}</Option>
              </Select>
            </FormItem>
          <FormItem label="">
            <Button type="primary" :loading="btnLoading" @click="handleSubmit">提交预测任务</Button>
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
      modelInfo:{
        selectedmodel:"",
        modelInfos:[]
      },
      tabType: 'study',
      hostData: [
      ],
      guestData: [],
      btnLoading: false,
      taskForm,
      taskRule: {},
      baseRule: {
        'projectName': [
          { required: true, message: '请输入项目的名称', trigger: 'blur' }
        ],
        'host.namespace': [
          { required: true, message: '请选择Host方数据', trigger: 'change' }
        ],
        'guest.namespace': [
          { required: true, message: '请选择Guest方数据', trigger: 'change' }
        ],
      },
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
              //  console.log(item)
               item.forEach((itemson)=>{
                //  console.log(itemson.data_attribution)
                 if(itemson.data_attribution==0){
                   this.hostData.push(itemson)
                 }else if(itemson.data_attribution==1){
                   this.guestData.push(itemson)
                 }
               })
               
            })
        });
         Promise.all([http.get("getModelinfo")]).then(resList => {
            resList.forEach((item)=>{
              //  console.log(item[0].model_version)
               this.modelInfo.modelInfos=item[0].model_version
              //  console.log( this.modelInfo.modelInfos)
                 for(var item in this.modelInfo.modelInfos){
                    console.log(item)
                    console.log(this.modelInfo.modelInfos[item])
                    
                }
            })
        });
        // for(var item in this.modelInfo.modelInfos){
        //     console.log(item)
            // console.log(this.modelInfo.modelInfos.length)
            
        // }
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
