
<template>
	<div>
		<div class="index_box">
			<!-- 搜索框 -->
			<searchBox class="indexSearchBox" @keywords="getSearchKeywords"></searchBox>
			<!-- 热搜 -->
			<div class="index_hotSearch">
				<ul>
					<li>热搜：</li>
					<li v-for="item in hotSearch" @click="toHotSearch" :data-hot_search="item">{{ item }}</li>
				</ul>
			</div>
			<!-- banner -->
			<div id="index_banners">
				<!-- https://github.com/SSENSE/vue-carousel -->
				<carousel :autoplay="true" :minSwipeDistance="40" :scrollPerPage="true" :speed="500" :perPage="1" :paginationPadding="2" :paginationSize="10" :loop="true" :centerMode="true" :autoplayTimeout="5000" :paginationActiveColor="paginationActiveColor" :paginationPosition="paginationPosition">
					<slide v-for="item in indexBanners" :key="item">
						<img :src="item" />
					</slide>
				</carousel>
			</div>
			<!-- 合作 -->
			<!-- <div class="index_partner">
				<div class="partners" v-for="item in partners" @click="goPartner">
					<div><img :src="item.partnerImg" /></div>
					<p>{{item.partnerTit}}</p>
				</div>
			</div> -->
			<!-- 敬请期待 -->
			<div id="coming" v-show="showComing" ref="coming" :class="comingAnim ? 'comingAnimation':''">
				In coding
			</div>
			<!-- 推荐 -->
			<div class="index_recommend">
				<!-- <div class="index_recommend_tit">猜你喜欢</div> -->
				<div class="recommendsBox">
					<div class="recommends" v-for="item in recommends" @click="toDetail" :data-commid="item.commId">
						<div class="recommend_img"><img :src="item.img" /></div>
						<div class="recommend_tit">{{item.tit | filter_recommend_tit(22)}}</div>
						<div class="recommend_price">
							<div>
								<span>￥{{item.price}}</span>
								<span class="recommend_oriPrice" v-if="item.oriPrice">￥{{item.oriPrice}}</span>
							</div>
							<p class="recommend_inCart" v-if="orCart(item.commId)">已加入购物车</p>
							<p class="recommend_add" @click="insertCart" :data-commid="item.commId" v-else>+</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<bottomNav :cartLen="cartLen"></bottomNav>
	</div>
</template>

<script>

	import bottomNav from './bottom_nav.vue'; //底部导航
	import searchBox from './searchBox.vue'; //搜索框
	
	export default {
		data(){
			return{
				paginationPosition:'bottom-overlay',
				paginationActiveColor:'#ff8705',
				showComing: false, //敬请期待
				comingAnim:false, //敬请期待动画
				cart: [], //购物车
				keywords: '', //搜索框value
			}
		},
		components:{
			bottomNav,
			searchBox
		},
		mounted(){
			this.getOtherData(); //获取 banner 热搜词 合作
			this.getRecommends(); //获取推荐商品
			this.setStorage(); //初始化购物车
		},
		computed:{
			hotSearch(){ //热搜
				return this.$store.getters.getHotSearch
			},
			indexBanners(){ //首页banner
				return this.$store.getters.getIndexBanners
			},
			partners(){ //合作
				return this.$store.getters.getPartners
			},
			recommends(){ //推荐商品
				return this.$store.getters.getRecommends
			},
			cartLen(){ //购物车数量
				return this.cart.length
			},
		},
		methods:{
			getOtherData(){ //获取 banner 热搜词 合作
				const self = this;
				self.$get(
					'./static/json/other_data.json'
				).then(
					(res) => {
						//console.log(res);
						if(res){
							self.$store.dispatch('callHotSearch',res.hotSearch); //热搜
							self.$store.dispatch('callIndexBanners',res.indexBanners); //首页banner
							self.$store.dispatch('callPartners',res.partner); //合作
						}
					}
				);
			},
			getRecommends(){ //获取推荐商品
				const self = this;
				self.$get(
					'./static/json/recommends.json'
				).then(
					(res) => {
						//console.log(res)
						if(res){
							self.$store.dispatch('callRecommends',res); //推荐
						}
					}
				);
			},
			setStorage(){ //初始化购物车
				if(!window.localStorage){
					alert('浏览器不支持localstorage');
				}else if(window.localStorage.getItem('cart') == null){
					window.localStorage.setItem('cart','[]');
				}
				this.cart = JSON.parse(window.localStorage.getItem('cart'));
			},
			goPartner(e){ //敬请期待
				//console.log(e);
				this.showComing = true;
				setTimeout( ()=>{
					this.comingAnim = true;
				},500);
				setTimeout( ()=>{
					this.showComing = false;
					this.comingAnim = false;
				},1500);
			},
			insertCart(e){ //加入购物车
				e.stopPropagation();//阻止冒泡
				if( JSON.parse(window.localStorage.getItem('login')) ){ //判断登录状态
					let commInfos = this.$store.getters.getRecommends;
					for(let item of commInfos){ //根据commId遍历 获取信息存入localStorage
						if(item.commId == e.currentTarget.dataset.commid){
							let cart = this.cart;
							cart.push(item); //push后 this.cart的值发生了变化
							window.localStorage.setItem('cart',JSON.stringify(cart));
						}
					}
				}else{
					alert('请登录后操作');
				}
			},
			toDetail(e){ //跳转商品详情页
				const commId = e.currentTarget.dataset.commid
				//console.log(commId)
				this.$router.push({
					name:'ShoppingDetails', //params传参必须有name引入路由
				 	params:{
						commId:commId
					}
				});
			},
			orCart(commId){ //是否在购物车中
				for(var item of this.cart){
					if(commId == item.commId){
						return true;
					}
				}
				return false;
			},
			getSearchKeywords(keywords){ //接收搜索框value
				this.keywords = keywords;
				this.jumpToSearch(); //跳转搜索页
			},
			toHotSearch(e){ //热搜选项
				this.keywords = e.currentTarget.dataset.hot_search;
				this.jumpToSearch();
			},
			jumpToSearch(){ //跳转搜索页
				this.$router.push({
					name: 'ShoppingSearch',
					params:{
						keywords: this.keywords
					}
				});
			}
		}
	}

</script>

<style scoped>
	
.index_box{
	background: #ff8705;
    color:#fff;
	padding: 4% 0 4rem 0;
}
.index_hotSearch{
    padding: 0 3% 2% 3%;
}
.index_hotSearch ul{
	display: flex;
	justify-content: space-around;
}
.index_hotSearch ul li{
	font-size: 0.7rem;
	width: 18%;
    background: #ff9c42;
    border-radius: 0.5rem;
    color: #fff;
    line-height: 1.3rem;
}
.index_hotSearch ul li:nth-child(1){
	width:12%;
	background: none;
    text-align: end;
}
.index_partner{
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 5% 0%;
}

.partners{
    width: 20%;
}
.partners div{
    padding: 5% 15%;
}
.partners div img{
    border-radius: 50%;
}

.index_recommend_tit{
    font-size: 1.1rem;
    line-height: 1.5rem;
    position: relative;
}
.index_recommend_tit:after,.index_recommend_tit:before{
    content: '';
    height: 0.1rem;
    background: #fff;
    width: 35%;
    position: absolute;
    top: 50%;
}
.index_recommend_tit:after{
    right: 0;
}
.index_recommend_tit:before{
    left: 0;
}
.recommendsBox{
    padding: 5% 2%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}
.recommends{
    width: 49%;
    background: #fff;
    color: #ff8705;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
}
.recommend_img{
    padding:3%;
}
.recommend_tit{
    line-height: 1.8rem;
}
.recommend_price{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 3% 3% 3%;
}
.recommend_add{
    font-size: 1.6rem;
    width: 1.3rem;
    height: 1.3rem;
    line-height: 1.3rem;
    color: #fff;
    background: #ff8705;
    border-radius: 50%;
    cursor:pointer;
}
.recommend_oriPrice{
    font-size: 0.7rem;
    color: #7f7f7f;
    text-decoration: line-through;
}
.recommend_img{
    padding: 3%;
}
.recommend_inCart{
	font-size: 0.7rem;
	line-height: 1.3rem;
	color: #7f7f7f;
}

#coming{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background: rgba(56,56,56,1);
    color: rgba(225,225,225,1);
    width: 6rem;
    line-height: 2rem;
    border-radius: 1rem;
}
.comingAnimation{
    animation: coming 1s;
    animation-fill-mode: forwards;
}
.indexSearchBox{
	width: 90%;
	margin: auto;
	margin-bottom: 3%;
}
@keyframes coming {
    0%{
        background: rgba(56,56,56,1);
        color: rgba(225,225,225,1);
    }
    100%{
        background: rgba(56,56,56,0);
        color: rgba(225,225,225,0);
    }
}
</style>
