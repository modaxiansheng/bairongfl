<template>
    <Form ref="dataregistration" :model="dataregistration" :rules="ruleValidate" :label-width="80">
        <FormItem label="数据名称" prop="dataname">
            <Input v-model="dataregistration.dataname" placeholder="请输入数据的名称"></Input>
        </FormItem>
        <FormItem label="数据类型" prop="datatype">
            <Select v-model="dataregistration.datatype" placeholder="Select your datatype">
                <Option value="用户特征">用户特征</Option>
                <Option value="样本标签">样本标签</Option>
            </Select>
        </FormItem>

       
        <FormItem label="文件路径" prop="datapath">
            <Input v-model="dataregistration.datapath"  placeholder="请输入您的数据路径"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('dataregistration')">Submit</Button>
            <Button @click="handleReset('dataregistration')" style="margin-left: 8px">Reset</Button>
        </FormItem>
    </Form>
</template>
<script>
import http from '@/utils/http';
    export default {
        data () {
            return {
                dataregistration: {
                    dataname: '',
                    datatype: '',
                    datapath: ''
                },
                ruleValidate: {
                    dataname: [
                        { required: true, message: '数据名称不能为空', trigger: 'blur' }
                    ],
                    datatype: [
                        { required: true, message: '数据类型不能为空', trigger: 'change' }
                    ],
                    datapath: [
                        { required: true, message: '数据路径不能为空', trigger: 'blur' },
                    ]
                }
            }
        },
        methods: {
            createHttp () {  
                var datatype=0   
                if(this.dataregistration.datatype=="用户特征"){
                    datatype=0
                }else{
                    datatype=1
                }    
			    return  http.get('insertDatainfo?data_name='+this.dataregistration.dataname+'&data_type='+ datatype+'&data_attribution=0&data_path='+this.dataregistration.datapath);
		    },
            getdata(){
                Promise.all([this.createHttp()]).then(resList => {
                    console.log(resList)
                });
            },
                
            handleSubmit (dataname) {
                this.$refs[dataname].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                        console.log(this.dataregistration)
                        this.getdata()
                        this.$router.push({path:'/dataManage'}) 
                        http.get('getDatainfo')
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (dataname) {
                this.$refs[dataname].resetFields();
            }
        }
    }
</script>
