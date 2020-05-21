<template>
<div id="featureengineering">
	<div style="background:#eee;padding: 20px" >
        <Card :bordered="false">
            <p slot="title">特征工程</p>
            <p>特征工程的输入来至于安全求交的输出，用户可以设置多个特征工程任务，默认会从上到下顺序执行，前一个特征工程的结果作为后一个特征工程的输入，你可以按自己的需要灵活调整任务顺序。特征工程不是必要步骤，不进行任何设置就相当于跳过特征工程步骤。</p>
        </Card>
    </div>
	<FeFather
		ref="fefather"
		v-for="item in fesonshowparamitem"
		:key="item.myId"
		:item="item"
		@on-click="handledelete(item.myId)"
	>
	</FeFather>
	<div @click="addfe('host')" class="addfe">添加host数据处理</div>
	<div @click="addfe('guest')" class="addfe">添加guest数据处理</div>
	<Button type="primary" :loading="btnLoading" @click="modal1 = true" id="save">保存</Button>
	<Modal
		v-model="modal1"
		title="您确定要提交训练任务吗？"
		@on-ok="ok"
		@on-cancel="cancel">
		<p>点击取消按钮就不会保存了</p>
		<p>点击确定按钮就会保存了</p>
	</Modal>
</div>
</template>
<script>
import FeFather from '@/views/featureEngineering/feFather/FeFather';
export default {
	components:{
		FeFather
	},
	data(){
		return {
			modal1: false,
			feindex:0,
			fesonshowparamitem: JSON.parse(JSON.stringify(this.common.feparams))
		}
	},
	methods:{
		ok () {
			this.$Message.info('Clicked ok');
			this.save()
		},
		cancel () {
			this.$Message.info('Clicked cancel');
		},
		addfe(role){
			var length = this.fesonshowparamitem.length;
			this.fesonshowparamitem.push({
				role: { value: role },
				myId: length ? (this.fesonshowparamitem[length - 1].myId + 1) : 1,
				fefangshivalue: { value: "分箱"},
				fenxiangfangshivalue: { value: "等频分箱"},
				guolvfangshivalue: { value: "基于列过滤"},
				guolvfangshivalue2: { value: "过滤未选中列"},
				guolvfangshivalueno: { value: "等距分箱"},
				guolvfangshivaluenofiled: { value: "保留"},
				guolvfangshivaluetongjixinxi: { value: "方差"},
				tianchongfangshivalue: { value: "填充平均值"},
				fenxiangziduanvalue: { value: "*"},
				fengxiangfenxiangshuvalue: { value: 5},
				tianchongziduanvalue: { value: "*"},
				fangchaxiaxianvalue: { value: 3},
				queshilvshangxianvalue: { value: 0.5},
				guolvtiaojian2value: { value: 1},
				guolvtiaojianvalue: { value: 0.1},
				guolvfenxiangshuvalue: { value: 5},
				dureziduanvalue: { value: "*"},
				zidingtianchongziduanvalue: { value: 0},
				guolvziduanvalue: { value: "*"}
			});
		},
		handledelete(myId){
			this.fesonshowparamitem.splice(this.fesonshowparamitem.findIndex(function(v) {
				return v.myId === myId;
			}),1)
		},
		save() {
			const params = this.$refs.fefather.map(component => {
				return component.getData();
			});
			this.common.feparams=JSON.parse(JSON.stringify(params))


			var feshow=this.common.feparams
			var feshowson=[]
			// console.log(feshowson)

			feshow.forEach(
				(itemparam,itemindex)=>{
					var data=itemparam
					var keys=[];   
					var values=[];    
					for(var key in data){   
						if (data.hasOwnProperty(key) === true){  
							if(data[key].isoutput==true){
								keys.push(key);    
								values.push(data[key]); 
							}
						}
					}
					feshowson.push(values)
					// console.log(feshowson)
					this.common.feshow=feshowson
				}
			)
	
		},
		
	}
}
</script>

<style scoped>
#featureengineering{
	width: 100%;
	overflow: hidden;
}
.addfe{
	width: 140px;
	height: 25px;
	border: 1px solid blue;
	background-color: blue;
	color: white;
	margin: 10px;
	text-align:center;
	line-height: 25px;
}
#save{
	width: 80px;
	height: 25px;


	margin: 10px;

}
</style>