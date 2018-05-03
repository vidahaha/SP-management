<template>
    <div class="login-wrap">
        <el-container>
            <Header :LoginModalPop.sync="LoginModalPop" :isLogin.sync="isLogin" :name.sync="name"></Header>
            <el-main>
                <div class="background">
                    <h1>#申请列表</h1>
                    <el-table :data="tableNoCheckData" header-row-class-name="thead">
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
                        <el-table-column  align="center" label="操作" width="200">
                            <template slot-scope="scope">
                                <el-button type="primary" @click="agree(scope.row.id.slice(3))">批准</el-button>
                                <el-button type="danger" @click="deleteItem(scope.row.id.slice(3))">删除</el-button>                                
                            </template>
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
        name: "Check",
        data() {
            return {
                isLogin: false,
                name: '',
                id: '',
                listIndex: 0,
                LoginModalPop: false,
                RegModalPop: false,
                tableData: []
            };
        },

        computed: {
            tableNoCheckData() {
                let data = [];
                this.tableData.forEach(function(val){
                    if ( val.task_state == '待审批' ) {
                        data.push( val );
                    }
                });

                return data;
            }
        },

        methods: {
            stateChanged(state) {
                this.isLogin = state.isLogin;
                this.name = state.name;
                this.id = state.id;
            },

            getTask() {
                let self = this;
                this.axios.get(apiHost+"task")
                .then(function(res) {
                    res = res.data;
                    if ( res.status ) {
                        self.tableData = res.data;
                    }
                })
                .catch(function(err){
                    console.log(err);                
                });
            },

            reg() {
                this.RegModalPop = true;
            },

            agree( index ) {
                let self = this;
                this.axios
                .post(apiHost + "check", {
                    id: index,
                    action: 1,
                }).then(function(res){
                    res = res.data;
                    self.$message({
                        type: 'success',
                        message: res.msg,
                    });
                    self.getTask();
                }).catch(function(err){
                    alert(err);
                });
            },

            deleteItem( index ) {
                let self = this;                
                this.$confirm('此操作将永久删除该申请记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.axios
                    .post(apiHost + "check", {
                        id: index,
                        action: 0,
                    }).then(function(res){
                        res = res.data;
                        self.$message({
                            type: 'success',
                            message: res.msg,
                        });
                        self.getTask();
                    }).catch(function(err){
                        alert(err);
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
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
            this.getTask();
        }
    };
</script>

<style scoped lang="less">
    .el-container {
        font-size: 16px;
        font-family: "Microsoft YaHei";
        flex-direction: column;
    }

    h1 {
        margin-top: 30px;
        margin-bottom: -30px;
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