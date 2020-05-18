<template>
<div>
 	  <div style="background:#eee;padding: 20px" >
        <Card :bordered="false">
            <p slot="title">安全求交</p>
            <p>当执行模型训练任务时，安全求交的输入来至用户设置的训练数据，包含1份样本/标签数据+1份用户特征，安全求交后生成一份结果数据作为特征工程的输入。本系统仅支持yyyymmdd这种格式的日期数据（如20191103）</p>
        </Card>
    </div>
    <Form ref="safeintersection" :model="safeintersection" :rules="ruleValidate" :label-width="80">
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
            <Button type="primary" @click="handleSubmit('safeintersection')">Submit</Button>
            <Button @click="handleReset('safeintersection')" style="margin-left: 8px">Reset</Button>
        </FormItem>
    </Form>
</div>
</template>
<script>
export default {
    data () {
        return {
            safeintersection: {
                SampleFetchingtime: '',
                dataperiod: '',
                datatype: '',
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
            }
        }
    },
    methods: {
        handleSubmit (SampleFetchingtime) {
            this.$refs[SampleFetchingtime].validate((valid) => {
                if (valid) {
                    this.$Message.success('Success!');
                    console.log(this.safeintersection)
                            // this.$router.push({path:'/featureEngineering'}) 

                } else {
                    this.$Message.error('Fail!');
                }
            })
        },
        handleReset (SampleFetchingtime) {
            this.$refs[SampleFetchingtime].resetFields();
        }
    }
}
</script>
