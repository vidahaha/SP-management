<template>
    <div class="login-wrap">
        <el-container>
            <Header :LoginModalPop.sync="LoginModalPop" :isLogin.sync="isLogin" :name.sync="name"></Header>
            <el-main>
                <div class="background">
                    <div class="slogan"></div>
                    <el-button type="primary" class="reg" v-if="isLogin">
                        <router-link to="/public">查看公示</router-link>
                        <i class="el-icon-arrow-right"></i>
                    </el-button>
                    <el-button type="primary" class="reg" @click="reg" v-else>
                        立即注册！
                        <i class="el-icon-arrow-right"></i>
                    </el-button>
                    <el-row class="options">
                        <el-col :span="6">
                            <div class="showTask content">
                                <p class="title">项目相关内容公示</p>
                                <p class="info">
                                    各项目答辩时间，地点，经费报销，成绩公布
                                </p>
                                <div class="more">
                                    <i class="el-icon-info"></i>
                                    <router-link to="/public">点击此处查看</router-link>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="showMyTask content">
                                <p class="title">项目相关内容公示</p>
                                <p class="info">
                                    各项目答辩时间，地点，经费报销，成绩公布
                                </p>
                                <div class="more">
                                    <i class="el-icon-info"></i>
                                    <a>点击此处查看</a>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="signTask content">
                                <p class="title">项目相关内容公示</p>
                                <p class="info">
                                    各项目答辩时间，地点，经费报销，成绩公布
                                </p>
                                <div class="more">
                                    <i class="el-icon-info"></i>
                                    <a>点击此处查看</a>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="find content">
                                <p class="title">项目相关内容公示</p>
                                <p class="info">
                                    各项目答辩时间，地点，经费报销，成绩公布
                                </p>
                                <div class="more">
                                    <i class="el-icon-info"></i>
                                    <a>点击此处查看</a>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-main>
        </el-container>
        <LoginModal :RegModalPop.sync="RegModalPop" :LoginModalPop.sync="LoginModalPop" @update="stateChanged($event)"></LoginModal>
        <RegModal :RegModalPop.sync="RegModalPop" ></RegModal>        
    </div>
</template>

<script>
    import Header from "@/components/Header";    
    import LoginModal from "@/components/LoginModal";
    import RegModal from "@/components/RegModal";    

    export default {
        name: "login",
        data() {
            return {
                isLogin: true,
                name: '111',
                id: '',
                LoginModalPop: false,
                RegModalPop: false
            };
        },

        methods: {
            stateChanged( state ) {
                this.isLogin = state.isLogin,
                this.name = state.name,
                this.id = state.id
            },

            reg() {
                this.RegModalPop = true;
            }
        },

        components: {
            Header,
            LoginModal,
            RegModal
        },

        mounted() {
            
        }
    };
</script>

<style scoped lang="less">
    .el-container {
        font-size: 16px;
        font-family: "Microsoft YaHei";
            flex-direction: column;
    }

    .el-main {
        padding: 0px;
        .background {
            background: url("/static/image/back.jpg") no-repeat;
            width: 100%;
            height: 900px;
            background-position: center;
            background-size: cover;
            position: relative;
            padding-top: 1px;
            overflow: hidden;
        }
        .slogan {
            margin-top: 80px;
            background: url("/static/image/slogan.png") no-repeat;
            width: 980px;
            height: 200px;
            background-size: cover;
            margin: 80px auto 60px;
            animation: fadeInLeft 1.5s ease;
        }
        .reg {
            font-size: 20px;
            letter-spacing: 3px;
            animation: fadeInLeft 1.5s ease;  
            a {
                &:hover {
                    text-decoration: none;
                }
            }          
        }
        .options {
            width: 100%;
            position: absolute;
            bottom: 0;
            .el-col {
                .content {
                    height: 280px;
                    padding: 40px;
                    box-sizing: border-box;                               
                    .title {
                        font-size: 25px;
                        color: #fff;
                        font-weight: 900;
                    }
                    .info {
                        font-size: 18px;
                        color: #fff;
                        text-align: left;
                        margin-top: 30px;
                    }
                    .more {
                        font-size: 16px;
                        color: #fff;
                        margin-top: 45px;
                    }
                }
            }
            .showTask {
                background-color: rgb(24, 21, 124);
                opacity: 0;
                animation: slideInUp 1s ease forwards; 
            }
            .showMyTask {
                background-color: rgb(77, 130, 239);
                opacity: 0;
                animation: slideInUp 1s 0.2s ease forwards;                 
            }
            .signTask {
                background-color: rgb(172, 213, 161);
                opacity: 0;
                animation: slideInUp 1s 0.4s ease forwards;                                                
            }
            .find {
                background-color: #bfb348;
                opacity: 0;
                animation: slideInUp 1s 0.6s ease forwards;                                                              
            }
        }
    }
</style>