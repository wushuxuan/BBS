<template>
	<div class="content">
		<computer-nav :myInfo="myInfo"></computer-nav>
		
		<!-- <mobile-nav  v-if="isRouterAlive" :myInfo="myInfo"></mobile-nav> -->
		<el-header style="text-align: right; font-size: 12px;line-height:60px;background:#000;position:fixed;top:0px;width: 100%;
    z-index: 1000;">
			<el-dropdown v-if="myInfo" @command="handleCommand">
				<span style="color:#fff">{{myInfo.name}}</span>
				<el-dropdown-menu slot="dropdown">
				<el-dropdown-item command="logout">退出登录</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
				<el-button v-if="!myInfo" type="primary" @click="login">登录</el-button>
				<el-button type="primary" @click="register">注册</el-button>
				<el-button type="primary" @click="admin">管理员通道</el-button>
			</el-header>
		
		
		<div class="rightContent">
			<transition :name="transitionName" mode="out-in">
				<router-view v-if="isRouterAlive"></router-view>
			</transition>
		</div>
	</div>
</template>

<script>
	import computerNav from './nav/computerNav'
	import mobileNav from './nav/mobileNav'
	import store from '@/store/index'
	import api from '@/fetch/api'

	export default {
		name:'Home',
		components:{
			computerNav,
			mobileNav
		},
		data(){
			return {
				windowWidth:'',
				isRouterAlive:true,
				myInfo:'',
				transitionName:'slide-up',
			}
		},
		provide(){
			return{
				//提供一个reload方法，使得手机页面在导航跳转时得到刷新
				// reload:this.reload
			}
		},
		mounted(){
			var id = JSON.parse(localStorage.userInfo).id;
			this.myInfo = JSON.parse(localStorage.userInfo)
		},
		methods:{
			// reload(){
			// 	this.isRouterAlive=false;
			// 	this.$nextTick(function(){
			// 		this.isRouterAlive=true;
			// 	})
			// },
			login(){
  				this.$router.replace({
                    path: '/',
                });
			},
			register(){
				 this.$router.push('register')
			},
			admin(){
				this.$router.replace({
                    path: '/login',
                });
			},
			logout(){
				console.log("123456")
                let r=confirm('确定要退出吗？');
                if(r){
					store.commit('logout');
					localStorage.removeItem('userInfo');
                    this.myInfo = null;
                }
			},
			 handleCommand(command) {
				// this.$message('click on item ' + command);
				if(command == 'logout'){
					this.logout();
				}
			}
		},
		// watch:{
		// 	// '$route' (to, from) {
		// 	// 	if(to.path=='/file'){
		// 	// 		this.transitionName = 'slide-up';
		// 	// 	}else if(to.path == '/aboutMe'){
		// 	// 		this.transitionName='fade-in';
		// 	// 	}else{
		// 	// 		this.transitionName = 'slide-left';
		// 	// 	}
		// 	// 	console.log(this.transitionName);
		// 	// }
		// }
	}		
</script>

<style scoped lang="less">
	.content{
		height: 100%;
		position: relative;
		.rightContent{
			position:absolute;
			top: 60px;
			left: 250px;
			right: 0px;
			background: #eaeaea;
			min-height: 100%;
			overflow: hidden;
			.slide-up-enter-active,.slide-up-leave-active{
				transition: all 0.5s;
			}
			.slide-up-enter,.slide-up-leave-to{
				transform: translateY(-100px);
				opacity: 0;
			}
			.slide-left-enter-active,.slide-left-leave-active{
				transition: all 0.5s;
			}

			.slide-left-enter,.slide-left-leave-to{
				transform: translateX(-100px);
				opacity: 0;
			}

			.fade-in-enter-active,.fade-in-leave-active{
				transition: all 0.5s;
			}
			.fade-in-enter,.fade-in-leave-to{
				opacity: 0;
			}
		}
	
		@media screen and (max-width: 900px) {
			.rightContent{
				position:relative;
				left: 0;
				width: 100%;
			}
		}
	}
</style>