<template>
	<div class="userhome">
		<div class="wrap">
				<div class="myImg" style="text-align: center;">
					<el-image
						style="width: 100px; height: 100px;margin-top:12px;"
						:src="url"
						:fit="fit"></el-image>
					<h1 style="cursor:pointer" @click="aboutme">{{myInfo.name}}</h1>
					<p>“ {{myInfo.signature}} ”</p>
					<p><el-button type="primary" @click="goNew">写帖子</el-button></p>
				</div>
				<nav-search></nav-search>
		</div>
<div style="height:100%;flex:1">
<el-row :gutter="20">
  <el-col :span="16"><all-article :passages="passages" :type="type"></all-article></el-col>
  <el-col :span="8">
		<el-card :body-style="{ padding: '0px' }">
      <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4064802917,4132126202&fm=26&gp=0.jpg" class="image">
      <div style="padding: 14px;">
        <span>沪漂靠什么在上海买了房？</span>
        <div class="bottom clearfix">
          <time class="time">{{ currentDate }}</time>
          <el-button type="text" class="button">更多</el-button>
        </div>
      </div>
    </el-card>

<el-card :body-style="{ padding: '0px' }" style="margin-top:24px">
      <img style="max-height: 250px;" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588003865541&di=8f48ab1a9da11c11681058b0163785f1&imgtype=0&src=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20190424%2F11%2F1556076021-iXcyvkSAom.jpg" class="image">
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

	</div>
</template>

<script>
	import allArticle from '@/components/allArticle'
	import api from '@/fetch/api'
	
	export default{
		name:'music',
		components:{
			allArticle,
		},
		data(){
			return {
				url:"https://pic3.zhimg.com/v2-3d606b9de3c1c97d763ef2c146b25ab1_xl.jpg",
				myInfo:null,
				passages:[
//					模板
//					{title:"喜欢后摇的都是什么性格的人？",time:"2020-7-19",breif:`首先要说明的是，我们无法轻而易举的概括一个群体。<br>  但是我们仍然可以找到一些普遍存在的共性。<br><br>  我自己是这样描述后摇的：<b>后摇是非常感性且非常容易引起感性的人的共鸣的音乐 </b>。<br><br>所以第一个性格关键词出现了：<b>感性</b>。<br><br>  诸如上帝是个宇航员、MOGWAI、GODSPEED YOU BLACK EMPEROR这些后摇大团的情绪都是色彩偏暗，氛围感画面感十足，用大量的合成器音效，这对于午夜因为某些情绪失眠的人来说简直不能更赞（这种时候人的情绪大多也是负面的），我印象很深的一次是半夜闭着眼睛听Pg.Lost的Pascal's Law，我不知道有没有人跟我一样被那段长长的军鼓之后突然涌入的失真音墙给打动的体无完肤。。。。。<br><br>  但是同样存在这样一类后摇团，他们十分热爱生活并且善于发现生活中无处不在的美丽，就比如Moonlit Sailor，他们的作品统统美好的让人热泪盈眶……（卧槽一种小时代的即视感），对于后摇乐迷来说，这类团的某些曲目也是不可不听之作。于是对于一些后摇听众来说，他们看起来能被很多种不同的情绪打动，内心情感世界异常丰富且很容易受到情绪的控制。<br><br>  于是我有点草率的给出下一个性格关键词：<b>情绪化</b>。<br><br>  还有一点，我觉得后摇在更多时候对于情绪的表达是微妙而且隐晦的。而且很多后摇时间很长，有时候一个人声采样就一分多钟，对于很多人来说这简直忍不了啊（我承认我有时候也这么觉得，囧）！但如果有人能产生共鸣并且被歌曲中的情绪打动并且沉醉其中无法自拔，那十有八九他的情感很细腻，毕竟音乐的表现力不及影像，能单纯的被一首纯器乐的曲子感动也是件不太容易的事儿。<br><br>`},
//					{title:"怎么评价冒险岛（MapleStory）的配乐？",time:"2020-7-19",breif:`<p>可以说， 无论在风化了的2004，还是在当下，冒险岛的配乐是网络游戏背景音乐的上乘甚至极致。</p><p>网络游戏的配乐最关键的是游戏玩家在打怪，做任务，市场交易，社交活动过程中耳朵所接收到的音乐和眼前场景的对应和协调性。简单说，音乐托景，景随乐动。音乐构筑和烘托了游戏的基调，游戏的底蕴和内涵由此可窥。在国服公测的当年，冒险以它的明亮可爱登场亮相，带来了一股清新明丽之风，其中，唯美的配乐别具一格。我觉得，冒险岛配乐带给每一位玩家一种无法抗拒的沉湎感和回忆感。冒险系的配乐大多欢快，节奏轻巧，极具画面感，温柔且美好。<br/>射手村的旖旎和晨曦意境；<br/>勇士部落的空旷和广袤感；<br/>魔法密林的空灵和寂寥；<br/>黄金海岸的欢快和跳跃节拍；<br/>时间神殿的宁静和安详；<br/>即使在多年之后回味品嚼，这些声音仍然会在内心淡淡絮回，这是音乐的魔幻，也是冒险岛配乐的神奇微妙之处。</p><p>       阔别十年，重温旧乐，感觉美好。很惊喜地从知乎看到这样的提问。草率答了。我们总是在一个荒凉的时代寻找曾经失落的那些童真。致敬冒险。</p>`},
//				
//					{title:"喜欢后摇的都是什么性格的人？",time:"2020-7-19",content:`首先要说明的是，我们无法轻而易举的概括一个群体。<br>  但是我们仍然可以找到一些普遍存在的共性。<br><br>  我自己是这样描述后摇的：<b>后摇是非常感性且非常容易引起感性的人的共鸣的音乐 </b>。<br><br>所以第一个性格关键词出现了：<b>感性</b>。<br><br>  诸如上帝是个宇航员、MOGWAI、GODSPEED YOU BLACK EMPEROR这些后摇大团的情绪都是色彩偏暗，氛围感画面感十足，用大量的合成器音效，这对于午夜因为某些情绪失眠的人来说简直不能更赞（这种时候人的情绪大多也是负面的），我印象很深的一次是半夜闭着眼睛听Pg.Lost的Pascal's Law，我不知道有没有人跟我一样被那段长长的军鼓之后突然涌入的失真音墙给打动的体无完肤。。。。。<br><br>  但是同样存在这样一类后摇团，他们十分热爱生活并且善于发现生活中无处不在的美丽，就比如Moonlit Sailor，他们的作品统统美好的让人热泪盈眶……（卧槽一种小时代的即视感），对于后摇乐迷来说，这类团的某些曲目也是不可不听之作。于是对于一些后摇听众来说，他们看起来能被很多种不同的情绪打动，内心情感世界异常丰富且很容易受到情绪的控制。<br><br>  于是我有点草率的给出下一个性格关键词：<b>情绪化</b>。<br><br>  还有一点，我觉得后摇在更多时候对于情绪的表达是微妙而且隐晦的。而且很多后摇时间很长，有时候一个人声采样就一分多钟，对于很多人来说这简直忍不了啊（我承认我有时候也这么觉得，囧）！但如果有人能产生共鸣并且被歌曲中的情绪打动并且沉醉其中无法自拔，那十有八九他的情感很细腻，毕竟音乐的表现力不及影像，能单纯的被一首纯器乐的曲子感动也是件不太容易的事儿。<br><br>  那么我们又可以得到一个关键词：<b>敏感</b>。<br><br>---------------------------词穷的分割线-----------------------------<br><br>  其实我觉得这三个词已经足够了（其实是找不到更多了，给个台阶下吧亲），但是看到有知友说到了“装逼”的问题，就忍不住多说几句。<br><br>  我这篇讨论的主旨是“<b>真正喜欢后摇</b>并且能<b>沉醉</b>于这类音乐的群体的某些性格共性”。<br><br>  我也真的没法否认有那么一类群体的存在，他们的言谈举止我想大多数人都耳濡目染过。对于他们来说，“没有听说过的乐队”和“看起来很深奥的名词”都是某一种用来炫耀的途径。于是乐迷之间的分享行为渐渐地成为了相互炫耀，一种成就感满足感的获得途径。所以不知道从什么时候开始小众音乐变成了装逼的代名词。这也是挺可悲的一件事儿。<br><br>  但无论如何，音乐本身没有错，音乐只是音乐，拿音乐炫耀或者装逼那是愚蠢的表现；同时，深思熟虑的表达也很重要，充满戾气的言语总不是解决问题的最好方法。<br><br>  以上都是纯个人观点，欢迎良性讨论。`},
//					{title:"怎么评价冒险岛（MapleStory）的配乐？",time:"2020-7-19",content:`<p>可以说， 无论在风化了的2004，还是在当下，冒险岛的配乐是网络游戏背景音乐的上乘甚至极致。</p><p>网络游戏的配乐最关键的是游戏玩家在打怪，做任务，市场交易，社交活动过程中耳朵所接收到的音乐和眼前场景的对应和协调性。简单说，音乐托景，景随乐动。音乐构筑和烘托了游戏的基调，游戏的底蕴和内涵由此可窥。在国服公测的当年，冒险以它的明亮可爱登场亮相，带来了一股清新明丽之风，其中，唯美的配乐别具一格。我觉得，冒险岛配乐带给每一位玩家一种无法抗拒的沉湎感和回忆感。冒险系的配乐大多欢快，节奏轻巧，极具画面感，温柔且美好。<br/>射手村的旖旎和晨曦意境；<br/>勇士部落的空旷和广袤感；<br/>魔法密林的空灵和寂寥；<br/>黄金海岸的欢快和跳跃节拍；<br/>时间神殿的宁静和安详；<br/>即使在多年之后回味品嚼，这些声音仍然会在内心淡淡絮回，这是音乐的魔幻，也是冒险岛配乐的神奇微妙之处。</p><p>       阔别十年，重温旧乐，感觉美好。很惊喜地从知乎看到这样的提问。草率答了。我们总是在一个荒凉的时代寻找曾经失落的那些童真。致敬冒险。</p><p>分享自己硬盘收藏多年的音乐，送给有回忆的人，已上到百度云。`},
				],
				type:{
					title:'技术文章',
					describe:'这是技术文章的简介'
				}
			}
		},
		mounted(){
			if(localStorage.userInfo && JSON.parse(localStorage.userInfo)){
				this.myInfo = JSON.parse(localStorage.userInfo)
				var id = JSON.parse(localStorage.userInfo).id
				api.userArticleFront(id).then(res=>{
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
					});
			}else{
					this.$router.replace({
                    path: '/',
                });
			}
			api.categoryHot().then(res=>{
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
			});
		},
		methods:{
			parseTags(){
				let reg=/<img src/g;
				this.passages.forEach(element => {
					element.tags=element.tags.split(',');
					element.summary=element.summary.replace(reg,`<img data-src`);
				});
			},
			goNew(){
				this.$router.push({name:'new',params:{type:'技术文章'}})
			},
			aboutme(){
				this.$router.push({name:'aboutMe'})
			}
		}
	}
</script>

<style scoped lang="less">
.userhome{
		display: flex;flex-flow: row
	}
	.wrap{
		width:200px;
		background:#fff;
			margin:auto 0;
			height: 100%;
    		margin: 20px;
			.myImg{
			img{
				width: 150px;
				height: 150px;
				border-radius: 50%;
			}
			h1{
				text-align: center;
				margin-top: 10px;
				font-size: 30px;
				color: #000;
			}
			p{
				text-align: center;
				margin:10px 0;
				color: #000;
				font-size: 18px;
			}
		}
	}
</style>