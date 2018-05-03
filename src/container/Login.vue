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
                            <div class="showMyTask content" v-if="isAdmin">
                                <p class="title">审批项目</p>
                                <p class="info">
                                    查看项目列表，批准项目开展
                                </p>
                                <div class="more">
                                    <i class="el-icon-info"></i>
                                    <router-link to="/check">点击此处审批</router-link>
                                </div>
                            </div>
                            <div class="showMyTask content" v-else>
                                <p class="title">申请项目</p>
                                <p class="info">
                                    选择项目类别，填写申请表格和相关信息
                                </p>
                                <div class="more">
                                    <i class="el-icon-info"></i>
                                    <router-link to="/apply" v-if="isLogin">点击此处申请</router-link>
                                    <a @click="login" v-else>点击此处申请</a>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="signTask content" v-if="isAdmin">
                                <p class="title">成绩批改</p>
                                <p class="info">
                                    查看项目列表，批改项目成绩
                                </p>
                                <div class="more">
                                    <i class="el-icon-info"></i>
                                    <router-link to="/grade">点击此处审批</router-link>
                                </div>
                            </div>
                            <div class="signTask content" v-else>
                                <p class="title">提交实践报告</p>
                                <p class="info">
                                    上传实践报告，由老师进行打分
                                </p>
                                <div class="more">
                                    <i class="el-icon-info"></i>
                                    <router-link to="/submit" v-if="isLogin">点击此处提交</router-link>
                                    <a @click="login" v-else>点击此处提交</a>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="find content" v-if="isAdmin"> 
                                <p class="title">审批奖项</p>
                                <p class="info">
                                    查看申请列表，批准奖项申请
                                </p>
                                <div class="more">
                                    <i class="el-icon-info"></i>
                                    <router-link to="/approve">点击此处审批</router-link>
                                </div>
                            </div>
                            <div class="find content" v-else>
                                <p class="title">奖项申请</p>
                                <p class="info">
                                    上传奖项申请报告，由老师进行批准
                                </p>
                                <div class="more">
                                    <i class="el-icon-info"></i>
                                    <router-link to="/award" v-if="isLogin">点击此处申请</router-link>
                                    <a @click="login" v-else>点击此处申请</a>
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
        name: "Login",
        data() {
            return {
                isLogin: false,
                name: '',
                id: '',
                type: 0,
                LoginModalPop: false,
                RegModalPop: false
            };
        },

        computed: {
            isAdmin() {
               return this.type == '老师' ? true : false;
            }
        },

        watch: {
            isLogin:function(val) {
               sessionStorage.isLogin = val; 
            },
            name:function(val) {
               sessionStorage.name = val; 
            },
            id:function(val) {
               sessionStorage.id = val; 
            },
            type:function(val) {
               sessionStorage.type = val; 
            }
        },

        methods: {
            stateChanged( state ) { 
                this.isLogin = state.isLogin;
                this.name = state.name;
                this.id = state.id;
                this.type = state.type;               
            },

            login() {
                this.LoginModalPop = true;
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
            this.isLogin = sessionStorage.isLogin || false;
            this.name = sessionStorage.name || '';
            this.id = sessionStorage.id || '';
            this.type = sessionStorage.type || 0; 
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
                        text-align: center;
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