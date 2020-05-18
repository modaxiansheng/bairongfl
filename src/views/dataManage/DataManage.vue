<template>
<div id="featureengineering">
	<div style="background:#eee;padding: 20px" >
        <Card :bordered="false">
            <p slot="title">数据管理</p>
            <p>注册数据之前请先保证在本地正确地配置数据源，否则无法完成数据注册。其次，所有数据第1个字段都必须是日期，本系统仅支持yyyymmdd这种格式的日期数据（如20191103），否则也无法注册数据。</p>
        </Card>
    </div>
	<div @click="adddata" id="adddata">注册</div>
	<Table border  :columns="columns1" :data="datason"></Table>
</div>
</template>
<script>
import axios from 'axios'
import { taskForm } from '@/store/module/studyTask';
import http from '@/utils/http';
// console.log(axios.get)
export default {
	
	data(){
		return {
			columns1: [
				{
					key: 'data_id',
					title: '数据编号'
				},
				{
					key: 'data_name',
					title: '数据名称'
				},
				{
					key: 'data_type',
					title: '数据类型'
				},
				{
					key: 'data_attribution',
					title: '数据归属'
				},
				{
					key: 'data_create_time',
					title: '数据创建时间'
				},
				{
					key: 'data_path',
					title: '数据路径'
				},
				{
					title: 'Action',
					key: 'action',
					width: 150,
					align: 'center',
					render: (h, params) => {
						return h('div', [
							h('Button', {
								props: {
									type: 'error',
									size: 'small'
								},
								on: {
									click: () => {
										this.remove(params)
									}
								}
							}, 'Delete')
						]);
					}
				}
			],
			data1:[],
			datason:[]

		}
	},
	methods:{
		remove (params) {
			console.log(params)
			if(params.row.data_attribution=="host"){
				this.datason.splice(params.index, 1);
				http.get('deleteDatainfo?data_id='+params.row.data_id)
			}
		},
		adddata(){
			this.$router.push({path:'/dataManage/dataRegistration'}) 
		},
		createHttp () {
			return http.get('getDatainfo');
		},
		getdata(){
			Promise.all([this.createHttp()]).then(resList => {
				this.data1 = resList;
				// console.log(this.data1)this.data1
				this.data1.forEach((ii)=>{
					ii.forEach((iison)=>{
						// console.log(iison)
						if(iison.data_type==0){
							iison.data_type="用户特征"
						}else if(iison.data_type==1){
							iison.data_type="样本标签"
						}
						if(iison.data_attribution==0){
							iison.data_attribution="host"
						}else if(iison.data_attribution==1){
							iison.data_attribution="guest"
						}
					})
		
				})
				this.datason = [];
				this.data1.forEach((item)=>{
					Array.prototype.push.apply(this.datason, item);
				})
			});
		}
	},
	mounted(){
		this.getdata()
	}
}
</script>

<style scoped>
#featureengineering{
	width: 100%;
	overflow: hidden;
}
#adddata{
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