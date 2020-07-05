<template>
  <div class="detail">
    <div class="title">{{ info.title }}</div>
    <div class="author">--{{ info.author }}</div>
    <div class="info">
      <span>{{ info.createTime }}</span>
      <span>{{ info.view || 0 }}</span>
      <span>{{ info.collect || 0 }}</span>
    </div>
    <div class="content" v-html="info.content"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: null,
      info: {}
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getDetail();
  },
  methods: {
    async getDetail() {
      const { code, msg, data } = await this.$api.getBlogDetail({
        id: this.id
      });
      if (code != 200) return this.$message.warning(msg);
      this.info = data;
      console.log(this.info);
    }
  }
};
</script>

<style lang="scss" scoped>
.detail {
  font-size: 14px;
  color: #333;
  padding: 30px 20px;
  .title {
    font-size: 24px;
    color: #121212;
    text-align: center;
  }
  .author {
    text-align: right;
  }
  .info {
    text-align: center;
    color: #999;
    margin-bottom: 30px;
    span {
      margin-right: 20px;
    }
  }
  .content {
    color: #666;
    text-indent: 2em;
  }
}
</style>
