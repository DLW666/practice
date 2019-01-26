
<template>
	<div class="bottomBox">
  	  	<div class="bottomBut" v-for="item in butNav" :data-path="item.path" :key="item.path" @click="jumpPage" >
  	  		<div class="bottomBut_icon">
  	  			<img :src="item.icon">
  	  		</div>
  		    <!-- <p class="bottomBut_cont">
  		    	{{ item.tit }}
  		    </p> -->
  		</div>
  		<div class="cartLen" v-if="showCartLen">
  			{{ cartLen }}
  		</div>
  	</div>
</template>

<script>
	export default{
		props:[
			'cartLen'
		],
		data(){
			return {
				butNav:[
					{ path: '/', tit: '首页', icon: './static/img/other/icon_index.png', iconChoose: './static/img/other/icon_indexChoose.png'},
			        { path: '/components/Shopping_car.vue', tit: '购物车', icon: './static/img/other/icon_cart.png', iconChoose: './static/img/other/icon_cartChoose.png' },
			        { path: '/components/Shopping_user.vue', tit: '个人中心', icon: './static/img/other/icon_user.png', iconChoose: './static/img/other/icon_userChoose.png' }
				]
			}
		},
		created(){
			this.getHref();
		},
		computed:{
			showCartLen(){
				if(this.cartLen == 0){
					return false;
				}
				return true;
			}
		},
		methods:{
			jumpPage(e){
				this.$router.push({
					path: e.currentTarget.dataset.path
				});
			},
			getHref(){ //判断当前页面对应的导航栏
				let hash = window.location.hash; //获取当前url # 后的部分
				for(let item of this.butNav){
					if( ('#'+item.path) == hash ){
						item.icon = item.iconChoose;
					}
				}
			}
		}
	}
</script>

<style>
	.bottomBox{
	    position: fixed;
	    bottom: 0;
	    background: #fff;
	    width: 100%;
	    height: 4rem;
	    display: flex;
	    align-items: center;
	    justify-content: space-around;
	}
	.bottomBut{
	    width:33.3%;
	    display: block;
	    color: #555;
	}
	.cartLen{
		position: absolute;
	    top: 2%;
	    left: 52%;
	    width: 1.2rem;
	    height: 1.2rem;
	    line-height: 1.2rem;
	    font-size: 0.9rem;
	    color: #fff;
	    background: #fb4c0e;
	    border-radius: 50%;
	}
	.bottomBut_icon{
		width: 25%;
		margin: auto;
	}
	.bottomBut_cont{
		line-height: 2rem;
	}

	@media screen and (min-width: 640px){
		.bottomBox{
		width: 640px;
		}
	}
</style>
