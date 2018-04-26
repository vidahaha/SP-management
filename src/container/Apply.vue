<template>
    <div class="login-wrap">
        <el-container>
            <Header :LoginModalPop.sync="LoginModalPop" :isLogin.sync="isLogin" :name.sync="name"></Header>
            <el-main>
                <div class="background">
                    <el-form ref="form" :model="form" label-width="80px">
                        <el-form-item label="活动名称">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="活动区域">
                            <el-select v-model="form.region" placeholder="请选择活动区域">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="活动时间">
                            <el-col :span="11">
                                <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                            </el-col>
                            <el-col class="line" :span="2">-</el-col>
                            <el-col :span="11">
                                <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="即时配送">
                            <el-switch v-model="form.delivery"></el-switch>
                        </el-form-item>
                        <el-form-item label="活动性质">
                            <el-checkbox-group v-model="form.type">
                                <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                                <el-checkbox label="地推活动" name="type"></el-checkbox>
                                <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                                <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item label="特殊资源">
                            <el-radio-group v-model="form.resource">
                                <el-radio label="线上品牌商赞助"></el-radio>
                                <el-radio label="线下场地免费"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="活动形式">
                            <el-input type="textarea" v-model="form.desc"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">立即创建</el-button>
                            <el-button>取消</el-button>
                        </el-form-item>
                    </el-form>
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
        name: "Apply",
        data() {
            return {
                isLogin: false,
                name: '',
                id: '',
                LoginModalPop: false,
                RegModalPop: false,
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                }
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
            },

            onSubmit() {
                console.log('submit!');
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