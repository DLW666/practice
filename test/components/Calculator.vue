
<template>
	<div class="Calculator_box">
		<div class="Calculator_showRes">
			<input readonly class="Calculator_showRes_top" ref="showInp" v-model="inpVal" />
		</div>
		<ul class="Calculator_keyboard">
			<li v-for="item in options" :data-value="item" v-on:click="touchBut">{{ item }}</li>
		</ul>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				options: [
					'C','+/-','AC','÷','7','8','9','×','4','5','6','-','1','2','3','+','0','.','='
				],
				inpVal: 0
			}
		},
		methods:{
			touchBut(e){
				const self = this;
				let butVal = e.target.dataset.value;
				if(self.inpVal === 0 || self.inpVal.indexOf('=') != -1){
					self.inpVal = ''
				}
				switch(butVal){
					case 'C' :
						self.inpVal = 0;
						break;

					case '+/-' :
						self.inpVal = -(self.inpVal) + '';
						break;

					case 'AC' :
						self.inpVal = self.inpVal.substring(0,self.inpVal.length-1)
						break;

					case '÷' :
					case '×' :
					case '-' :
					case '+' :
					case '.' :
						self.inpVal += butVal;
						break;

					case '0' :
					case '1' :
					case '2' :
					case '3' :
					case '4' :
					case '5' :
					case '6' :
					case '7' :
					case '8' :
					case '9' :
						self.inpVal += butVal;
						break;

					case '=' :
						self.CalculationRes();
						break;
				}
			},
			CalculationRes(){ // 开始计算
				let self = this;

				const exp = self.inpVal.replace(/÷/g,'/').replace(/×/g,'*');
				//console.log(exp)
				self.inpVal += '=' + eval(exp);
			}
		},
		watch:{
			inpVal:function(newVal,oldVal){
				console.log(this)
				if(newVal.length == 0){
					this.inpVal = 0;
				}else if(newVal.length >= 9 && newVal.length < 13){
					this.$refs.showInp.style.fontSize = '3.5rem';
				}else if(newVal.length >= 13 && newVal.length < 17){
					this.$refs.showInp.style.fontSize = '2.5rem';
				}else if(newVal.length >= 17){
					this.$refs.showInp.style.fontSize = '2rem';
				}else{
					this.$refs.showInp.style.fontSize = '5rem';
				}
			}
		}
	}

	import '@/css/calculator.css'

</script>
