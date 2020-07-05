<template>
  <div class="blog">
    <div class="top">bugmaker 的博客系统</div>
    <div
      class="list"
      v-for="item in blogList"
      :key="item.id"
      @click="viewDetail(item.id)"
    >
      <h4 class="title">{{ item.title }}</h4>
      <div class="flex">
        <span>作者：{{ item.author }}</span>
        <span>发表时间：{{ item.createTime }}</span>
        <span>浏览数：{{ item.view || 0 }}</span>
        <span>收藏数：{{ item.collect || 0 }}</span>
      </div>
      <div class="desc">{{ item.description || "暂无描述" }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      blogList: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      const { code, msg, data } = await this.$api.getBlogList();
      if (code != 200) return this.$message.warning(msg);
      this.blogList = data;
    },
    viewDetail(id) {
      this.$router.push(`/blog/detail/${id}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.blog {
  display: flex;
  flex-direction: column;
  padding: 30px 20px;
  box-sizing: border-box;
  min-height: 100vh;
  overflow-y: auto;
  .top {
    font-size: 20px;
    font-weight: 600;
    color: #999;
    margin-bottom: 20px;
  }
  .list {
    width: 100%;
    min-height: 100px;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 6px;
    box-shadow: 0 0 4px 4px #cecece;
    margin-bottom: 20px;
    padding: 15px 10px;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
      box-shadow: 0 0 2px 2px #cecece;
    }
    .flex {
      display: flex;
      margin: 10px 0;
      span {
        color: #666;
        font-size: 12px;
        margin-right: 20px;
      }
    }
    .desc {
      font-size: 14px;
      color: #666;
    }
  }
}
</style>
