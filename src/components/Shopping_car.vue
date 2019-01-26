
<template>
	<div>
		<div class="car_tit">
			购物车
		</div>

		
		<div class="car_none" v-if="!orCart">
			{{cartInfo}}
		</div>
		<div class="car_listBox" v-else>
			<div class="car_list" v-for="item in userCar" :class="item.orSettlement ? 'listChooseStyle':''">
				<div class="car_list_choose" :class="item.orSettlement ? 'butChooseStyle':''" @click="car_choose" :data-id="item.commId">
				</div>
				<div class="car_list_img" @click="toDetail" :data-commid="item.commId">
					<img :src="item.img">
				</div>
				<div class="car_list_content" @click="toDetail" :data-commid="item.commId">
					<p class="car_list_tit">
						{{item.tit | filter_recommend_tit(37)}}
					</p>
					<p class="car_list_province">{{item.province}}</p>
					<div class="car_list_price">
						￥<span>{{item.price}}</span>
						<span v-if="item.oriPrice">￥{{item.oriPrice}}</span>
					</div>
				</div>
				<div class="car_remove" @click="removeInfo" :data-commid="item.commId">
					<img src="@/assets/closeBtn_swt.png">
				</div>
			</div>
		</div>

		<div class="money">
			<div class="chooseAll" @click="chooseAll">
				<div class="car_list_choose chooseAll_yuan" :class="orChooseAll ? 'butChooseStyle':''" v-if="orCart"></div>
				<p class="chooseAll_word" v-if="orCart">{{chooseWord}}</p>
			</div>
			<div class="toSettlement">
				<div class="toSettlement_money">
					<div class="toSettlement_word">合计：</div>
					<div class="toSettlement_price">{{money}}</div>
				</div>
				<div class="toSettlement_but" @click="toSettlement">{{settlementNum}}</div>
			</div>
		</div>

		<bottomNav :cartLen="cartLen"></bottomNav>
	</div>
</template>

<script>
	import bottomNav from './bottom_nav.vue';
	export default {
		data(){
			return{
				userCar: [], //购物车详情
				chooseWord: '全选',
				cartInfo: '空空如也~',
			}
		},
		components:{
			bottomNav
		},
		created(){
			this.orLogin(); //是否登录
		},
		computed:{
			orChooseAll(){ //是否全选
				for(var item of this.userCar){
					if(item.orSettlement == false){
						this.chooseWord = '全选'
						return false;
					}
				}
				this.chooseWord = '取消全选';
				return true;
			},
			settlementNum(){ //选中数量
				var num = 0;
				for(var item of this.userCar){
					if(item.orSettlement == true){
						num += 1;
					}
				}
				return this.orCart ? '结算(' + num + ')' : '结算(- -)';
			},
			money(){ //选中总金额
				var money = 0;
				for(var item of this.userCar){
					if(item.orSettlement == true){
						money += parseInt(item.price);
					}
				}
				return this.orCart ? '￥' + money : '- -';
			},
			orCart(){ //购物车内是否有商品
				return this.userCar.length != 0;
			},
			cartLen(){ //购物车数量
				return this.userCar.length
			}
		},
		methods:{
			orLogin(){ //是否登录
				if( JSON.parse(window.localStorage.getItem('login')) ){
					this.getUserCar(); //获取用户购物车详情
				}else{
					this.cartInfo = '请登录后查看'
				}
			},
			getUserCar(){ //获取用户购物车详情
				this.userCar = JSON.parse(window.localStorage.getItem('cart'));
			},
			car_choose(e){ //商品选中样式
				//console.log(e.currentTarget.dataset.id);
				const chooseId = e.currentTarget.dataset.id;
				for(var item of this.userCar){
					if(item.commId == chooseId){
						if(item.orSettlement == false){
							item.orSettlement = true;
						}else{
							item.orSettlement = false;
						}
					}
				}
			},
			toDetail(e){
				let commId = e.currentTarget.dataset.commid;
				this.$router.push({
					name: 'ShoppingDetails',
					params:{
						commId: commId
					}
				});
			},
			chooseAll(){ //全选按钮
				if(this.orChooseAll){
					for(var item of this.userCar){
						item.orSettlement = false;
					}
				}else{
					for(var item of this.userCar){
						item.orSettlement = true;
					}
				}
			},
			removeInfo(e){ //删除
				if(confirm('确定删除么？')){
					let cart = JSON.parse(window.localStorage.getItem('cart'));
					for(let i=0; i<cart.length; i++){
						if(cart[i].commId == e.currentTarget.dataset.commid){
							cart.splice(i,1);
						}
					}
					window.localStorage.setItem('cart',JSON.stringify(cart));
					this.userCar = JSON.parse(window.localStorage.getItem('cart')) || []; //更新数据
				}				
			},
			toSettlement(){ //支付

			}
		}
	}
</script>

<style>
	.car_tit{
		font-size: 1.5rem;
    	padding: 3% 0 1% 0;
	}
	.car_listBox{
		padding: 2% 4% 30% 4%;
	}
	.car_list{
	    display: flex;
    	align-items: center;
    	justify-content: space-around;
    	margin-bottom: 4%;
    	background: rgba(255,135,5,0.1);
		padding: 4%;
		border-radius: 2rem;
		position: relative;
	}
	.car_list_choose{
		width: 25px;
	    height: 25px;
	    border: 1px solid #ff8705;
	    border-radius: 50%;
	}
	.car_list_img{
		width: 30%;
	}
	.car_list_content{
		width: 50%;
		text-align: justify;
	}
	.car_list_img img{
		border-radius: 0.5rem;
	}
	.car_list_province{
		font-size: 0.9rem;
    	color: #777777;
    	line-height: 2rem;
	}
	.car_list_price{
		color: #ff8705;
	}
	.car_list_price span:nth-child(1){
		font-size: 1.3rem;
	}
	.car_list_price span:nth-child(2){
		font-size: 1rem;
		color: #777777;
		text-decoration: line-through;
	}
	.money{
	    position: fixed;
	    bottom: 4rem;
	    border-top: 1px solid #7777;
	    width: 100%;
	    display: flex;
	    justify-content: space-between;
	    align-items: center;
	    padding: 2%;
    	box-sizing: border-box;
    	background: #fff;
	}
	.chooseAll{
		display: flex;
    	align-items: center;
	}
	.chooseAll_yuan{
		margin-right: 0.5rem;
	}
	.toSettlement{
		display: flex;
    	align-items: center;
    	justify-content: flex-end;
    	width: 70%;
	}
	.toSettlement_but{
	    width: 50%;
	    line-height: 3rem;
	    border-radius: 2rem;
	    color: #fff;
	    background: #ff8705;
	    background: -webkit-linear-gradient(left,#fb4c0e, #fd8e00); /* Safari 5.1 - 6.0 */
		background: -o-linear-gradient(right,#fb4c0e, #fd8e00); /* Opera 11.1 - 12.0 */
		background: -moz-linear-gradient(right,#fb4c0e, #fd8e00); /* Firefox 3.6 - 15 */
		background: linear-gradient(right,#fb4c0e, #fd8e00); /* 标准的语法（必须放在最后） */
	}
	.toSettlement_price{
		color: #ff8705;
	}
	.chooseAll_word{
		color: #777777;
	}
	.toSettlement_money{
		display: flex;
		margin-right: 3%;
	}
	.car_none{
	    line-height: 70vh;
    	color: #777777;
	}
	.car_remove{
	    width: 1.5rem;
	    position: absolute;
	    top: 50%;
	    right: 1%;
	    transform: translate(0,-50%);
	}


	.butChooseStyle{
		background:#ff8705;
		border:1px solid #ff8705;
	}
	.listChooseStyle{
		background:rgba(255,135,5,0.3);
	}
	@media screen and (min-width: 640px) {
		.money{
			width: 640px;
			margin: auto;
		}
	}
</style>
