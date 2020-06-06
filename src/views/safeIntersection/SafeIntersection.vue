<template>
<div>
 	  <div style="background:#eee;padding: 20px" >
        <Card :bordered="false">
            <p slot="title">安全求交</p>
            <p>当执行模型训练任务时，安全求交的输入来至用户设置的训练数据，包含1份样本/标签数据+1份用户特征，安全求交后生成一份结果数据作为特征工程的输入。本系统仅支持yyyymmdd这种格式的日期数据（如20191103）</p>
        </Card>
    </div>
    <Form ref="safeintersection" :model="safeintersection" :rules="ruleValidate" :label-width="80">
        <FormItem label="Host数据" prop="hostselectedvalue">
            <Select v-model="safeintersection.hostselectedvalue">
                <Option v-for="item in hostData" :value="item.data_path" :key="item.data_id">数据ID:{{item.data_id}}名称:{{ item.data_name }},类型:{{item.data_type==0?"用户特征":"样本标签"}}</Option>
            </Select>
        </FormItem>
        <FormItem label="Guest数据" prop="guestselectedvalue">
            <Select v-model="safeintersection.guestselectedvalue">
                <Option v-for="item in guestData" :value="item.data_path" :key="item.data_id">数据ID:{{item.data_id}}名称:{{ item.data_name }},类型:{{item.data_type==0?"用户特征":"样本标签"}}</Option>
            </Select>
        </FormItem>
        <FormItem label="取数时间" prop="SampleFetchingtime">
            <Input v-model="safeintersection.SampleFetchingtime" placeholder="请输入数据的取数时间"></Input>
        </FormItem>
        <FormItem label="取数周期" prop="dataperiod">
            <Input v-model="safeintersection.dataperiod" placeholder="请输入数据的取数周期"></Input>
        </FormItem>
        <FormItem label="取数规则" prop="datatype">
            <Select v-model="safeintersection.datatype" placeholder="请输入数据的取数取数规则">
                <Option value="用户特征早一个周期取数">用户特征早一个周期取数</Option>
                <Option value="样本标签和用户特征同一个周期取数">样本标签和用户特征同一个周期取数</Option>
            </Select>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit">Submit</Button>
            <Button type="primary" @click="handleSubmit2">fateboard</Button>
        </FormItem>
    </Form>
</div>
</template>
<script>
import http from '@/utils/http';
import { taskForm } from '@/store/module/studyTask';
export default {
    data () {
        return {
            tabType: 'study',
            hostData: [
            ],
            guestData: [],
            taskForm,
            taskRule: {},
            safeintersection: {
                SampleFetchingtime: this.common.safeintersection.SampleFetchingtime,
                dataperiod: this.common.safeintersection.dataperiod,
                datatype: this.common.safeintersection.datatype,
                hostselectedvalue:this.common.safeintersection.hostselectedvalue,
                guestselectedvalue:this.common.safeintersection.guestselectedvalue
            },
            ruleValidate: {
                SampleFetchingtime: [
                    { required: true, message: '取数时间不能为空', trigger: 'blur' }
                ],
                dataperiod: [
                    { required: true, message: '取数周期不能为空', trigger: 'blur' },
                ],
                datatype: [
                    { required: true, message: '取数规则不能为空', trigger: 'change' }
                ],
                hostselectedvalue: [
                    { required: true, message: 'Host不能为空', trigger: 'change' }
                ],
                guestselectedvalue: [
                    { required: true, message: 'Guest不能为空', trigger: 'change' }
                ],
            }
        }
    },
    methods: {
        handleSubmit2(){
            Promise.all([ this.createHttp()]).then(resList => {
                console.log(resList)
                resList.forEach(element => {
                    console.log(element)
                    if(element.status==0){
                        window.open(element.result.board_url);
                    }          
                });
            });
        },
        handleSubmit(){
            setTimeout(this.handleSub(),10)
           
        },
        createHttp () {
            var submit_info = {
                'name' : '安全求交'+ Date.parse(new Date()),
                'role':'guest',
                'task':'intersection',
                'data':{
                    'start':this.safeintersection.SampleFetchingtime,
                    'n':Number(this.safeintersection.dataperiod),
                    'match':this.safeintersection.datatype!="用户特征早一个周期取数",
                    'path_host':this.safeintersection.hostselectedvalue,
                    'path_guest':this.safeintersection.guestselectedvalue,
                }
            }
            console.log(submit_info)
            return http.post("Submit",submit_info)
        },
        handleSub () {
           
            this.$refs.safeintersection.validate((valid) => {
                if (valid) {
                    this.$Message.success('Success!');
                    // console.log(JSON.stringify(this.safeintersection));
                    this.common.safeintersection=this.safeintersection
                    // console.log(this.common.safeintersection)
                } else {
                    this.$Message.error('Fail!');
                }
            })
        },
        getdata(){
            Promise.all([http.get("getDatainfo")]).then(resList => {
                resList.forEach((item)=>{
                // console.log(item)
                item.forEach((itemson)=>{
                    // console.log(itemson.data_attribution)
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
}
</script>


