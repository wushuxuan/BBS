<template>
	<div class="mobileNav">
		<span style="display:inline-block;margin-right:12px;color:#fff">{{myInfo.name}}</span>
		 <span class="logout" @click="logout">退出登录</span>
	</div>
</template>

<script>
	import navSearch from "./components/navSearch"
	import util from '@/util/util'
	import store from '@/store/index'

	export default{
		name:'mobileNav',
		props:['myInfo'],
		components:{
			navSearch,
		},
		data (){
			return{
				scrollOver:false,//是够向下滑动超过了导航栏底部
				toolState:false, //手机导航栏关闭的状态，
				jump:false,
				handleNavScroll:'',
			}
		},
		// inject:['reload'],
		methods:{
			logout(){
                let r=confirm('确定要退出吗？');
                if(r){
                    store.commit('logout');
                    this.$router.replace({
                        path: '/',
                    });
                }
            },
			
			jumpTo(){
				//调用了home.vue中的reload方法，使得在点击导航栏进行页面跳转时，顶部导航栏可以消失
				this.reload();
			}
		}
	}
</script>

<style scoped lang="less">
	.mobileNav{
		position: fixed;
    // border: 1px solid red;
    z-index: 1000;
    color: #fff;
		display: block;
	    width: -webkit-fill-available;
		height: 75px;
		background: #000;
    text-align: right;
	line-height:75px;
		// padding:20px 0;
		box-sizing: border-box;
		a{
			text-decoration: none;
		}
		.iconfont{
			font-size: 2.2rem;
			color: white;
			margin:0 10px 10px;
		}
		img{
			width: 130px;
			height:130px;
			border-radius: 50%;
		}
		p{
			margin:10px 3px;
			font-size: 1.4rem;
			color: white;
		}
		.triger{
			width: 100%;
			height: 50px;
			line-height: 50px;
			position: fixed;
			top: 0;
			z-index: 100;
			cursor: pointer;
			text-align: left;
			padding-left: 20px;
			box-sizing: border-box;	
			span{
				color: white;
				font-size: 20px;
				display:none;
				
			}
			.icon{
				position: absolute;
				top: 15px;
				right: 15px;
				span{
					display: block;
					width: 20px;
					height: 2px;
					background: white;
					margin-bottom: 5px;
				}
			}
		}
		
		.scrollOver{
			background:#000;
			border-bottom: 1px solid gray;
			span{
				display: inline;
			}
		}
		
		.tools{
			width: 100%;
			height: 250px;
			position: fixed;
			top: 50px;
			z-index: 99;
			background:#000;
			overflow: hidden;
			border-bottom: 1px solid white;
			li{
				text-align: center;
				height: 35px;
				line-height: 35px;
				font-size: 18px;
			}
			a{
				color: white;
				text-decoration: none;
			}
		}
		.toggle-enter,.toggle-leave-to{
			height: 0px;
		}
		
		.toggle-enter-active,.toggle-leave-active{
			transition: all 0.5s ease;
		}
		
	}

	@media screen and (max-width: 900px){
		.mobileNav{
			display: block;
		}
	}
	
</style>
