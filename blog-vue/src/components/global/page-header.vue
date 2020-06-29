<template>
  <div class="header">
    <div class="header-container flex-row-between">
      <img class="logo" src="../../assets/images/logo.png" />
      <div class="menu flex-row">
        <div class="links flex-row">
          <router-link
            v-for="link in links"
            :class="['link', { active: current == link.href }]"
            :key="link.title"
            :to="link.href"
          >
            <i :class="link.icon"></i>
            <span>{{ link.title }}</span>
          </router-link>
        </div>
        <el-input
          class="input"
          @focus="focus = true"
          @blur="focus = false"
          :style="{ width: focus ? '300px' : '200px' }"
          placeholder="搜索"
          prefix-icon="el-icon-search"
          v-model="searchVal"
        />
      </div>
      <div class="user">
        <el-button size="small" type="text" icon="el-icon-edit" circle />
        <el-button size="small" type="text" icon="el-icon-setting" circle />
        <img class="avatar" src="../../assets/images/avatar.png" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      focus: false,
      searchVal: null,
      links: [
        { icon: "el-icon-guide", href: "/home", title: "首页" },
        { icon: "el-icon-document", href: "/blog", title: "列表" },
        { icon: "el-icon-chat-dot-square", href: "/message", title: "消息" }
      ]
    };
  },
  computed: {
    current() {
      console.log(this.$route.path.split("/")[1]);
      return this.$route.path || "/home";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/variable.scss";

.header::v-deep {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  z-index: 100;
  .header-container {
    max-width: 1440px;
    min-width: 1200px;
    height: 56px;
    margin: 0 auto;
    .logo {
      height: 36px;
      margin-right: 150px;
    }
    .menu {
      flex: 1;
      height: 36px;
      .links {
        line-height: 36px;
        font-size: 17px;
        color: #333;
        .link {
          margin-right: 20px;
          i {
            margin-right: 5px;
          }
          &.active {
            color: $themeColor;
          }
        }
      }
      .input {
        transition: all ease-in-out 0.5s;
      }
      input {
        height: 36px;
        border-radius: 20px;
      }
      .el-input__icon {
        line-height: 36px;
      }
    }
    .user {
      display: flex;
      align-items: center;
      .avatar {
        width: 40px;
        height: 40px;
        margin-left: 10px;
      }
      .el-button {
        font-size: 20px;
      }
    }
  }
}
</style>
