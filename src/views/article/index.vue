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
    <!-- <el-select placeholder="请选择" v-model="fileForm.channel_id">
      <el-option label="所有频道" :value="null"></el-option>
      <el-option
      :label="channel.name"
      :value="channel.id"
      v-for="channel in channels"
      :key='channel.id'
      ></el-option>
    </el-select> -->
    <channel-select v-model="fileForm.channel_id"></channel-select>
  </el-form-item>
  <el-form-item label="时间选择">
   <el-date-picker
      v-model="rangeDate"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      value-format="yyyy-MM-dd">
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
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="onDelete(scope.row.id)">删除</el-button>
          <el-button type="primary" size="mini" @click="$router.push('/publish/' + scope.row.id)">编辑</el-button>
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
import ChannelSelect from '../../components/chnnel-select'
export default {
  name: 'Article',
  components: {
    ChannelSelect
  },
  data () {
    return {
      fileForm: {
        status: null,
        channel_id: null
        // begin_pubdate: '',
        // end_pubdate: ''
      },
      rangeDate: [], // 日期范围
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
      // channels: [], // 频道
      page: 1
    }
  },
  created () {
    this.loadArticles(1)
    // this.loadChannels()
  },
  methods: {
    loadArticles (page = 1) {
      this.loading = true
      // const token = window.localStorage.getItem('user-token')
      this.$axios({
        method: 'GET',
        url: '/articles',
        // headers: {
        //   Authorization: `Bearer ${token}`
        // },
        // query 参数使用 params 传递
        params: {
          page,
          per_page: 10,
          // axios 有个功能  当参数值为 null undefined 的 时候 不传递
          status: this.fileForm.status, // 文章状态
          channel_id: this.fileForm.channel_id, // 频道id
          begin_pubdate: this.rangeDate ? this.rangeDate[0] : null, // 开始时间
          end_pubdate: this.rangeDate ? this.rangeDate[1] : null// 结束时间
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
    // 该函数是分页组件的 current-change 事件处理函数
    // 该函数不是我们调用的 我们只是写了里面的业务代码
    // current-change 事件：当页码改变的时候，分页组件会调用这个方法
    // 分页组件在调用的时候，会把当前页码传递给这个方法
    // 我们这里要做的就是声明一个参数接收使用即可
    onPageChange (page) {
      // 记录当前最新页码
      this.page = page
      // 请求加载指定页码的文章列表
      this.loadArticles(page)
    },
    // loadChannels () {
    //   this.$axios({
    //     method: 'GET',
    //     url: '/channels'
    //   }).then(res => {
    //     this.channels = res.data.data.channels
    //   }).catch(err => {
    //     console.log(err, '获取数据失败')
    //   })
    // },
    onDelete (articleId) {
      this.$axios({
        method: 'DELETE',
        url: `/articles/${articleId}`
        // headers: {
        //   Authorization: `Bearer ${window.localStorage.getItem('user-token')}`
        // }
      }).then(res => {
        // 删除成功，重新加载当前文章列表
        this.loadArticles(this.page)
      }).catch(err => {
        console.log(err, '删除失败')
      })
    }
  }

}
</script>

<style>

</style>
