<template>
<div id="featureengineering">
	<div style="background:#eee;padding: 20px" >
        <Card :bordered="false">
            <p slot="title">历史任务</p>
            <p>安全求交参数配置，特征工程参数配置和算法参数配置</p>
        </Card>
  </div>
	<Table stripe :columns="columns1" :data="data1"></Table>

</div>
</template>
<script>
export default {
	
	data(){
		return {
			columns1: [
				{
					key: 'taskId',
					title: '任务编号'
				},
				{
					key: 'taskName',
					title: '任务名称'
        },
        {
					key: 'taskTime',
					title: '任务时间'
				},
				{
					key: 'taskAlgorithm',
					title: '算法名称'
				},
				{
					key: 'taskAttribution',
					title: '任务归属'
				},
				{
					key: 'taskCreatedtime',
					title: '任务创建时间'
				},
				{
					key: 'taskOperation',
					title: '任务操作'
				},
			],
			task1: [
				{
					name: 'John Brown',
					age: 18,
					address: 'New York No. 1 Lake Park',
					date: '2016-10-03'
				},
				{
					name: 'Jim Green',
					age: 24,
					address: 'London No. 1 Lake Park',
					date: '2016-10-01'
				},
				{
					name: 'Joe Black',
					age: 30,
					address: 'Sydney No. 1 Lake Park',
					date: '2016-10-02'
				},
				{
					name: 'Jon Snow',
					age: 26,
					address: 'Ottawa No. 2 Lake Park',
					date: '2016-10-04'
				}
                ]
		}
	},
	methods:{
		addtask(){
			this.$router.push({path:'/taskManage/taskRegistration'}) 
    }
  },
}
</script>

<style scoped>
#featureengineering{
	width: 100%;
	overflow: hidden;
}
#addtask{
	width: 100px;
	height: 25px;
	border: 1px solid blue;
	background-color: blue;
	color: white;
	margin: 10px;
	text-align:center;
	line-height: 25px;
}
#save{
	width: 50px;
	height: 25px;
	border: 1px solid blue;
	background-color: blue;
	color: white;
	margin: 10px;
	text-align:center;
	line-height: 25px;
}
</style>