<template>
  <div><el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>评论管理</span>
  </div>
    <el-table
      :data="articles"
      style="width: 100%">
      <el-table-column
        prop="title"
        label="标题"
        width="180">
      </el-table-column>

      <el-table-column
        prop="total_comment_count"
        label="总评论数">
      </el-table-column>
       <el-table-column
        prop="fans_comment_count"
        label="粉丝评论数">
      </el-table-column>
       <el-table-column
        label="评论状态"
        width="180">
        <template slot-scope="scope">
            <el-switch
            v-model="scope.row.comment_status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="onStatusChange(scope.row)">
            </el-switch>
        </template>
      </el-table-column>
       <el-table-column
        label="操作">
        <template>
            <el-button type="primary">修改</el-button>
        </template>
      </el-table-column>
    </el-table>

    </el-card>
</div>
</template>

<script>
export default {
  name: 'CommentIndex',
  data () {
    return {
      articles: []// 文章列表
    }
  },
  created () {
    this.loadArticles()
  },
  methods: {
    loadArticles () {
      this.$axios({
        method: 'GET',
        url: '/articles',
        params: {
          response_type: 'comment'
        }
      }).then(res => {
        this.articles = res.data.data.results
      }).catch(err => {
        console.log(err, '获取数据失败')
      })
    },
    onStatusChange (article) {
      this.$axios({
        method: 'PUT',
        url: '/comments/status',
        params: {
          article_id: article.id.toString()
        },
        data: {
          // 开关组件双向绑定了 article.comment_status
          allow_comment: article.comment_status
        }
      }).then(res => {
        this.$message({
          type: 'success',
          message: `${article.comment_status ? '启用' : '失败'}成功`
        })
      }).catch(err => {
        this.$message.error(err, '操作失败')
      })
    }
  }
}
</script>

<style>

</style>
