<template>
    <div class="login-wrap">
        <el-container>
            <Header :LoginModalPop.sync="LoginModalPop" :isLogin.sync="isLogin" :name.sync="name"></Header>
            <el-main>
                <div class="background">
                    <el-table :data="tableData" header-row-class-name="thead" >
                        <el-table-column prop="id" align="center" label="编号" width="60">
                        </el-table-column>
                        <el-table-column prop="type" align="center" label="类型" width="60">
                        </el-table-column>
                        <el-table-column prop="team_name" align="center" label="团队名称">
                        </el-table-column>
                        <el-table-column prop="task_full_name" align="center" label="课题全称">
                        </el-table-column>
                        <el-table-column prop="task_num" align="center" label="团队人数" width="80">
                        </el-table-column>
                        <el-table-column prop="task_time" align="center" label="项目时间" width="100">
                        </el-table-column>
                        <el-table-column prop="task_place" align="center" label="项目地点" width="100">
                        </el-table-column>
                        <el-table-column prop="task_state" align="center" label="项目状态" width="80">
                        </el-table-column>
                        <el-table-column prop="reward_state" align="center" label="奖项审批" width="80">
                        </el-table-column>
                        <el-table-column prop="grade" align="center" label="成绩" width="80">
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
        name: "Public",
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

            this.axios.get(apiHost + "task")
            .then(function(res) {
                res = res.data;
                if ( res.status ) {
                    self.tableData = res.data;
                }
            })
            .catch(function(err){
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
            overflow: hidden;
            // opacity: .5;
        }
        .el-table {
            color: #303133;
            width: 90%;
            margin: 60px auto;
            border: 2px solid #999;
            border-radius: 10px;
            .thead {
                background-color: #edfffe;
            }
		}
    }
</style>