<template>
    <div class="allArticle">
        <div class="head">帖子管理</div>
        <div class="content">
            <button class="new" @click="goNew">
                写帖子
            </button>
            <table width="100%">
                <thead>
                    <tr>
                        <th>帖子标题</th>
                        <th>发布时间</th>
                         <th>点赞数</th>
                       <!-- <th>标签</th> -->
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr  v-for="(passage,index) in passages" :key="index">
                        <td>{{passage.title}}</td>
                        <td>{{passage.time}}</td>
                         <td>{{passage.zan}}</td>
                        <!-- <td><span class="tag" v-for="tag in passage.tags">#{{tag}} </span></td>-->
                        <td>
                           <!--  <button class="save" v-show="passage.state=='发表'" @click="toggleState(passage)">设为草稿</button> -->
                            <button class="modify" v-show="passage.top=='1'" @click="setTop(passage)">设置置顶</button>
                            <button class="save" v-show="passage.top=='0'" @click="cancelTop(passage)">取消置顶</button>
                            <button class="modify" v-show="passage.hot=='1'" @click="setHot(passage,index)">设置热帖</button>
                            <button class="save" v-show="passage.hot=='0'" @click="cancelHot(passage,index)">取消热帖</button>
                            <button class="modify" @click="goModify(passage)">修改</button>
                            <button class="del" @click="delArticle(passage,index)">删除</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import api from '@/fetch/api'
export default {
    name:'allArticle',
    props:['type','passages'],
    data(){
        return{
            publish:true,
        }
    },
    mounted(){
    },
    methods:{
         getSenseArticle(){
             let category=encodeURIComponent(this.type)
            api.categoryArticleBack(category).then(res=>{
                switch(res.code){
                    case '200':
                    // console.log(res.data);
                    //把tags由字符串转为数组以便循环
                    res.data.forEach(element => {
                        //当标签不存在时就不分割
                        if(element.tags!=null){
                            element.tags=element.tags.split(',');  
                        }
                    });
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
        toggleState (passage){
            let toState=passage.state=='发表'?'草稿':'发表';
            let r=confirm('确定将其设为 '+toState+' 状态吗?');
            if(r==true){
                api.changeStateBack(passage.id,toState).then(res=>{
                    switch(res.code){
                        case '200':
                        passage.state=toState;
                        console.log(passage.state);
                        console.log(this.passages);
                        break;
                        case '400':
                        alert('服务器开小差了！帖子状态修改失败');
                        break;
                    }
                },err=>{
                    console.log(err);
                })
            }
        },
        setTop(passage){
            var articleId = passage.id
            api.setTop(articleId).then(res=>{
                switch(res.code){
                    case '200':
                     this.getSenseArticle();
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
        cancelTop(passage){
            var articleId = passage.id
            api.cancelTop(articleId).then(res=>{
                switch(res.code){
                    case '200':
                     this.getSenseArticle();
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
        setHot(passage){
            var articleId = passage.id
            api.setHot(articleId).then(res=>{
                switch(res.code){
                    case '200':
                     this.getSenseArticle();
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
        cancelHot(passage){
            var articleId = passage.id
            api.cancelHot(articleId).then(res=>{
                switch(res.code){
                    case '200':
                     this.getSenseArticle();
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
        goModify(passage){
            let id=passage.id;
            this.$router.push({name:'modify',params:{id:passage.id}})
        },
        goNew(){
            this.$router.push({name:'newArticle',params:{type:this.type}})
        },
        delArticle(passage,index){
            let r=confirm('确认删除该篇帖子吗？');
            if(r==true){
                let id=passage.id;
                api.delArticleBack(id).then(res=>{
                    switch(res.code){
                        case '200':
                        this.passages.splice('index',1);
                        alert('删除成功！'); 
                        break;
                        case '400':
                        alert('服务器开小差了，删除失败');
                        break;
                    }
                },err=>{
                    console.log(err);
                })
            }
        }

    }
}
</script>

<style lang="less" scoped>
    .allArticle{
        width: 100%;
        min-height:100%;
        .head{
            height: 80px;
            line-height: 80px;
            background: white;
            padding:0 20px;
            font-size: 25px;
            box-sizing: border-box;
            border-left: 10px solid #000;
            display:none
        }
        .content{
            min-height:700px;
            // margin-top: 30px;
            padding: 30px 30px;
            box-sizing: border-box;
            background: white;
            text-align: right;
            overflow: hidden;
            .new{
                width: 70px;
                height: 30px;
                background: #409eff;
                border:1px solid #409eff;
                border-radius: 3px;
                color: white;
                cursor: pointer;
            }
            table{
                margin: 20px auto;
                text-align: center;
                width: 100%;
                
                tr{
                    th,td{
                        border:1px solid #ddd;
                        padding: 10px;
                        vertical-align: middle;
                    }
                    //标题
                    th:nth-child(1),{
                        width: 30%;
                    }
                    //发布时间
                    th:nth-child(2){
                        width: 15%;
                    }
                    //标签
                    th:nth-child(3){
                        width: 25%;
                    }
                    //操作
                    th:nth-child(4){
                        width: 30%;
                    }

                    td{
                        .tag{
                            display: inline-block;
                            margin-right: 10px;
                        }
                        button{
                            width: 65px;
                            height:30px;
                            margin:0 5px;
                            border:1px solid white;
                            border-radius: 5px;
                            color: white;
                            cursor: pointer;
                            outline: none;
                        }
                        .publish{
                            background: #5cb85c;
                        }
                        .save{
                            background: none;
                            border:1px solid  #409eff;
                            color: #409eff;
                        }
                        .modify{
                            background: #409eff;
                        }
                        .del{
                            background: #d9534f;
                        }
                    }
                }
                tbody tr:hover{
                    background: #f0f0f0;
                }
            }
        }
    }
</style>
