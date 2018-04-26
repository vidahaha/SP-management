<template>
    <el-header height="84px">
        <div class="logo"></div>
        <h1>华中农业大学社会实践管理系统</h1>
        <div class="user" v-if="isLogin">
            <p>欢迎您,{{name}}</p>
            <el-button type="primary" class="login" @click="logout">退出</el-button>
        </div>
        <el-button type="primary" class="login" @click="login" v-else>登录</el-button>
    </el-header>
</template>

<script>
    export default {
		name: 'Header',
		props:['LoginModalPop', 'isLogin', 'name'],
        data() {
            return {
                
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
            letter-spacing: 3px;
            font-weight: 400;
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
        .login {}
    }
</style>