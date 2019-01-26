
<template>
	<div>
		<dragToLogin v-if="!orLogin" @getLogin="getLogin"></dragToLogin>
		<div class="myShopping" v-else>
			<div class="head">
				<div class="head_img"><img :src="personalInfo.personal_img" /></div>
				<div class="head_name">
					{{personalInfo.name}}
				</div>
			</div>
			<!-- <div class="info_list">
				<ul>
					<li v-for="item in personalInfo.info_list">
						<p>{{item.coll_value}}</p>
						<p>{{item.coll_name}}</p>
					</li>
				</ul>
			</div> -->
		</div>
		<bottomNav :cartLen="cartLen"></bottomNav>
	</div>
</template>

<script>
	import bottomNav from './bottom_nav.vue'; //底部导航
	import dragToLogin from './dragToLogin.vue'; //滑块拖动
	export default {
		data(){
			return{
				orLogin: false, //是否登录
				personalInfo: [], //个人信息
			}
		},
		components:{
			bottomNav, //底部导航
			dragToLogin, //滑块拖动
		},
		computed:{
			cartLen(){
				let cart = JSON.parse(window.localStorage.getItem('cart')) || [];
				return cart.length;
			}
		},
		methods:{
			getLogin(data){ //接收子组件参数-登录
				if(data){
					if(window.localStorage.getItem('userInfo') == null){ //初始化个人信息
						let userInfo = {
							"id":1,
							"name":"×××××××××",
							"personal_img":"./static/img/user/userDefault.jpg",
							// "info_list":[
							// 	{"coll_name":"收藏夹","coll_value":"0"},
							// 	{"coll_name":"关注","coll_value":"0"},
							// 	{"coll_name":"红包卡券","coll_value":"0"},
							// 	{"coll_name":"会员积分","coll_value":"0"}
							// ]
						};
						window.localStorage.setItem('userInfo',JSON.stringify(userInfo));
					}
					
					window.localStorage.setItem('login','true'); //登录成功
					this.personalInfo = JSON.parse(window.localStorage.getItem('userInfo'));
					this.orLogin = true;
				}
			},
			getUserInfo(){ //获取个人信息
				if( JSON.parse(window.localStorage.getItem('login')) ){ //判断登录状态
					this.orLogin = true;
					this.personalInfo = JSON.parse(window.localStorage.getItem('userInfo'));
				}
			}
		},
		mounted(){
			this.getUserInfo(); //获取个人信息
		}
	}

</script>

<style>
	
.myShopping{
    padding: 5%;
    background: #ff8705;
}
.head{
	display: flex;
    align-items: center;
}
.head_img{
	width:20%;
}
.head_img img{
    border-radius: 50%;
}
.head_name{
	font-size: 1.5rem;
    margin-left: 3%;
    color: #fff;
}
.info_list{
	margin-top: 5%;
	background: #fff;
    color: #9f9f9f;
    padding: 2%;
    border-radius: 1rem;
}
.info_list ul{
	display: flex;
    align-items: center;
    justify-content: space-around;
}
.info_list ul li{
	width: 25%;
}
.info_list ul li p:nth-child(2){
	font-size: 0.8rem;
}

</style>
