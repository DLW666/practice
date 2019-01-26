
<template>
	<div@click="goBack">
		<img src="@/assets/back.png">
	</div>
</template>

<script>
	export default{
		data(){
			return{

			}
		},
		methods:{
			goBack(){
				this.$router.go(-1);
			}
		}
	}
</script>

<style>
</style>
