<template>
    <el-header height="84px">
        <div class="logo"></div>
        <h1>华中农业大学社会实践管理系统</h1>
        <div class="user" v-if="isLogin">
            <p>欢迎您,{{name}}</p>
            <el-button type="primary" class="login" @click="logout">退出</el-button>
            <el-button type="primary" class="login" v-if="!onHome">
                <router-link to="/">返回主页</router-link>
            </el-button>
        </div>
        <div v-else>
            <el-button type="primary" class="login" @click="login">登录</el-button>
            <el-button type="primary" class="login" v-if="!onHome">
                <router-link to="/">返回主页</router-link>
            </el-button>  
        </div>      
    </el-header>
</template>

<script>
    export default {
		name: 'Header',
		props:['LoginModalPop', 'isLogin', 'name'],
        data() {
            return {
                onHome: true
            }
        },

        methods: {
            login() {
                this.$emit("update:LoginModalPop", true)
            },

            logout() {
                sessionStorage.clear();
                location.reload();
            },
        },

        mounted() {
            let hash = location.hash.slice(2);
            hash == ''? this.onHome = true : this.onHome = false;
        }
    }
</script>

<style scoped lang="less">
    .el-header {
        background: #f5f7fad1;
        box-shadow: inset #c4c7ce 2px -4px 4px 0px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .logo {
            background: url("/static/image/logo.png") no-repeat;
            height: 67px;
            width: 67px;
            background-size: cover;
        }
        h1 {
            color: #18157c;
            letter-spacing: 2px;
            font-weight: bold;
        }
        .user {
            p {
                display: inline-block;
                vertical-align: middle;
                padding: 10px;
                color: #484850;
                font-size: 18px;
                font-weight: bold;
            }
        }
        .login {
            a {
                color: #fff;
            }
            a:hover {
                text-decoration: none;
            }
        }
    }
</style>