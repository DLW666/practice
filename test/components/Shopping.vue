
<template>
	<div class="myShopping">
		<div class="head">
			<div class="head_img"><img :src="personalInfo.personal_img" /></div>
			<div class="head_name">
				{{personalInfo.name}}
			</div>
		</div>
		<div class="info_list">
			<ul>
				<li v-for="item in personalInfo.info_list">
					<p>{{item.coll_value}}</p>
					<p>{{item.coll_name}}</p>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return{

			}
		},
		computed:{
			personalInfo(){
				return this.$store.getters.personalInfo;
			}
		},
		created(){
			const self = this;
			self.$http({
				method:'get',
				url:'/static/json/shopping.json'
			}).then(
				(res) => {
					//console.log(res)
					for(var item of res.body){
						if(item.id == 1){
							this.$store.dispatch('callPersonalInfo',item);
						}
					}
				},
				(err) => {
					console.log(err)
				}
			);
		}
	}

	import '@/css/shopping_my.css'

</script>