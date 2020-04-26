<template>
		<div style="margin:20px">
			<!--父子组件传值传值把数据传过去的，文章会自动全部显示-->
		<el-row :gutter="20">
		<el-col :span="16">
		<img src="https://pic2.zhimg.com/v2-6e8fccc8a30e8cf15a90e7a894011579_r.jpg"  style="width:100%" />
		<el-carousel trigger="click" height="240px">
			<el-carousel-item v-for="item in dataList" :key="item">
				<h3 class="small"><img style="width:100%" :src="item" alt=""></h3>
			</el-carousel-item>
		</el-carousel>
			<div style="margin-top: 15px;">
				<el-input style="margin: 20px;width: 90%;" placeholder="请输入内容" v-model="search" class="input-with-select">
					<el-button slot="append" icon="el-icon-search" @click="searchValue"></el-button>
				</el-input>
			</div>
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
		name:'tech',
		components:{
			allArticle,
		},
		data(){
			return{
				search:'',
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
			},
			searchValue(){
				console.log("search:"+this.search)
				var search = this.search;
				api.searchPassageFront(search).then(res=>{
					switch(res.code){
						case '200':
							this.passages=res.data;
							this.passages.forEach(element=>{
								element.tags=element.tags.split(',');
							});
							//将文章间接限制到80个字
							this.shortBreif();
							this.searchType='关键字:  '+search+' ';
							console.log(this.passages);
							break;
						case '400':
							console.log('服务器开小差了');		
					}	
				},err=>{
					console.log(err);
				});	
			}
		},
		
	}
</script>

<style scoped lang="less">

</style>