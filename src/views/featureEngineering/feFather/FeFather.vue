<template>
<div>
	<div style="border:5px solid #ccc;" id="fefather">
        <div id="handdelete" @click="(evt) => $emit('on-click', evt)">删除</div>
		<div class="fe">
			<div class="felabel"><span>数据处理 : </span></div>
			<div class="fevalue">
				<Select v-model="fefangshivalue" style="width:200px" name="fefangshi"  >
					<Option v-for="fefangshiitem in fefangshi" :value="fefangshiitem.value" :key="fefangshiitem.value">{{ fefangshiitem.label }}</Option>
				</Select>
			</div>	
		</div>
		<div class="fe" v-if="fefangshivalue=='分箱'">
			<div class="felabel"><span>分箱方式 : </span></div>
			<div class="fevalue">
				<Select v-model="fenxiangfangshivalue" style="width:200px" name="fefangshi" >
					<Option v-for="fenxiangfangshiitem in fenxiangfangshis" :value="fenxiangfangshiitem.value" :key="fenxiangfangshiitem.value">{{ fenxiangfangshiitem.label }}</Option>
				</Select>
			</div>	
		</div>
		<div class="fe" v-if="fefangshivalue=='独热'">
			<div class="felabel"><span>独热字段 : </span></div>
			<div class="fevalue">
				<Input v-model="dureziduanvalue" placeholder="Enter field" clearable style="width: 200px" />
			</div>	
		</div>
		<div class="fe" v-if="fefangshivalue=='特征过滤'">
			<div class="felabel"><span>过滤方式 : </span></div>
			<div class="fevalue">
				<Select v-model="guolvfangshivalue" style="width:200px" name="fefangshi"  >
					<Option v-for="guolvfangshiitem in guolvfangshis" :value="guolvfangshiitem.value" :key="guolvfangshiitem.value">{{ guolvfangshiitem.label }}</Option>
				</Select>
			</div>	
		</div>
		<div class="fe" v-if="guolvfangshivalue=='根据IV值过滤'&&fefangshivalue=='特征过滤'">
			<div class="felabel"><span></span></div>
			<div class="fevalue">
				<Select v-model="guolvfangshivalueno" style="width:200px" name="fefangshi" >
					<Option v-for="guolvfangshiitem in guolvfangshisno" :value="guolvfangshiitem.value" :key="guolvfangshiitem.value">{{ guolvfangshiitem.label }}</Option>
				</Select>
				&nbsp;&nbsp;&nbsp;&nbsp;
				分箱数:
				<Input v-model="guolvfenxiangshuvalue" placeholder="Enter int" clearable style="width: 200px" />
				&nbsp;&nbsp;&nbsp;&nbsp;
				过滤条件:
				<Input  v-model="guolvtiaojianvalue" placeholder="Enter int" clearable style="width: 100px" />
				到
				<Input  v-model="guolvtiaojian2value" placeholder="Enter int" clearable style="width: 100px" />

			</div>	
		</div>
		<div class="fe" v-if="guolvfangshivalue=='根据统计信息值过滤'&&fefangshivalue=='特征过滤'">
			<div class="felabel"><span></span></div>
			<div class="fevalue">
				<Select v-model="guolvfangshivaluetongjixinxi" style="width:200px" name="fefangshi"  >
					<Option v-for="guolvfangshiitem in guolvfangshitongjixinxi" :value="guolvfangshiitem.value" :key="guolvfangshiitem.value">{{ guolvfangshiitem.label }}</Option>
				</Select>
				&nbsp;&nbsp;&nbsp;&nbsp;
				<span v-if="guolvfangshivaluetongjixinxi=='缺失率'">
					缺失率上限:
					<Input v-model="queshilvshangxianvalue" placeholder="Enter int" clearable style="width: 200px" />
				</span>
				&nbsp;&nbsp;&nbsp;&nbsp;
				<span v-if="guolvfangshivaluetongjixinxi=='方差'&&guolvfangshivalue=='根据统计信息值过滤'&&fefangshivalue=='特征过滤'">
					方差下限:
					<Input v-model="fangchaxiaxianvalue" placeholder="Enter int" clearable style="width: 200px" />
				</span>

			</div>	
		</div>
		<div class="fe" v-if="fefangshivalue=='特征过滤'">
			<div class="felabel"><span>过滤字段 : </span></div>
			<div class="fevalue">
				<Input value="*" placeholder="Enter field" clearable style="width: 200px" />
			</div>	
		</div>
		<div class="fe" v-if="fefangshivalue=='特征过滤'&&guolvfangshivalue=='基于列过滤'">
			<div class="felabel"><span>过滤方式 : </span></div>
			<div class="fevalue">
				<Select v-model="guolvfangshivalue2" style="width:200px" name="fefangshi" >
					<Option v-for="guolvfangshiitem in guolvfangshis2" :value="guolvfangshiitem.value" :key="guolvfangshiitem.value">{{ guolvfangshiitem.label }}</Option>
				</Select>
			</div>	
		</div>
		<div class="fe" v-if="fefangshivalue=='特征过滤'&&(guolvfangshivalue=='根据IV值过滤'||guolvfangshivalue=='根据统计信息值过滤')">
			<div class="felabel guolvfangshisnofiled"><span>未选取字段处理方式 : </span></div>
			<div class="fevalue">
				<Select v-model="guolvfangshivaluenofiled" style="width:200px" name="fefangshi" >
					<Option v-for="guolvfangshiitem in guolvfangshisnofiled" :value="guolvfangshiitem.value" :key="guolvfangshiitem.value">{{ guolvfangshiitem.label }}</Option>
				</Select>
			</div>	
		</div>
		<div class="fe" v-if="fefangshivalue=='缺失值填充'">
			<div class="felabel"><span>填充方式 : </span></div>
			<div class="fevalue">
				<Select v-model="tianchongfangshivalue" style="width:200px" name="fefangshi" >
					<Option v-for="tianchongfangshiitem in tianchongfangshis" :value="tianchongfangshiitem.value" :key="tianchongfangshiitem.value">{{ tianchongfangshiitem.label }}</Option>
				</Select>
			</div>	
		</div>
		<div class="fe" v-if="fefangshivalue=='缺失值填充'&&tianchongfangshivalue=='自定义填充值'">
			<div class="felabel"><span></span></div>
			<div class="fevalue">
				<Input v-model="zidingtianchongziduanvalue" placeholder="Enter field" clearable style="width: 200px" />
			</div>	
		</div>
		<div class="fe" v-if="fefangshivalue=='缺失值填充'">
			<div class="felabel"><span>填充字段 : </span></div>
			<div class="fevalue">
				<Input v-model="tianchongziduanvalue" placeholder="Enter field" clearable style="width: 200px" />
			</div>	
		</div>
		<div class="fe" v-if="fefangshivalue=='分箱'">
			<div class="felabel"><span>分箱数: </span></div>
			<div class="fevalue">
				 <Input v-model="fengxiangfenxiangshuvalue" placeholder="Enter int" clearable style="width: 200px" />
			</div>	
		</div>
		<div class="fe" v-if="fefangshivalue=='分箱'">
			<div class="felabel"><span>分箱字段 : </span></div>
			<div class="fevalue">
				<Input v-model="fenxiangziduanvalue" placeholder="Enter field" clearable style="width: 200px" />
				<span>注：默认的*代表选择所有的Numerical连续型字段</span>
			</div>	
		</div>
    </div>
</div>
</template>
<script>
export default {
    props: {
        itemData: {
            default: () => {
                return {};
            }
        }
    },
	data(){
		return{
			fefangshivalue:"分箱",
			fefangshi:[
				{value:"分箱",label:"分箱"},
				{value:"独热",label:"独热"},
				{value:"特征过滤",label:"特征过滤"},
				{value:"缺失值填充",label:"缺失值填充"},
			],
			fenxiangfangshivalue:"等频分箱",
			fenxiangfangshis:[
				{value:"等距分箱",label:"等距分箱"},
				{value:"等频分箱",label:"等频分箱"},
			],
			guolvfangshivalue:"基于列过滤",
			guolvfangshis:[
				{value:"基于列过滤",label:"基于列过滤"},
				{value:"根据IV值过滤",label:"根据IV值过滤"},
				{value:"根据统计信息值过滤",label:"根据统计信息值过滤"},
			],
			guolvfangshivalue2:"过滤未选中列",
			guolvfangshis2:[
				{value:"过滤未选中列",label:"过滤未选中列"},
				{value:"过滤选中列",label:"过滤选中列"},
			],
			guolvfangshivalueno:"等距分箱",
			guolvfangshisno:[
				{value:"等距分箱",label:"等距分箱"},
				{value:"等频分箱",label:"等频分箱"},
			],
			guolvfangshivaluenofiled:"保留",
			guolvfangshisnofiled:[
				{value:"保留",label:"保留"},
				{value:"过滤",label:"过滤"},
			],
			guolvfangshivaluetongjixinxi:"方差",
			guolvfangshitongjixinxi:[
				{value:"缺失率",label:"缺失率"},
				{value:"方差",label:"方差"},
			],
			tianchongfangshivalue:"填充平均值",
			tianchongfangshis:[
				{value:"填充最小值",label:"填充最小值"},
				{value:"填充最大值",label:"填充最大值"},
				{value:"填充平均值",label:"填充平均值"},
				{value:"填充中位数",label:"填充中位数"},
				{value:"自定义填充值",label:"自定义填充值"},			
			],
			fenxiangziduanvalue:"*",
			fengxiangfenxiangshuvalue:5,
			tianchongziduanvalue:"*",
			fangchaxiaxianvalue:3,
			queshilvshangxianvalue:0.5,
			guolvtiaojian2value:1,
			guolvtiaojianvalue:0.1,
			guolvfenxiangshuvalue:5,
			dureziduanvalue:"*",
			zidingtianchongziduanvalue:0
		}
	},
	methods:{
		shujuchuli(fefangshivalue){
			console.log(fefangshivalue)
        },
        getData() {
            return {
				fefangshivalue: {
					value:this.fefangshivalue,
					isoutput:true
				},
				fenxiangfangshivalue:{
					value:this.fenxiangfangshivalue,
					isoutput:this.fefangshivalue=='分箱'
				},
				guolvfangshivalue:{
					value:this.guolvfangshivalue,
					isoutput:this.fefangshivalue=='特征过滤'
				},
				guolvfangshivalue2:{
					value:this.guolvfangshivalue2,
					isoutput:this.fefangshivalue=='特征过滤'&&this.guolvfangshivalue=='基于列过滤'
				},
				guolvfangshivalueno:{
					value:this.guolvfangshivalueno,
					isoutput:this.guolvfangshivalue=='根据IV值过滤'&&this.fefangshivalue=='特征过滤'
				},
				guolvfangshivaluenofiled:{
					value:this.guolvfangshivaluenofiled,
					isoutput:this.fefangshivalue=='特征过滤'&&(this.guolvfangshivalue=='根据IV值过滤'||this.guolvfangshivalue=='根据统计信息值过滤')
				},
				guolvfangshivaluetongjixinxi:{
					value:this.guolvfangshivaluetongjixinxi,
					isoutput:this.guolvfangshivalue=='根据统计信息值过滤'&&this.fefangshivalue=='特征过滤'
				},
				tianchongfangshivalue:{
					value:this.tianchongfangshivalue,
					isoutput:this.fefangshivalue=='缺失值填充'
				},
				fenxiangziduanvalue:{
					value:this.fenxiangziduanvalue,
					isoutput:this.fefangshivalue=='分箱'
				},
				fengxiangfenxiangshuvalue:{
					value:this.fengxiangfenxiangshuvalue,
					isoutput:this.fefangshivalue=='分箱'
				},
				tianchongziduanvalue:{
					value:this.tianchongziduanvalue,
					isoutput:this.fefangshivalue=='缺失值填充'
				},
				fangchaxiaxianvalue:{
					value:this.fangchaxiaxianvalue,
					isoutput:this.guolvfangshivaluetongjixinxi=='方差'&&this.guolvfangshivalue=='根据统计信息值过滤'&&this.fefangshivalue=='特征过滤'
				},
				queshilvshangxianvalue:{
					value:this.queshilvshangxianvalue,
					isoutput:this.guolvfangshivaluetongjixinxi=='缺失率'
				},
				guolvtiaojian2value:{
					value:this.guolvtiaojian2value,
					isoutput:this.guolvfangshivalue=='根据IV值过滤'&&this.fefangshivalue=='特征过滤'
				},
				guolvtiaojianvalue:{
					value:this.guolvtiaojianvalue,
					isoutput:this.guolvfangshivalue=='根据IV值过滤'&&this.fefangshivalue=='特征过滤'
				},
				guolvfenxiangshuvalue:{
					value:this.guolvfenxiangshuvalue,
					isoutput:this.guolvfangshivalue=='根据IV值过滤'&&this.fefangshivalue=='特征过滤'
				},
				dureziduanvalue:{
					value:this.dureziduanvalue,
					isoutput:this.fefangshivalue=='独热'
				},
				zidingtianchongziduanvalue:{
					value:this.zidingtianchongziduanvalue,
					isoutput:this.fefangshivalue=='缺失值填充'&&this.tianchongfangshivalue=='自定义填充值'
				},
			}
		},
		changeProduct() {
			console.log("你选中了",this.fefangshivalue)
			console.log(this.$refs)
        }
	}
}
</script>

<style scoped>
#fefather{
	padding:50px;
}
#handdelete{
    width: 80px;
    height: 30px;
    background-color: blue;
    color: white;
    text-align: center;
    line-height: 30px;
    left: 90%;
    top: 100%;
    position: relative;
}
.fe{
	margin-bottom: -20px;
}
.felabel{
	width: 120px;
	height: 40px;
	line-height: 40px;
	margin-left: 50px;
}
.fevalue{
	left: 130px;
	top: -36px;
	position: relative;
}
.guolvfangshisnofiled{
	margin-left:-10px ;
}
</style>