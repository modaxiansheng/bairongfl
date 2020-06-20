<template>
  <div class="router-body study-task-page">
    <div class="router-body-inner">
      <div style="position: relative">
      
        <Form ref="taskForm" :model="taskForm" :label-width="100" style="width: 400px;">
            <FormItem label="任务名称" prop="pn">
              <Input v-model="projectname" placeholder="请输入任务的名称"></Input>
            </FormItem>
 
            <FormItem v-show="tabType === 'study'" label="选择算法" prop="model_type">
              <RadioGroup v-model="taskForm.model_type" vertical>
                <Radio label="Hetero Logistic Regression"></Radio>
                <Radio label="Hetero Secureboost"></Radio>
              </RadioGroup>
            </FormItem>

            <div class="stmodelparams" v-if="taskForm.model_type=='Hetero Logistic Regression'">
                  <div class="modelparam" >
                      <FormItem label="训练模式" >
                          <Select v-model="taskparamselected">
                            <Option v-for="item in taskparam" :value="item.value" :key="item.label">{{ item.label }}</Option>
                          </Select>
                          <Select v-model="taskparamselectedCV" v-if="taskparamselected=='CV'">
                            <Option v-for="item in taskparamCV" :value="item.value" :key="item.label">{{ item.label }}</Option>
                          </Select>
                      </FormItem>
                      <FormItem label="正则化类型" >
                          <Select v-model="lrparampapa.lrreguvalue">
                            <Option v-for="item in lrparampapa.lrregu" :value="item.value" :key="item.label">{{ item.label }}</Option>
                          </Select>
                      </FormItem>
                  </div>
                  <div class="modelparam"  v-for="item in lrparampapa.lrparams" :key="item.label">
                      <FormItem :label="item.label" :key="item.label">
                            <Input v-model="item.value" clearable style="width: 200px"></Input>                      
                      </FormItem>	
                  </div>
                  
            </div>
            <div class="stmodelparams" v-if="taskForm.model_type=='Hetero Secureboost'">
                  <FormItem label="训练模式" >
                      <Select v-model="taskparamselected">
                        <Option v-for="item in taskparam" :value="item.value" :key="item.label">{{ item.label }}</Option>
                      </Select>
                      <Select v-model="taskparamselectedCV" v-if="taskparamselected=='CV'">
                            <Option v-for="item in taskparamCV" :value="item.value" :key="item.label">{{ item.label }}</Option>
                      </Select>
                  </FormItem>
                  <div class="modelparam"  v-for="item in xgboostparams" :key="item.label">
                      <FormItem :label="item.label" >
                            <Input v-model="item.value" clearable style="width: 200px"></Input>                      
                      </FormItem>	
                  </div>            
            </div>
            <FormItem label="">
                <Button type="primary" :loading="btnLoading" @click="modal1 = true">提交{{tabType === 'study' ? '训练' : '预测'}}任务</Button>
                <Modal
                  v-model="modal1"
                  title="您确定要提交训练任务吗？"
                  @on-ok="ok"
                  @on-cancel="cancel">
                  <p>点击取消按钮就不会提交了</p>
                  <p>点击确定按钮就会提交了</p>
                </Modal>
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
      modal1: false,
      projectname:"",
      btnLoading: false,
      taskparamselectedCV:"5",
      taskparamCV:[
        {label:"2",value:"2"},
        {label:"3",value:"3"},
        {label:"4",value:"4"},
        {label:"5",value:"5"},
      ],
      taskparamselected:"train",
      taskparam:[
        {label:"train",value:"train"},
        {label:"CV",value:"CV"},
      ],
      lrparampapa:{
        lrreguvalue:"L1",
        lrregu:[
          {label:"L1",value:"L1"},
          {label:"L2",value:"L2"},
        ],
        lrparams:[   
          {label:"最大迭代次数",value:1000},
          {label:"学习率",value:0.01},
          {label:"正则化惩罚系数",value:2},
        ]

      },
      model_type:"HeteroLR",
      xgboostparams:[
        {label:"树数",value:100},
        {label:"学习率",value:0.01},
        {label:"最小分裂增益",value:0.001},
        {label:"特征采样比例",value:0.8},
        {label:"正则化系数",value:0.5},
        {label:"可分裂节点最小样本数	",value:2},
      ],
      tabType: 'study',

      taskForm,
      
      StudyTask:[]
    };
  },
  methods: {
      ok () {
          this.$Message.info('Clicked ok');
          this.handleSubmit()
      },
      cancel () {
          this.$Message.info('Clicked cancel');
      },
     createHttp () {  
      //  alert(this.common.studyTask[6])
          if (this.common.studyTask[4]=="HeteroLR"){
            
              var lrparams={
                  "name": this.common.studyTask[0], 
                  "role": this.common.coderole.role, 
                  "task": this.common.studyTask[5]=="train"?"train":"train_cv", 
                  "data": {
                    "start": this.common.studyTask[2].SampleFetchingtime, 
                    "n":  Number(this.common.studyTask[2].dataperiod), 
                    "match": this.common.studyTask[2].datatype!="用户特征早一个周期取数", 
                    "path_host": this.common.studyTask[2].hostselectedvalue, 
                    "path_guest": this.common.studyTask[2].guestselectedvalue
                  }, 
                  "modules": {
                    "params":this.common.studyTask[3]
                  },    
                  "algorithms":{
                    "HeteroLR": {
                      "penalty": this.common.studyTask[1].lrreguvalue,
                      "max_iter":this.common.studyTask[1].lrparams[0].value,
                      "learning_rate":this.common.studyTask[1].lrparams[1].value,
                      "alpha":this.common.studyTask[1].lrparams[2].value,
                      "cv_param": {
                          "n_splits": Number(this.common.studyTask[6]),
                          "need_cv":  this.common.studyTask[5]!="train"
                      }
                    }
                  }
              }
              console.log(lrparams)
              return   http.post("Submit1",lrparams)
          }else{
              var boostparams={
                  "name": this.common.studyTask[0], 
                  "role": this.common.coderole.role, 
                  "task": this.common.studyTask[5]=="train"?"train":"train_cv", 
                  "data": {
                    "start": this.common.studyTask[2].SampleFetchingtime, 
                    "n":  Number(this.common.studyTask[2].dataperiod), 
                    "match": this.common.studyTask[2].datatype!="用户特征早一个周期取数", 
                    "path_host": this.common.studyTask[2].hostselectedvalue, 
                    "path_guest": this.common.studyTask[2].guestselectedvalue
                  }, 
                  "modules": {
                    "params":this.common.studyTask[3]
                  },    
                  "algorithms":{
                      "HeteroSecureBoost": {
                            "num_trees":  this.common.studyTask[1][0].value,
                            "learning_rate": this.common.studyTask[1][1].value,
                            "subsample_feature_rate":this.common.studyTask[1][3].value,
                            "n_iter_no_change":true,
                            "tol":this.common.studyTask[1][2].value, 
                            "alpha": this.common.studyTask[1][4].value,
                            "tree_param": {
                                "min_sample_split": this.common.studyTask[1][6].value,
                            },
                            "cv_param": {
                                "n_splits": Number(this.common.studyTask[6]),
                                "need_cv":  this.common.studyTask[5]!="train"
                            }
                      }
                  }
              }
              console.log(boostparams)
              return   http.post("Submit1",boostparams)
          }


          // console.log(params)
			    
		},
    handleSubmit () {
      console.log( this.common.feshow)
      this.common.studyTask=[]
      this.common.studyTask.push(
          this.projectname,
          this.taskForm.model_type=='Hetero Secureboost'?this.xgboostparams:this.lrparampapa,
          this.common.safeintersection,
          this.common.feshow,
          this.HeteroLR=this.taskForm.model_type=='Hetero Secureboost'?"HeteroSecureBoost":"HeteroLR",
          this.taskparamselected,
          this.taskparamselected=="CV"?this.taskparamselectedCV:""
      )
      console.log(this.common.studyTask)
      // console.log( this.common.studyTask[1].lrreguvalue)
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
 
  },

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
