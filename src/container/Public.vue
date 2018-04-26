<template>
    <div class="login-wrap">
        <el-container>
            <Header :LoginModalPop.sync="LoginModalPop" :isLogin.sync="isLogin" :name.sync="name"></Header>
            <el-main>
                <div class="background">
                    <el-table :data="tableData" stripe >
                        <el-table-column prop="date" align="center" label="日期" width="180">
                        </el-table-column>
                        <el-table-column prop="name" align="center" label="姓名" width="180">
                        </el-table-column>
                        <el-table-column prop="address" align="center" label="地址">
                        </el-table-column>
                    </el-table>
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
        name: "login",
        data() {
            return {
                isLogin: true,
                name: '111',
                id: '',
                LoginModalPop: false,
                RegModalPop: false,
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }]
            };
        },

        methods: {
            stateChanged(state) {
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
            background: url("/static/image/back_1.png") no-repeat;
            width: 100%;
            height: 900px;
            background-position: center;
            background-size: cover;
            position: relative;
            padding-top: 1px;
            overflow: hidden;
            // opacity: .5;
        }
        .el-table {
            color: #303133;
            width: 60%;
            margin: 60px auto;
            border: 2px solid #999;
            border-radius: 10px;
		}
    }
</style>