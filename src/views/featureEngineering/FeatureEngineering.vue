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
		v-for="index in felist"
		:key="index"
		:index="index"
		@on-click="handledelete(index)"		
	>
	</FeFather>
	<div @click="addfe" id="addfe">添加数据处理</div>
	<div @click="save" id="save">保存</div>
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
			feindex:0,
			felist:[]
		}
	},
	methods:{
		addfe(){
			this.felist.push(this.feindex)
			// console.log(this.$refs);
			this.feindex+=1
		},
		handledelete(index){
			this.felist.splice(this.felist.indexOf(index),1)
			// console.log(this.$refs);
		},
		save() {
			const params = this.$refs.fefather.map(component => {
				return component.getData();
			});
			var feparams=[]
			params.forEach(forparm);
			function forparm(itemparam,itemindex){
				var data=itemparam
				var keys=[];   
				var values=[];    
				for(var key in data){   
					if (data.hasOwnProperty(key) === true){  
						if(data[key].isoutput==true){
							keys.push(key);    
							values.push(data[key]); 
							// console.log(data[key].isoutput) 	
						}						 
					}      
				}
				// console.log(keys)
				// console.log(values)
				feparams.push(values)
			}
			console.log(feparams)
		}
		
	}
}
</script>

<style scoped>
#featureengineering{
	width: 100%;
	overflow: hidden;
}
#addfe{
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