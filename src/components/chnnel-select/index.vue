<template>
  <div class="channel-select">
       <el-select placeholder="请选择频道" :value="value" @input="onInput">
      <el-option
      :label="channel.name"
      :value="channel.id"
      v-for="channel in channels"
      :key='channel.id'
      ></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'ChannelSelect',
  props: {
    value: {
      type: [String, Number],
      require: true
    }
  },
  data () {
    return {
      channels: []
    }
  },
  created () {
    this.loadChannels()
  },
  methods: {
    loadChannels () {
      this.$axios({
        method: 'GET',
        url: '/channels'
      }).then(res => {
        this.channels = res.data.data.channels
      }).catch(err => {
        console.log(err, '获取数据失败')
      })
    },
    onInput (data) {
      this.$emit('input', data)
    }
  }
}
</script>

<style>

</style>
