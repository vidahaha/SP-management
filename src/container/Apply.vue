<template>
    <div class="login-wrap">
        <el-container>
            <Header :LoginModalPop.sync="LoginModalPop" :isLogin.sync="isLogin" :name.sync="name"></Header>
            <el-main>
                <div class="background apply">
                    <el-form ref="form" :model="form" label-width="80px" align="left" label-suffix=":">
                        <p>#团队活动概况</p>
                        <el-form-item label="项目类型">
                            <el-radio-group v-model="form.type">
                                <el-radio border label="校级"></el-radio>
                                <el-radio border label="院级"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="主题">
                            <el-input type="input" v-model="form.task_full_name"></el-input>
                        </el-form-item>
                        <el-form-item label="时间" class="short">
                            <el-input type="input" v-model="form.task_time"></el-input>
                        </el-form-item>
                        <el-form-item label="地点" class="short">
                            <el-input type="input" v-model="form.task_place"></el-input>
                        </el-form-item>
                        <el-form-item label="团队名称">
                            <el-input type="input" v-model="form.team_name"></el-input>
                        </el-form-item>
                        <el-form-item label="参与人数" class="short">
                            <el-input type="input" v-model="form.task_num"></el-input>
                        </el-form-item>
                    </el-form>
                    <el-form ref="form" :model="form" label-width="80px" align="left" label-suffix=":" size="small">
                        <p>#负责人信息</p>
                        <div class="lead">
                            <el-form-item label="姓名">
                                <el-input type="input" v-model="form.task_lead_name"></el-input>
                            </el-form-item>
                            <el-form-item label="性别">
                                <el-input type="input" v-model="form.task_lead_sex"></el-input>
                            </el-form-item>
                            <el-form-item label="政治面貌">
                                <el-input type="input" v-model="form.task_lead_party"></el-input>
                            </el-form-item>
                            <el-form-item label="学院">
                                <el-input type="input" v-model="form.task_lead_college"></el-input>
                            </el-form-item>
                            <el-form-item label="专业">
                                <el-input type="input" v-model="form.task_lead_major"></el-input>
                            </el-form-item>
                            <el-form-item label="年级">
                                <el-input type="input" v-model="form.task_lead_grade"></el-input>
                            </el-form-item>
                            <el-form-item label="联系电话">
                                <el-input type="input" v-model="form.task_lead_phone"></el-input>
                            </el-form-item>
                            <el-form-item label="邮箱">
                                <el-input type="input" v-model="form.task_lead_email"></el-input>
                            </el-form-item>
                            <el-form-item label="QQ号码">
                                <el-input type="input" v-model="form.task_lead_qq"></el-input>
                            </el-form-item>
                        </div>
                    </el-form>
                    <el-form class="memberForm" ref="form" :model="form" label-width="80px" align="left" label-suffix=":" size="small">
                        <p>#成员信息</p>
                        <div class="member" v-for="(member, index) in form.members" :key="index">
                            <el-form-item label="姓名">
                                <el-input type="input" v-model="member.task_member_name"></el-input>
                            </el-form-item>
                            <el-form-item label="学院">
                                <el-input type="input" v-model="member.task_member_college"></el-input>
                            </el-form-item>
                            <el-form-item label="专业">
                                <el-input type="input" v-model="member.task_member_major"></el-input>
                            </el-form-item>
                            <el-form-item label="年级">
                                <el-input type="input" v-model="member.task_member_grade"></el-input>
                            </el-form-item>
                            <el-form-item label="联系电话">
                                <el-input type="input" v-model="member.task_member_phone"></el-input>
                            </el-form-item>
                        </div>
                        <el-form-item>
                            <el-button type="primary" @click="addMember">新增成员</el-button>
                            <el-button type="primary" @click="removeMember" v-if="form.members.length>1">删除成员</el-button>
                        </el-form-item>
                    </el-form>
                    <el-form class="btnForm" ref="form">
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">立即申请</el-button>
                            <el-button type="warning" @click="reset">重新填写</el-button>
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
                    type: '',
                    task_full_name: '',
                    task_time: '',
                    task_place: '',
                    team_name: '',
                    task_num: 0,
                    members: [{
                        task_member_name: '',
                        task_member_college: '',
                        task_member_major: '',
                        task_member_grade: '',
                        task_member_phone: '',
                    }],
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
                let {type, task_full_name, task_time, task_place, team_name, task_num} = this.form;
                if ( type == '' 
                    || task_full_name == '' 
                    || task_time == '' 
                    || task_place == '' 
                    || team_name == '' 
                    || task_num == '' ) {
                    this.$alert('请填写完整', {
                        confirmButtonText: '确定'
                    })
                    return false;
                }

                this.axios
                .post(apiHost + 'apply', {
                    type,
                    task_full_name,
                    task_time,
                    task_place,
                    team_name,
                    task_num
                }).then(function(res){
                    res = res.data;
                    self.$message({
                        type: 'success',
                        message: res.msg,
                    });
                }).catch(function(err){
                    this.$alert(err, {
                        confirmButtonText: '确定'
                    });
                });
            },

            addMember() {
                this.form.members.push({
                    task_member_name: '',
                    task_member_college: '',
                    task_member_major: '',
                    task_member_grade: '',
                    task_member_phone: '',
                });
            },

            removeMember() {
                this.form.members.pop();
            },

            reset() {
                let self = this;
                Object.keys(this.form).forEach(key => {
                    let val = self.form[key];
                    if( val instanceof Array ) {
                        self.form[key].forEach(function( val ){
                            Object.keys(val).forEach( function(key) {
                                val[key] = '';
                            } );
                        });
                    } else {
                        self.form[key] = '';
                    }
                })
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
            background-position: center;
            background-size: cover;
            position: relative;
            padding-top: 1px;
            overflow: hidden; // opacity: .5;
        }
        .el-form {
            color: #303133;
            margin: 60px auto;
            border: 2px solid #999;
            border-radius: 10px;
            width: 70%;
            background: rgba(253, 253, 253, 0.53);
            padding: 30px;
            &.memberForm {
                width: 80%;
            }
            &.btnForm {
                width: 230px;
                padding: 10px;
                .el-form-item {
                    margin: 0;
                }
            }
            p {
                text-align: center;
                font-size: 20px;
                font-weight: bold;
                margin-bottom: 15px;
                margin-top: -10px;
            }
            .short {
                width: 200px;
                display: inline-block;
            }
            .medium {
                width: 400px;
                display: inline-block;
            }
        }
        .lead {
            display: flex;
            flex-flow: wrap;
            justify-content: space-around;
        }
        .member {
            display: flex;
            flex-flow: nowrap;
            justify-content: space-around;
        }
    }
</style>

<style lang="less">
    .apply {
        .el-input__inner {
            background: rgba(255, 255, 255, .5);
        }
        .el-form-item__label {
            font-size: 16px;
            color: #303133;
        }
    }
</style>