
<template>
	<div class="homePage">
		<div v-if="isShow">vuex —— show/hide</div>
		<input type="number" v-model="numAdd" />
		<button @click="changeNum">Click + 1</button>
	</div>
</template>

<script>
	export default {
		data(){
			return {
			}
		},
		computed:{
			isShow(){
				return this.$store.getters.isVuex;
			},
			numAdd(){
				return this.$store.getters.isStore;
			}
		},
		methods:{
			changeNum(){
				this.$store.dispatch('getNewNum',1);
			}
		},
	}
</script>