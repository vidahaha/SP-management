<template>
    <div class="login-wrap">
        <el-container>
            <Header :LoginModalPop.sync="LoginModalPop" :isLogin.sync="isLogin" :name.sync="name"></Header>
            <el-main>
                <div class="background">
                    <p>#实践报告上传</p>
                    <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple >
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或
                            <em>点击上传</em>
                        </div>
                        <div class="el-upload__tip" slot="tip">只能上传文档文件</div>
                    </el-upload>
                </div>
            </el-main>
        </el-container>
        <LoginModal :RegModalPop.sync="RegModalPop" :LoginModalPop.sync="LoginModalPop" @update="stateChanged($event)"></LoginModal>
        <RegModal :RegModalPop.sync="RegModalPop"></RegModal>
    </div>
</template>

<script>
    import Header from "@/components/Header";
    import LoginModal from "@/components/LoginModal";
    import RegModal from "@/components/RegModal";

    export default {
        name: "Submit",
        data() {
            return {
                isLogin: false,
                name: '',
                id: '',
                LoginModalPop: false,
                RegModalPop: false,
                tableData: []
            };
        },

        methods: {
            stateChanged(state) {
                this.isLogin = state.isLogin;
                this.name = state.name;
                this.id = state.id;
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

            self = this;

            this.axios.get("http://localhost:7001/task")
                .then(function(res) {
                    res = res.data;
                    if (res.status) {
                        self.tableData = res.data;
                    }
                })
                .catch(function(err) {
                    console.log(err);
                });
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
            background: url("/static/image/back_1.png") no-repeat;
            width: 100%;
            height: 900px;
            background-position: center;
            background-size: cover;
            position: relative;
            padding-top: 1px;
            overflow: hidden; // opacity: .5;
            p {
                font-size: 21px;
                margin-top: 75px;
                font-weight: bold;
            }
        }
        .upload-demo {
            color: #303133;
            width: 500px;
            padding: 30px;
            margin: 60px auto;
            border: 2px solid #999;
            background: rgba(253, 253, 253, 0.53);
            border-radius: 10px;
        }
    }
</style>