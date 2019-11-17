<template>
  <div class="article">
<!-- 筛选数据 -->
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>全部图文</span>
  </div>
   <el-form ref="form"  label-width="80px">
  <el-form-item label="文章状态">
    <!--
      单选框组会把选中的 radio 的 label 同步给绑定的数据
     -->
     <el-radio-group v-model="fileForm.status">
       <!-- 接口要求 不穿为全部 -->
      <el-radio :label="null" >全部</el-radio>
      <el-radio label="0" >草稿</el-radio>
      <el-radio label="1" >待审核</el-radio>
      <el-radio label="2" >审核通过</el-radio>
      <el-radio label="3" >审核失败</el-radio>
      <el-radio label="4" >已删除</el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="频道列表">
    <!--
      下拉列表会把选中的 option 的 value 同步到数据中
     -->
    <el-select placeholder="请选择" v-model="fileForm.channel_id">
      <el-option
      :label="channel.name"
      :value="channel.id"
      v-for="channel in channels"
      :key='channel.id'
      ></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="时间选择">
   <el-date-picker
      v-model="rangeDate"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>

  </el-form-item>

  <el-form-item>
    <!-- 点击查询按钮 重新发送请求 -->
    <el-button type="primary" @click="loadArticles(1)">查询</el-button>
  </el-form-item>
  </el-form>
</el-card>
<!-- /筛选数据 -->

<!-- 文章列表 -->
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>共找到{{totalCount}}条符合条件的内容</span>
    </div>
    <el-table
      :data="articles"
      style="width: 100%"
      v-loading='loading'>
      <el-table-column
        prop="date"
        label="封面"
        width="180">
        <!-- 自定义表格列 -->
        <template slot-scope="scope">
          <img width="50" :src="scope.row.cover .images[0]" alt="">
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        width="180">
      </el-table-column>
      <el-table-column
        prop="status"
        label="发布状态">
        <template slot-scope="scope">
        <!-- <span>{{ articleStatus[scope.row.status].label }}</span> -->
          <el-tag
          :type='articleStatus[scope.row.status].type'
          >{{ articleStatus[scope.row.status].label }}</el-tag>
        </template>
      </el-table-column>
       <el-table-column
        prop="pubdate"
        label="发布日期">
      </el-table-column>
       <el-table-column
        prop="address"
        label="操作">
        <template>
          <el-button type="danger" size="mini">删除</el-button>
          <el-button type="primary" size="mini">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
<!-- /文章列表 -->

<!-- 分页 -->
<!-- layout 控制布局 -->
<el-pagination
  background
  layout="prev, pager, next"
  :total="totalCount"
  @current-change="onPageChange">
</el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Article',
  data () {
    return {
      fileForm: {
        status: null,
        channel_id: '',
        begin_pubdate: '',
        end_pubdate: ''
      },
      rangeDate: '',
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
      }],
      articles: [],
      articleStatus: [
        {
          type: 'success',
          label: '草稿'
        }, {
          type: 'info',
          label: '待审核'
        }, {
          type: '',
          label: '审核通过'
        }, {
          type: 'warning',
          label: '审核失败'
        }, {
          type: 'danger',
          label: '已删除'
        }
      ],
      totalCount: 0, // 总记录数
      loading: true, // 表格的 loading 状态
      channels: []// 频道
    }
  },
  created () {
    this.loadArticles(1)
    this.loadChannels()
  },
  methods: {
    loadArticles (page = 1) {
      this.loading = true
      const token = window.localStorage.getItem('user-token')
      this.$axios({
        method: 'GET',
        url: '/articles',
        headers: {
          Authorization: `Bearer ${token}`
        },
        // query 参数使用 params 传递
        params: {
          page,
          per_page: 10,
          // axios 有个功能  当参数值为null的 时候 不传递
          status: this.fileForm.status // 文章状态
          // channel_id, // 频道id
          // begin_pubdate, // 开始时间
          // end_pubdate// 结束时间
        }
      }).then(res => {
        // 更新文章列表
        this.articles = res.data.data.results
        // 更新总记录数
        this.totalCount = res.data.data.total_count
      }).catch(err => {
        console.log(err, '获取数据失败')
      }).finally(() => {
        this.loading = false
      })
    },

    onPageChange (page) {
      this.loadArticles(page)
    },
    loadChannels () {
      this.$axios({
        method: 'GET',
        url: '/channels'
      }).then(res => {
        this.channels = res.data.data.channels
      }).catch(err => {
        console.log(err, '获取数据失败')
      })
    }
  }

}
</script>

<style>

</style>
