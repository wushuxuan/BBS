<template>
	<div>
		<el-card style="margin:20px">
			<div slot="header" class="clearfix">
				<span>留言板</span>
			</div>
			<div>
				<div v-for="pessage in passages" :key="pessage">
					<span>{{pessage.content}}</span>
					<el-divider></el-divider>
				</div>
			</div>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm" style="margin-right:12px;margin-left:0px">
				<el-form-item prop="desc">
					<el-input type="textarea" placeholder="请输入留言内容" rows="8" v-model="ruleForm.desc"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
				</el-form-item>
			</el-form>
		</el-card>
		<el-card style="margin:20px">
			<el-table
				:data="tableData"
				style="width: 100%"
				max-height="250">
				<el-table-column
				fixed
				prop="name"
				label="资源名">
				</el-table-column>
				<el-table-column
				fixed="right"
				label="操作"
				width="120">
				<template slot-scope="scope">
					<el-link target="_blank" :href="'http://localhost:8081'+scope.row.href" :underline="false" >
						<el-button >下载</el-button>
					</el-link>
				</template>
				</el-table-column>
			</el-table>
			<div slot="header" class="clearfix" style="margin-top:24px">
				<span>上传资源</span>
			</div>
			<div>
			<el-upload
				class="upload-demo"
				name="file" 
				action="http://localhost:8081/api/user/upload"
				:on-success="handleAvatarSuccess"
				:on-preview="handlePreview"
				:on-remove="handleRemove"
				:before-remove="beforeRemove"
				:limit="1"
				:on-exceed="handleExceed"
				:file-list="fileList">
				<el-button size="small" type="primary">点击上传</el-button>
			</el-upload>
			</div>
		</el-card>
	</div>
</template>

<script>
	import allArticle from '@/components/allArticle'
	import api from '@/fetch/api'
	import axios from 'axios'
	
	export default{
		name:'sense',
		data(){
			return{
				 ruleForm: {
					desc: ''
				},
				rules: {
					desc: [
						{ required: true, message: '请填写留言内容', trigger: 'blur' }
					]
				},
				passages:[],
				fileList:[],
				tableData:[],
			};
		},
		components:{
			allArticle,
		},
		mounted(){
		},
		created(){
			this.getMessage();
			this.getFileList();
		},
		methods:{
			getMessage(){
				api.getMessage().then(res=>{
					switch(res.code){
						case '200':
						// console.log(res.data);
						//把tags由字符串转为数组以便循环
						this.passages=res.data;
						break;
						case '400':
						console.log('获取数据错误！')
						break;
					}
					console.log(res);
				},err=>{
					console.log(err);
				});

			},
			getFileList(){
				api.getFileList().then(res=>{
					switch(res.code){
						case '200':
						console.log(res);
						//把tags由字符串转为数组以便循环
						this.tableData=res.filelist;
						break;
						case '400':
						console.log('获取数据错误！')
						break;
					}
					console.log(res);
				},err=>{
					console.log(err);
				});
			},
			parseTags(){
				let reg=/<img src/g;
				this.passages.forEach(element => {
					element.tags=element.tags.split(',');
					element.summary=element.summary.replace(reg,`<img data-src`);
				});
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
				if (valid) {
					// alert('submit!');
					console.log(this.ruleForm.desc)
					var content = this.ruleForm.desc
					var id = JSON.parse(localStorage.userInfo).id;
					api.makeMessage(id,content).then(res=>{
					switch(res.code){
						case '200':
							console.log(res.data);
							alert('留言成功！');
							this.getMessage();
							this.$refs[formName].resetFields();
							break;
						case '400':
							alert('服务器炸了');
							break;
					}
				},err=>{
					console.log(err);
				});
				} else {
					// console.log('error submit!!');
					return false;
				}
				});
			},
			//上传资源
			 handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			},
			handleExceed(files, fileList) {
				this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
			},
			beforeRemove(file, fileList) {
				return this.$confirm(`确定移除 ${ file.name }？`);
			},
			handleAvatarSuccess(res, file) {
				console.log(file)
				console.log(res)
				this.fileList = [];
				this.getFileList();
			},
		}
	}
</script>

<style scoped lang="less">
	.modify{
		margin-top:20px
	}
</style>