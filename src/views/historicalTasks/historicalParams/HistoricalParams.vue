<template>
<div id="historicalparam">
	<div style="background:#eee;padding: 20px;margin-bottom:50px ;" >
        <Card :bordered="false">
            <p slot="title">历史任务</p>
            <p>安全求交参数配置，特征工程参数配置和算法参数配置</p>
        </Card>
	</div>
	<Row >
		<Col style="background:#eee;padding: 20px" >
            <Card>
                <p slot="title" style="text-align:center">参数配置</p>

				<Card class="fecard" v-if="paramsjson">
					<center >{{paramsjson.name}}</center>
				</Card>
				<Card class="fecard" v-if="paramsjson">
					<center>{{paramsjson.role}}</center>
				</Card>
				<Card class="fecard" v-if="paramsjson">
					<center>{{paramsjson.task}}</center>
				</Card>
				<Card class="fecard" v-if="paramsjson">
					<center>{{paramsjson.model_version}}</center>
				</Card>
            </Card>
        </Col>
        <Col span="8" style="background:#eee;padding: 20px" >
            <Card>
                <p slot="title" style="text-align:center">安全求交参数配置</p>
                <p v-for="(item,index) in paramsjson ? paramsjson.data: []" :key="item">{{index}}:{{item}}</p>
      
            </Card>
        </Col>
        <Col span="8" style="background:#eee;padding: 20px" >
            <Card dis-hover>
                <p slot="title"  style="text-align:center">特征工程参数配置</p>
				<div v-for="item in paramsjson ? paramsjson.modules : []" :key="item">
					<p v-for="(itemson,key) in item" :key="itemson">{{key}}:{{itemson}}</p>
				</div>
            </Card>
        </Col>
		<Col span="8" style="background:#eee;padding: 20px" >
            <Card dis-hover>
                <p slot="title"  style="text-align:center">算法参数配置</p>
                <div v-for="item in paramsjson ? paramsjson.algorithms: []" :key="item">
					<p v-for="(itemson,key) in item" :key="itemson">{{key}}:{{itemson}}</p>
				</div>
            </Card>
        </Col>
    </Row>
</div>
</template>
<script>
export default {
	name: 'HistoricalParams',
	data(){
		return{
			paramsjson:null,
		}
	},
	mounted(){
		
		this.paramsjson=this.$route.params;
	}
	// methods:{
	// 	change(newvalue,oldvalue){
			
	// 		this.paramsjson=newvalue
	// 		console.log(this.paramsjson)
	// 	}
	// }
};

</script>

<style scoped>
#historicalparam{
	width: 100%;
	overflow: hidden;
	position: relative;
	background-color:#eee;
}
.params{
	width: 30%;
	height: 400px;
	color: black;
	border: 1px solid #ccc;
	background-color: #CCC;
	position: absolute;
	top: 50px;
	
}
#return{
	right: 100px;
	position: absolute;
	background-color: #ccc;
	border: 1px solid #ccc;
	border-radius: 5%;
	top: 140px;
	width: 100px;
	height: 40px;
	text-align: center;
	font-size: 30px;
}
</style>

