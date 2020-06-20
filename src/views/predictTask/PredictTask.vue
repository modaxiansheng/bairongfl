<template>
  <div class="router-body study-task-page">
    <div class="router-body-inner">
      <div style="position: relative">
      
        <Form ref="taskForm" :model="taskForm"  :label-width="100" style="width: 400px;">
          <FormItem label="项目名称" prop="predictprojectname">
              <Input v-model="modelInfo.predictprojectname" placeholder="请输入项目的名称"></Input>
          </FormItem>
          <FormItem label="取数时间" prop="SampleFetchingtime">
              <Input v-model="modelInfo.SampleFetchingtime" placeholder="请输入数据的取数时间"></Input>
          </FormItem>
          <FormItem label="取数周期" prop="dataperiod">
              <Input v-model="modelInfo.dataperiod" placeholder="请输入数据的取数周期"></Input>
          </FormItem>
          <FormItem label="取数规则" prop="datatype">
              <Select v-model="modelInfo.datatype" placeholder="请输入数据的取数取数规则">
                  <Option value="用户特征早一个周期取数">用户特征早一个周期取数</Option>
                  <Option value="样本标签和用户特征同一个周期取数">样本标签和用户特征同一个周期取数</Option>
              </Select>
          </FormItem>
          <FormItem label="Host方数据" prop="hostselectedvalue">
            <Select v-model="modelInfo.hostselectedvalue">
              <Option v-for="item in hostData" :value="item.data_path" :key="item.data_id">数据ID:{{item.data_id}}名称:{{ item.data_name }},类型:{{item.data_type==0?"用户特征":"样本标签"}}</Option>
            </Select>
          </FormItem>
          <FormItem label="Guest方数据" prop="guestselectedvalue">
            <Select v-model="modelInfo.guestselectedvalue">
              <Option v-for="item in guestData" :value="item.data_path" :key="item.data_id">数据ID:{{item.data_id}}名称:{{ item.data_name }},类型:{{item.data_type==0?"用户特征":"样本标签"}}</Option>
            </Select>
          </FormItem>
           <FormItem label="选择模型" prop="selectedmodel">
              <Select v-model="modelInfo.selectedmodel">
                <Option v-for="(item,itemindex) in modelInfo.modelInfos" :value="item" :key="itemindex">{{ item }}</Option>
              </Select>
            </FormItem>
          <FormItem label="">
            <Button type="primary"  @click="handleSubmit">提交预测任务</Button>
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
        predictprojectname:"",
        SampleFetchingtime:"",
        dataperiod:"",
        datatype:"",
        hostselectedvalue:"",
        guestselectedvalue:"",
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
        predictprojectname: [
          { required: true, message: '请输入项目的名称', trigger: 'blur' }
        ],
        hostselectedvalue: [
          { required: true, message: '请选择Host方数据', trigger: 'change' }
        ],
        guestselectedvalue: [
          { required: true, message: '请选择Guest方数据', trigger: 'change' }
        ],
        selectedmodel:[
          { required: true, message: '请选择model', trigger: 'change' }
        ],
      },
    };
  },
  methods: {
    handleSubmit () {
        console.log(this.modelInfo)
        Promise.all([ this.createHttp()]).then(resList => {
                console.log(resList)
                resList.forEach(element => {
                    console.log(element)
                    if(element.status==0){
                        // window.open(element.result.board_url);
                        console.log(element.result.board_url)
                    }          
                });
            });
    },
    createHttp () {
      var submit_info = {
          'name' : this.modelInfo.predictprojectname,
          'role':this.common.coderole.role,
          'task':'predict',
          'data':{
              'start':this.modelInfo.SampleFetchingtime,
              'n':Number(this.modelInfo.dataperiod),
              'match':this.modelInfo.datatype!="用户特征早一个周期取数",
              'path_host':this.modelInfo.hostselectedvalue,
              'path_guest':this.modelInfo.guestselectedvalue,
          },
          "model_id": "arbiter-10000#guest-9999#host-10000#model",
          "model_version": this.modelInfo.selectedmodel
      }
      console.log(submit_info)
      return http.post("Submit",submit_info)
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
                    // console.log(item)
                    // console.log(this.modelInfo.modelInfos[item])
                    
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
