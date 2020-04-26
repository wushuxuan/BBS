<template>
   <div class="allArticle">
        <div class="head">留言管理</div>
        <div class="content">
            <table width="100%">
                <thead>
                    <tr>
                        <th>时间</th>
                        <th>内容</th>
                    </tr>
                </thead>
                <tbody>
                    <tr  v-for="(passage,index) in passages" :key="index">
                        <td>{{passage.time}}</td>
                        <td>{{passage.content}}</td>
                        <!-- <td>{{passage.imgSrc}}</td>
                        <td>
                             <button class="save" v-show="passage.state=='发表'" @click="toggleState(passage)">设为草稿</button> 
                            <button class="modify" @click="goModify(passage)">修改</button>-->
                           <!-- <button class="del" @click="delUser(passage.id,index)">删除</button>
                        </td> -->
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import allArticle from './components/allArticle'
import api from '@/fetch/api'
export default {
    name:'messages',
    components:{
        allArticle,
    },
    data(){
        return{
            type:'留言',
            passages:[
                // {title:'测试文章',time:'2020-8-1',id:1,type:'tech',tags:['javascript','html'],state:'true'},
                // {title:'测试文章',time:'2020-8-1',id:2,type:'tech',tags:['javascript','html'],state:'true'},
            ]
        }
    },
    created(){
        this.getUser();
    },
    methods:{
        getUser(){
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
        delUser(id,index){
            let r=confirm('确定删除此用户吗？');
            if(r){
                api.delUser(id).then(res=>{
                    switch(res.code){
                    case '200':
                        alert('删除成功');
                        this.getUser();
                        break;
                    case '400':
                        alert('服务器炸了，待会儿再试');
                        break;
				    }
                },err=>{
                    console.log(err);
                })
            }
        },
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
                        width: 40%;
                    }
                    //发布时间
                    th:nth-child(2){
                        width: 15%;
                    }
                    //标签
                    th:nth-child(3){
                        width: 15%;
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
                            background: lightgrey;
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
