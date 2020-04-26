<template>
    <div class="login">
        <div class="content">
            <p class="title">论坛注册</p>
            <div class="account">
                <span>用户名</span>
                <input type="text" v-model="passage.account" @keyup.enter="register">
            </div>
            <div class="account">
                <span>密码</span>
                <input type="password" v-model="passage.password"  @keyup.enter="register">
            </div>
            <div class="account">
                <span>确认密码</span>
                <input type="password" v-model="passage.confirm"  @change="confirm">
                <p style="color:red;margin-left: 25%;margin-top: 6px;" v-show="err">俩次填写密码不一致</p>
            </div>
            <div class="account">
                <span>昵称</span>
                <input type="text" v-model="passage.name" @keyup.enter="register">
            </div>

            <div class="confirm" style="text-align: right;">
             <a style="color: #1890ff;" @click="login">返回登录</a>
                <button type="button" @click="register">注册</button>
            </div>

        </div>
    </div>    
</template>

<script>
import api from '@/fetch/api'

export default {
    name:'login',
    data(){
        return {
            passage:{
                account:'',
                password:'',
                confirm:'',
                name:'',
            },
            token:'',
            err:false,
        }
    },
    mounted(){
    },
    methods:{
        confirm(){
            console.log("确认")
            console.log(this.passage)
            if(this.passage.password == this.passage.confirm){
                console.log("一样了")
                this.err = false
            }else{
                   console.log("不一样")
                 this.err = true
            }
        },
        login(){
               this.$router.push('/')
        },
        register(){
            api.register(this.passage).then(res=>{
                switch(res.code){
                    case '200':
                    //将服务器返回的token放入store中userInfo
                    console.log(res);
                    this.$router.push('/')
                    break;
                    case '401':
                    this.err=true;
                    break;
                }
            },err=>{
                console.log(err);
            })
        }
    }
}
</script>

<style lang="less" scoped>
    .login{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .content{
            width: 550px;
            height: 400px;
            border: 1px solid #ccc;
            border-radius: 15px;
            padding: 20px 50px;
            box-sizing: border-box;
            input{
                padding: 5px 10px;
                box-sizing: border-box;
                margin-left: 20px;
                border:1px solid grey;
                border-radius: 3px;
            }
            .title{

                text-align: center;
            }
            .account{
                margin-top: 30px;
                span{
                    display:inline-block;
                    width:20%;
                }
            }
            .password{
                height: 55px;
                margin-top: 20px;
                p{
                    color:red;
                    margin:5px 55px;
                }
            }
            .confirm{
                input{
                    margin:10px 3px;
                    vertical-align: middle;
                }
                label{
                    font-size: 10px;
                }
                button{
                    width: 100%;
                    height: 50px;
                    background: #1890ff;
                    border-radius: 5px;
                    color: white;
                    outline: none;
                    font-size: 18px;
                    cursor: pointer;
                    margin-top: 12px;
                }
            }
        }
    }
</style>
