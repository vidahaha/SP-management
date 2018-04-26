<template>
    <transition name="RegModal">
        <div class="modal-wrap" v-if="RegModalPop">
            <div class="mask" @click="close"></div>
            <el-form class="content" :modal="form" label-width="80px" label-suffix=":">
                <i class="close el-icon-close" @click="close"></i>
                <el-form-item label="身份">
                    <el-radio-group v-model="form.type" size="medium">
                        <el-radio border label="学生"></el-radio>
                        <el-radio border label="老师"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input placeholder="请输入姓名" prefix-icon="el-icon-star-off" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="学号/工号">
                    <el-input placeholder="请输入学号/工号" prefix-icon="el-icon-star-off" v-model="form.id"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input placeholder="请输入密码" prefix-icon="el-icon-star-off" v-model="form.password" type="password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码">
                    <el-input placeholder="请确认密码" prefix-icon="el-icon-star-off" v-model="form.repassword" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">立即注册</el-button>
                    <el-button @click="close">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "RegModal",
        props:['RegModalPop'],
        data() {
            return {
                form: {
                    type: 0, // 0学生1老师
                    name: '',
                    id: '',
                    password: ''
                }
            };
        },

        methods: {
            close () {
                this.$emit("update:RegModalPop", false)
            },
            onSubmit () {
                let self = this;
                let {type, name, id, password, repassword}  = this.form;

                type == '学生' ? type = 0 : type = 1;

                if ( name == '' || id == '' || password == ''  ) {
                    alert("请填写完整");
                    return false;
                }

                if ( password !== repassword ) {
                    alert("两次密码不一致");
                    return false;
                }

                if ( name.length > 4 || password.length < 5 ) {
                    alert("名字过长或密码过弱");
                    return false;
                }

                this.axios
                .post("http://localhost:7001/reg", {
                    type,
                    name,
                    id,
                    password
                })
                .then(function(res) {
                    res = res.data;
                    if (res.status) {

                        self.$emit("update", {
                            isLogin: true,
                            name: self.form.name,
                            id: self.form.id,
                            type: self.form.type
                        });   

                        alert(res.msg);

                        self.$emit("update:regModalPop", false)   
                              
                    } else {
                        alert(res.msg);
                        return false;
                    }
                })
                .catch(function(err) {
                    console.log(err);
                });
            }
        }
    };
</script>

<style scoped lang="less">
    .LoginModal-enter-active,
    .LoginModal-leave-active {
        transition: opacity 0.5s;
    }

    .LoginModal-enter,
    .LoginModal-leave-to {
        opacity: 0;
    }

    .modal-wrap {
        width: 100%;
    }

    .mask {
        position: absolute;
        height: 100%;
        background: #303133;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        opacity: 0.8;
    }

    .content {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff;
        width: 500px;
        height: 420px;
        border: 1px solid #666;
        border-radius: 20px;
        padding: 30px;
        box-sizing: border-box;
        .close {
            position: absolute;
            font-size: 36px;
            right: 10px;
            top: 10px;
            cursor: pointer;
            &:hover {
                animation: rotateIn 1s ease forwards;
                color: #627d97;
            }
        }
        .el-form-item {
            text-align: left;
            margin-top: 10px;
            .el-input {}
        }
    }
</style>