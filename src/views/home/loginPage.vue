<template>
    <div class="login">
        <div class="content">
            <p class="title">论坛登录</p>
            <div class="account">
                <span>账号</span>
                <input type="text" v-model="account" @keyup.enter="login">
            </div>
            <div class="password">
                <span>密码</span>
                <input type="password" v-model="password"  @keyup.enter="login">
                <p v-show="err">账号或者密码错误</p>
            </div>
            <div class="confirm" style="text-align: right;">
                <a style="color: #1890ff;" @click="register">注册账号</a>
                <button type="button" @click="login">登录</button>
            </div>
            <div style="padding:12px 0px;color:#666">
                其他登录方式：
                    <span class="iconfont icon-qq"></span>
                    <span class="iconfont icon-weixin"></span>
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
            account:'',
            password:'',
            token:'',
            err:false,
        }
    },
    mounted(){
        this.$store.commit('login',localStorage.token);
    },
    methods:{
        register(){
            this.$router.push('register')
        },
        login(){
            //账号名和密码是否合规验证（待补充）
            api.login(this.account,this.password).then(res=>{
                switch(res.code){
                    case '200':
                    //将服务器返回的token放入store中userInfo
                    this.$store.commit('login',res.token);
                    localStorage.userInfo = JSON.stringify(res.userInfo)
                    console.log(res);
                    this.$router.push('tech');
                    break;
                    case '401':
                    this.err=true;
                     this.$router.push('/')
                    break;
                }
            },err=>{
                console.log(err);
            })
        },
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
            width:350px;
            height: 320px;
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
