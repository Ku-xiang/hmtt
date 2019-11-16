<template>
  <div class="article">
<!-- 筛选数据 -->
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>全部图文</span>
  </div>
   <el-form ref="form"  label-width="80px">
  <el-form-item label="文章状态">
     <el-radio-group v-model="fileForm.status">
      <el-radio label="全部" ></el-radio>
      <el-radio label="草稿" ></el-radio>
      <el-radio label="待审核" ></el-radio>
      <el-radio label="审核通过" ></el-radio>
      <el-radio label="审核失败" ></el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="频道列表">
    <el-select placeholder="请选择" v-model="fileForm.channel_id">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
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
    <el-button type="primary" @click="onSubmit">查询</el-button>
  </el-form-item>
</el-form>
</el-card>
<!-- 筛选数据 -->

  </div>
</template>

<script>
export default {
  data () {
    return {
      fileForm: {
        status: '',
        channel_id: '',
        begin_pubdate: '',
        end_pubdate: ''
      },
      rangeDate: ''
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>

<style>

</style>
