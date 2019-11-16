<template>
  <!-- 头部组件 -->

  <el-row type="flex" justify="space-between" align="middle">
      <!-- 左侧 -->
      <el-col :span='6' class="left">
          <i class="el-icon-s-fold"></i>
          <span>江苏传智博客教育科技有限公司</span>
      </el-col>
      <!-- 右侧 -->
      <el-col :span="3" class="right">
          <!-- 头像 -->
          <img src="../assets/微信图片_20190806213013.jpg" alt="">
          <!-- 下拉菜单 -->
          <el-dropdown trigger="click">
              <span >A.枯巷</span>
              <el-dropdown-menu solot="dropdown">
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>git地址</el-dropdown-item>
              <el-dropdown-item @click.native="onLogout">退出</el-dropdown-item>
              </el-dropdown-menu>
          </el-dropdown>
      </el-col>
  </el-row>
</template>

<script>
export default {
  methods: {
    onLogout () {
      this.$confirm('确认退出吗？', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.localStorage.removeItem('user-token')
        this.$router.push('/login')
        this.$message({
          type: 'success',
          message: '退出成功！'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }

}
</script>

<style lang="less" scoped>
    .left{
        i{
            font-size: 24px;
        }
        span {
            vertical-align: top;
        }
    }
    .right {
        display: flex;
        align-items: center;
        img {
            height: 50px;
            border-radius: 50%;
            margin-right: 10px;
        }
    }
</style>
