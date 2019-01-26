
<template>
	<div class="detailsBox">
		<goBack class="goBack"></goBack>
		<div class="detail_img">
			<!-- <carousel :autoplay="true" :minSwipeDistance="40" :scrollPerPage="true" :speed="500" :perPage="1" :paginationPadding="2" :paginationSize="10" :loop="true" :centerMode="true" :autoplayTimeout="5000" :paginationActiveColor="paginationActiveColor" :paginationPosition="paginationPosition">
				<slide v-for="item in detailImg" :key="item">
					<img :src="item" />
				</slide>
			</carousel> -->
			<img :src="detailCont.img" />
		</div>
		<div class="detail_cont">
			<div class="detail_cont_price">
				<span>
					￥{{detailCont.price}}
				</span>
				<span class="detail_cont_price_old" v-if="detailCont.oriPrice">
					{{detailCont.oriPrice}}
				</span>
			</div>
			<div class="detail_cont_tit">
				{{detailCont.tit}}
			</div>
			<div class="detail_cont_otherInfo">
				<div>快递：{{detailCont.expressPrice}}</div>
				<div>月销{{detailCont.salesVolume}}</div>
				<div>{{detailCont.province}}</div>
			</div>
		</div>
		<div class="detail_bottom">
			<div class="detail_bottom_left">
				<div class="detail_bottom_left_chi">
					<div><img src="@/assets/service.png" /></div>
					<p>客服</p>
				</div>
				<div class="detail_bottom_left_chi">
					<div><img src="@/assets/no-star.png" /></div>
					<p>收藏</p>
				</div>
			</div>
			<div class="detail_bottom_right">
				<p v-if="inCart" class="detail_inCart">已加入购物车</p>
				<p @click="setCart" v-else>加入购物车</p>
				<p>立即购买</p>
			</div>
		</div>
	</div>
</template>

<script>
	import goBack from '@/components/goBack.vue'
	export default {
		data(){
			return{
				paginationPosition:'bottom-overlay',
				paginationActiveColor:'#ff8705',
				commId: null, //当前commId
				detailCont: {}, //商品详情
				cart: [], //购物车
			}
		},
		components:{
			goBack
		},
		mounted(){
			this.commId = this.$route.params.commId; //获取路由参数
			this.getDetail(this.commId); //获取对应参数的商品
			this.getCart(); //获取购物车
		},
		methods:{
			getDetail(commId){ //获取对应参数的商品
				//console.log(commId)
				const self = this;
				self.$get(
					'./static/json/recommends.json'
				).then(
					(res) => {
						for(var item of res){
							if(item.commId == commId){ //商品id = 参数id
								//console.log(item)
								this.detailCont = item;
							}
						}
					}
				);
			},
			getCart(){ //获取购物车信息
				this.cart = JSON.parse(window.localStorage.getItem('cart'));

			},
			setCart(){ //加入购物车
				if( JSON.parse(window.localStorage.getItem('login')) ){ //判断登录状态
					let cart = this.cart;
					cart.push(this.detailCont);
					window.localStorage.setItem('cart',JSON.stringify(cart));
				}else{
					alert('请登录后操作');
				}
			}

		},
		computed:{
			inCart(){ //是否在购物车中
				for(let item of this.cart){
					if(this.commId == item.commId){
						return true;
					}
				}
				return false;
			}
		}

	}

</script>

<style scoped>

.detailsBox{
	padding-bottom: 5rem;
}	
.detail_cont{
	padding: 0 2%;
}
.detail_cont_price{
	font-size: 1.5rem;
    text-align: start;
    padding: 1.5% 0;
    color: #ff8705;
}
.detail_cont_price_old{
    color: #7f7f7f;
    font-size: 1rem;
    text-decoration: line-through;
}
.detail_cont_tit{
	padding: 0 0 2% 0;
    text-align: start;
    font-size: 0.95rem;
}
.detail_cont_otherInfo{
    color: #7f7f7f;
    font-size: 0.8rem;
    display: flex;
    justify-content: space-between;	
}
.detail_bottom{
    position: fixed;
    bottom: 1%;
    display: flex;
	align-items: flex-end;
    width: 100%;
	background: #fff;
}
.detail_bottom_left{
	width: 30%;
	display: flex;
    justify-content: space-around;
	color: #7f7f7f;
	font-size: 0.9rem;
}
.detail_bottom_right{
	width: 70%;
}
.detail_bottom_left_chi div{
	width: 60%;
    margin: auto;
}
.detail_bottom_right{
	display: flex;
    line-height: 3.4rem;
    color: #fff;
}
.detail_bottom_right p{
	width: 50%;
    box-sizing: border-box;
}
.detail_bottom_right p:nth-child(1){
    border-radius: 2rem 0 0 2rem;
	padding-left: 8%;
	background: -webkit-linear-gradient(left,#fd9707, #fdc903); /* Safari 5.1 - 6.0 */
	background: -o-linear-gradient(right,#fd9707, #fdc903); /* Opera 11.1 - 12.0 */
	background: -moz-linear-gradient(right,#fd9707, #fdc903); /* Firefox 3.6 - 15 */
	background: linear-gradient(right,#fd9707, #fdc903); /* 标准的语法（必须放在最后） */
}
.detail_bottom_right p:nth-child(2){
    border-radius: 0 2rem 2rem 0;
	padding-right: 8%;
	background: -webkit-linear-gradient(left,#ff4b0b, #fd7304); /* Safari 5.1 - 6.0 */
	background: -o-linear-gradient(right,#ff4b0b, #fd7304); /* Opera 11.1 - 12.0 */
	background: -moz-linear-gradient(right,#ff4b0b, #fd7304); /* Firefox 3.6 - 15 */
	background: linear-gradient(right,#ff4b0b, #fd7304); /* 标准的语法（必须放在最后） */
}
.detail_bottom_left_chi{
	width: 40%;
}
.detail_inCart{
	color: #dadada;
}
.goBack{
	position: fixed;
	top: 1%;
	left: 1%;
    width: 10%;
    background: rgba(204,204,204,0.5);
    border-radius: 50%;
}


@media screen and (min-width: 640px){
	.detail_bottom{
		width: 640px;
	}
}

</style>
