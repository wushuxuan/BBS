<template>
		<div style="margin:20px">
			<!--父子组件传值传值把数据传过去的，文章会自动全部显示-->
		<el-row :gutter="20">
		<el-col :span="16">
        <el-card>
            湖南大学，中南大学，国防科技大学，武汉大学，华中科技大学，中国科学技术大学，南京大学，东南大学，复旦大学，上海交通大学，同济大学，华东师范大学，这些是长江中下游985大学。西安交通大学，西北工业大学，西北农林科技大学，山东大学，这些是黄河中下游985。中山大学，华南理工大学，这些是珠江中下游985。

        </el-card>
		
		<all-article :passages="passages" :type="type"></all-article>
		</el-col>
		<el-col :span="8">
	<el-card :body-style="{ padding: '0px' }">
      <img src="http://image.biaobaiju.com/uploads/20190928/19/1569669753-jnlcKyEuMZ.jpg" class="image">
      <div style="padding: 14px;">
        <span>沪漂靠什么在上海买了房？</span>
        <div class="bottom clearfix">
          <time class="time">{{ currentDate }}</time>
          <el-button type="text" class="button">更多</el-button>
        </div>
      </div>
    </el-card>

<el-card :body-style="{ padding: '0px' }" style="margin-top:24px">
      <img style="max-height: 250px;" src="http://pic1.win4000.com/wallpaper/c/5427a82c9b140.jpg" class="image">
      <div style="padding: 14px;">
        <span>浙江鼓励一周休 2.5 天，实现可能性大吗？将产生哪些影响？</span>
        <div class="bottom clearfix">
          <time class="time">{{ currentDate }}</time>
          <el-button type="text" class="button">更多</el-button>
        </div>
      </div>
    </el-card>
		</el-col>
		</el-row>
	</div>
</template>

<script>
	import allArticle from '../../components/allArticle'
	import api from '@/fetch/api'
	export default{
		name:'other',
		components:{
			allArticle,
		},
		data(){
			return{
    			imgsrc:'',
				dataList:["http://pic1.win4000.com/wallpaper/c/58b8e4bb4b134.jpg",
"http://b.zol-img.com.cn/desk/bizhi/image/6/960x600/142180751573.jpg","http://image.biaobaiju.com/uploads/20190705/21/1562333919-EGWdXnuhRt.jpg"],
				passages:[],
				type:{
					title:'技术文章',
					describe:'这是技术文章的简介'
				},
			}
		},
		mounted(){
 			this.imgsrc='/static/img/myImg.jpg';
			api.categoryArticleFront(this.type.title).then(res=>{
					switch(res.code){
					case '200':
						console.log('获取文章成功！');
						this.passages=res.data;
						this.parseTags();
						break;
					case '400':
						console.log('服务器开小差了！');
						break;
					}
				},err=>{
					console.log(err);
			})
		},
		methods:{
			parseTags(){
				let reg=/<img src/g;
				this.passages.forEach(element => {
					element.tags=element.tags.split(',');
					element.summary=element.summary.replace(reg,`<img data-src`);
				});
			}
		},
		
	}
</script>

<style scoped lang="less">

</style>