<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="用户名（登录/展示用，唯一）" prop="username">
      <el-input v-model="dataForm.username" placeholder="用户名（登录/展示用，唯一）"></el-input>
    </el-form-item>
    <el-form-item label="密码（密文存储，如BCrypt/SHA256加密）" prop="password">
      <el-input v-model="dataForm.password" placeholder="密码（密文存储，如BCrypt/SHA256加密）"></el-input>
    </el-form-item>
    <el-form-item label="创建时间（注册时间）" prop="createTime">
      <el-input v-model="dataForm.createTime" placeholder="创建时间（注册时间）"></el-input>
    </el-form-item>
    <el-form-item label="更新时间（自动刷新）" prop="updateTime">
      <el-input v-model="dataForm.updateTime" placeholder="更新时间（自动刷新）"></el-input>
    </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          id: 0,
          username: '',
          password: '',
          createTime: '',
          updateTime: ''
        },
        dataRule: {
          username: [
            { required: true, message: '用户名（登录/展示用，唯一）不能为空', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '密码（密文存储，如BCrypt/SHA256加密）不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '创建时间（注册时间）不能为空', trigger: 'blur' }
          ],
          updateTime: [
            { required: true, message: '更新时间（自动刷新）不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/xiaoY/user/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.username = data.user.username
                this.dataForm.password = data.user.password
                this.dataForm.createTime = data.user.createTime
                this.dataForm.updateTime = data.user.updateTime
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/xiaoY/user/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'username': this.dataForm.username,
                'password': this.dataForm.password,
                'createTime': this.dataForm.createTime,
                'updateTime': this.dataForm.updateTime
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      }
    }
  }
</script>
