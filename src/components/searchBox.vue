
<template>
	<div class="index_search">
		<i class="searchIcon"><img src="@/assets/search.png" /></i>
		<input type="text" v-model="searchKeywords" placeholder="仅对商品标题做关键字匹配" />
		<div class="toSearch" @click="sendKeywordsToParent">搜索</div>
	</div>
</template>

<script>
	export default {
		props:[
			'sendChild'
		],
		data(){
			return {
				searchKeywords: this.sendChild || '', //搜索框value
			}
		},
		watch:{
			//父组件(搜索页)所传的参数初始值是''
			// sendChild(newVal,oldVal){
			// 	this.searchKeywords = newVal;
			// }
		},
		methods:{
			sendKeywordsToParent(){ //将value传给父组件
				this.$emit('keywords',this.searchKeywords);
			},
		},
		mounted(){
			
		}
	}
</script>

<style>
.index_search{
	position: relative;
}
.index_search input{
    width: 100%;
    line-height: 2rem;
    border: 0;
    background: #fff;
    -webkit-box-shadow: 0.1rem 0.1rem 0.1rem #ff8705 inset;
    box-shadow: 0.1rem 0.1rem 0.1rem #ff8705 inset;
    border-radius: 1rem;
	padding: 0 11%;
    box-sizing: border-box;
	outline:none;
    color: #555;
}
.searchIcon{
	position: absolute;
    width: 1.3rem;
    top: 23%;
    left: 3%;
}
.toSearch{
	color: #7f7f7f;
    position: absolute;
    top: 23%;
    right: 4%;
    font-size: 0.9rem;
}
</style>
