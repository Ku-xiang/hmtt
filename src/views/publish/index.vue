<template>
  <div class="article">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>发布文章</span>
      </div>
      <el-form ref="form" :model="article" label-width="80px">
  <el-form-item label="标题">
    <el-input v-model="article.title"></el-input>
  </el-form-item>
   <el-form-item label="内容">
     <!-- bidirectional data binding（双向数据绑定） -->
  <quill-editor v-model="article.content"
                ref="myQuillEditor"
                :options="{editorOption}"
               >
  </quill-editor>
  </el-form-item>
  <el-form-item label="频道">
   <el-select placeholder="请选择频道" v-model="article.channel_id">
      <el-option
      :label="channel.name"
      :value="channel.id"
      v-for="channel in channels"
      :key='channel.id'
      ></el-option>
    </el-select>
  </el-form-item>
  <!-- <el-form-item label="封面"> -->
    <!-- <el-radio-group v-model="form.resource">
      <el-radio label="线上品牌商赞助"></el-radio>
      <el-radio label="线下场地免费"></el-radio>
    </el-radio-group> -->
  <!-- </el-form-item> -->
  <el-form-item>
    <el-button type="primary" @click="onSubmit(false)">发表</el-button>
    <el-button @click="onSubmit(true)">存入草稿</el-button>
  </el-form-item>
</el-form>
    </el-card>
  </div>
</template>

<script>
// 加载富文本编辑器
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 核心组件
import { quillEditor } from 'vue-quill-editor'

export default {
  components: {
    // 注册局部组件
    quillEditor
  },
  name: 'publish',
  data () {
    return {
      article: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: {
          type: 0, // 封面类型
          images: []// 无图 空数组
        },
        channel_id: ''
      },
      channels: [],
      editorOption: {} // 富文本编辑器的配置
    }
  },
  created () {
    this.loadChannels()
  },
  methods: {
    onSubmit (draft) {
      this.$axios({
        method: 'POST',
        url: '/articles',
        // headers: {
        //   Authorization: `Bearer ${window.localStorage.getItem('user-token')}`
        // },
        // query 参数
        params: {
          draft
        },
        // body 参数
        data: this.article
      }).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
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
