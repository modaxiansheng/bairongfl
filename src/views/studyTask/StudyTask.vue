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
      lrparampapa:{
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
        ]

      },
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
          var params={"name": this.common.studyTask[0], "role": "guest", "task": "train", "data": {"start": this.common.studyTask[2].SampleFetchingtime, "n":  Number(this.common.studyTask[2].dataperiod), "match": this.common.studyTask[2].datatype!="用户特征早一个周期取数", "path_host": this.common.studyTask[2].hostselectedvalue, "path_guest": this.common.studyTask[2].guestselectedvalue}, "modules": {"DataIO_host": {"missing_fill": [ this.common.studyTask[3][0][1].value=="缺失值填充"], "missing_fill_method": ["mean"]}, "HeteroFeatureBinning_host": {"method": ["quantile"], "bin_num": [5]}, "HeteroLR": {"max_iter": 5, "cv_param": {"n_splits": 5, "need_cv": false}}}}
          console.log(params)
			    return   http.post("Submit",params)
		},
    handleSubmit () {
      // console.log(this.common.safeintersection)
      this.common.studyTask=[]
      this.common.studyTask.push(this.projectname,this.taskForm.model_type=='Hetero Secureboost'?this.xgboostparams:this.lrparampapa,this.common.safeintersection,this.common.feshow)
      console.log(this.common.studyTask)
      console.log(this.common.studyTask[0])
      Promise.all([this.createHttp()]).then(resList => {
          console.log(resList)
      });
     










      // setTimeout(() => {
      //   this.$refs.taskForm.validate(bool => {
      //     if (!bool) {
      //       return false;
      //     }
      //     this.btnLoading = true;
      //     const params = {
      //       data: {
      //         host: this.taskForm.host,
      //         guest: this.taskForm.guest 
      //       }
      //     };
      //   });
      // }, 10);
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
