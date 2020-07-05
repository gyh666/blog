<template>
  <div class="home flex-row">
    <div class="container-left">
      <div class="banner">
        <img class="banner-pic" src="../assets/images/banner.jpg" />
      </div>
      <div
        class="list"
        v-for="blog in blogList"
        :key="blog.id"
        @click="viewDetail(blog.id)"
      >
        <div class="list-left">
          <h4 class="text-ellipsis">{{ blog.title }}</h4>
          <p class="desc ">{{ blog.description || 1111 }}</p>
          <p class="info">
            <span>{{ blog.author }}</span>
            <span><i class="el-icon-view"></i>{{ blog.view || 0 }}</span>
            <span>
              <i class="el-icon-chat-dot-square"></i>{{ blog.comment || 0 }}
            </span>
          </p>
        </div>
        <img class="list-right" :src="blog.pic || defaultPic" />
      </div>
      <router-link class="more" to="/blog">查看更多</router-link>
    </div>
    <div class="container-right">
      <div class="recommend">
        <div class="recommend-top flex-row-between">
          <span>推荐作者</span>
          <span>
            <i class="el-icon-refresh"></i>
            换一批
          </span>
        </div>
        <div class="recommend-list" v-for="i in 5" :key="i">
          <img class="avatar" src="../assets/images/avatar.png" />
          <div class="content">
            <p class="text-ellipsis">张三</p>
            <p>总共5篇文章 · 4k喜欢</p>
          </div>
          <el-button class="btn" icon="el-icon-plus">关注</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      defaultPic: require("../assets/images/default.png"),
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
.home {
  .banner {
    width: 100%;
    margin-bottom: 35px;
    .banner-pic {
      width: 100%;
      border-radius: 10px;
      box-shadow: 0 0 1px #999;
      cursor: pointer;
    }
  }
  .list {
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #eee;
    .list-left {
      flex: 1;
      h4 {
        font-size: 18px;
        font-weight: 700;
        color: #333;
        line-height: 1.5;
        margin-bottom: 4px;
        &:hover {
          text-decoration: underline;
        }
      }
      .desc {
        font-size: 13px;
        height: 48px;
        line-height: 24px;
        margin-bottom: 8px;
        color: #999;
      }
      .info {
        font-size: 12px;
        color: #999;
        line-height: 20px;
        span {
          margin-right: 20px;
          i {
            margin-right: 3px;
          }
        }
      }
    }
    .list-right {
      width: 100px;
      height: 100px;
      margin-left: 50px;
    }
  }
  .more {
    display: block;
    width: 100%;
    background-color: #999;
    color: #fff;
    border-radius: 20px;
    line-height: 40px;
    font-size: 15px;
    text-align: center;
    cursor: pointer;
  }
  .recommend {
    .recommend-top {
      font-size: 14px;
      color: #999;
      line-height: 24px;
    }
    .recommend-list {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      .avatar {
        width: 48px;
        height: 48px;
        border-radius: 50%;
      }
      .content {
        flex: 1;
        margin: 10px;
        line-height: 20px;
      }
      .btn {
        width: 60px;
        padding: 0;
        height: 30px;
        line-height: 30px;
      }
    }
  }
}
</style>
