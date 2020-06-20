<template>
<div id="historicaltask">
	<div style="background:#eee;padding: 20px" >
        <Card :bordered="false">
            <p slot="title">历史任务</p>
            <p>安全求交参数配置，特征工程参数配置和算法参数配置</p>
        </Card>
 	</div>
	<Table border :columns="columns1" :data="datasons"></Table>
    <Page :total="page.total" :page-size="page.size" show-total  @on-change="changepage"></Page>
	<Modal
        v-model="modal1"
        title="您确定要删除吗"
        @on-ok="ok"
        @on-cancel="cancel">
        <p>您只能删除您注册的数据</p>
        <p>点击确定就会删除</p>
        <p>点击取消就不会删除</p>
    </Modal>
</div>
</template>
<script>
import http from '@/utils/http';
export default {
	data(){
		return {

			params:"",
			modal1:false,
			page:{
				total:0,
				index:1,
				size:10
			},
			columns1: [
				{
					key: 'job_id',
					title: '任务编号',
					sortable: true
				},
				{
					key: 'job_name',
					title: '任务名称'
        		},
				{
					key: 'model_version',
					title: '模型名称',
					sortable: true
				},
				{
					key: 'job_type',
					title: '训练类型',
					sortable: true
				},
				{
					key: 'job_attribution',
					title: '任务归属',
					sortable: true
				},
				{
					key: 'job_create_time',
					title: '创建时间',
					sortable: true
				},
				{
					title: 'Action',
					key: 'action',
					width: 300,
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
										this.modal1 = true
										console.log(this)
										
										this.params=params
									}
								}
							}, 'Delete'),
							h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
							}, 'View'),
							h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.result(params.index)
                                        }
                                    }
                            }, 'result'),
						]);
					}
					
				}
			],
			data1: [],
			datason:[],
			datasons:[]
		}
	},
	methods:{
		result(index){
			// this.$router.push(this.datasons[index].board_url) 
			window.open(this.datasons[index].board_url);
		},
		show(index){
			this.$router.push({name:'historicalParams', params: JSON.parse(this.datasons[index].param) }) 
		},
		ok () {
			this.$Message.info('Clicked ok');
			this.remove(this.params)
		},
		cancel () {
			this.$Message.info('Clicked cancel');
		},
		remove (params) {
			// console.log(params)
			if(params.row.job_attribution==this.common.coderole.role){
				this.datasons.splice(params.index, 1);
				console.log(params)
				http.get('deleteTaskinfo?job_id='+params.row.job_id)
                location.reload()

			}
		},
		changepage(index){
			var _start = ( index - 1 ) * this.page.size;
			var _end = index * this.page.size;
			this.datasons = this.datason.slice(_start,_end);

		},
		getdata(){
            Promise.all([http.get("getTaskinfo")]).then(resList => {
				this.data1=resList
                // resList.forEach((item)=>{
                // console.log(item)
               
                
				// })
				this.datason = [];
				this.data1.forEach((item)=>{
					Array.prototype.push.apply(this.datason, item);
				})
				// console.log(this.datason)
				this.page.total=this.datason.length

				// 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
                if(this.datason.length < this.page.size){
                    this.datasons = this.datason;
                }else{
                    this.datasons = this.datason.slice(0,this.page.size);
                }
			});
		
        },
	},
	mounted(){
		this.getdata()
	}  
}
</script>

<style scoped>
#historicaltask{
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

