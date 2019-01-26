
<template>
	<div class="searchPageBox">
		<div class="searchBox">
			<goBack class="goBack"></goBack>
			<searchBox class="search" @keywords="getSearchKeywords" :sendChild="keywords"></searchBox>
		</div>
		<div class="searchListBox">
			<div v-if="searchComm.length == 0" class="noSearch">
				数据有限，凑合着看吧
			</div>
			<div v-else class="searchList" v-for="item in searchComm" :data-id="item.commId" @click="jumpToDetail">
				<div class="list_left">
					<img :src="item.img">
				</div>
				<div class="list_right">
					<p class="right_tit">{{item.tit | filter_recommend_tit(60)}}</p>
					<div class="right_price">
						<span class="nowPrice">￥{{item.price}}</span>
						<span class="oldPrice">{{item.oriPrice}}</span>
					</div>
					<div class="right_other">
						<p>{{item.expressPrice}}</p>
						<p>{{item.salesVolume}}人付款</p>
						<p>{{item.province}}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import searchBox from './searchBox.vue'; //搜索框
	import goBack from './goBack.vue'; //返回按钮
	export default {
		data(){
			return {
				searchComm: [], //匹配搜索的商品
				keywords: this.$route.params.keywords || '', //因为子组件只会接收一次,所以直接初始化时赋值,优于子组件做监听(我认为)
			}
		},
		components:{
			searchBox,
			goBack
		},
		mounted(){
			this.getSearchComm(); //获取匹配搜索的商品
		},
		methods:{
			getSearchComm(){ //获取匹配搜索的商品
				let commodity = this.$store.getters.getRecommends;
				this.searchComm = []; //初始化匹配商品
				for(let item of commodity){
					if(item.tit.indexOf(this.keywords) != -1){
						this.searchComm.push(item);
					}
				}
			},
			getSearchKeywords(keywords){ //接收搜索框value
				this.keywords = keywords;
				this.getSearchComm(); //获取匹配搜索的商品
			},
			jumpToDetail(e){ //跳转详情页
				this.$router.push({
					name: 'ShoppingDetails',
					params:{
						commId: e.currentTarget.dataset.id
					}
				})
			}
		}
	}
</script>

<style type="text/css" scoped>
.searchPageBox{

}
.searchBox{
	background: #ff8705;
	padding: 5% 3%;
	display: flex;
    justify-content: space-between;
}
.searchList{
	padding: 4%;
	display: flex;
	justify-content: space-between;
	border-bottom: 1px solid #dbdbdb;
}
.list_left{
	width: 27%;
}
.list_right{
	width: 70%;
	text-align: start;
}
.right_tit{
	font-size: 0.95rem;
    line-height: 1.5rem;
    font-weight: bold;
}
.right_price{
	line-height: 2.1rem;
}
.nowPrice{
	color: #ff8705;
	font-size: 1.2rem;
}
.oldPrice{
	font-size: 0.9rem;
    color: #7f7f7f;
    text-decoration: line-through;
}
.right_other{
	display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.9rem;
    color: #7f7f7f;
}
.search{
	width: 89%;
}
.goBack{
	width: 8%;
	background: rgba(204,204,204,0.5);
    border-radius: 50%;
}
.noSearch{
	line-height: 10rem;
	color: #7f7f7f;
}
</style>
