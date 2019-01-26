<template>
  <div id="app">
  	<h2 class="global_title">This is my Vue test</h2>
	
    <div class="global_menu" @click="showWorks">menu</div>

  	<div id="global_worksBox" ref="global_worksBox" @click="hideWorks" >
  	  	<div id="global_works">
  		  	<router-link class="work_tit" v-for="item in rouLinks" :to="item.to" :key="item.to">
  		      {{ item.tit }}
  		    </router-link>
  		</div>
  	</div>

    <router-view class="work_cont"></router-view>

  </div>
</template>
<script>
export default {
  name: 'App',
  data(){
  	return{
  		rouLinks:[
  			{ to:'/', tit:'To Test Page' },
  			{ to:'/components/Calculator.vue', tit:'To Calculator' },
        { to:'/components/Shopping.vue', tit:'To Shopping' }
  		],
  	}
  },
  methods:{
  	showWorks(e){
  		const worksBox = this.$refs.global_worksBox;
  		worksBox.style.display = 'block';
  		worksBox.className = 'showWorksBox';
  		worksBox.querySelector('#global_works').className = 'showWorks';
  	},
  	hideWorks(e){
  		const worksBox = this.$refs.global_worksBox;
  		// const ev = e || window.event;
  		// const elem = ev.target || ev.srcEvent;
  		// if(elem.id == 'global_worksBox'){
  		// 	worksBox.className = 'hideWorksBox';
  		// 	worksBox.querySelector('#global_works').className = 'hideWorks';
  		// 	setTimeout(
      //     () => worksBox.style.display = 'none'
      //     ,1000)
  		// 	return;
  		// }
      worksBox.className = 'hideWorksBox';
      worksBox.querySelector('#global_works').className = 'hideWorks';
      setTimeout(
        () => worksBox.style.display = 'none'
      ,1000)
  	}
  }
}

</script>

