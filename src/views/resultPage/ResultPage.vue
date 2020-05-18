<template>
  <div class="router-body result-page">
    <div class="router-body-inner">
      <div class="hidden-nav">
        <iframe id="iframe" class="iframe" :src="board_url" frameborder="0"></iframe>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ResultPage',
  watch: {
    '$route' (n, o) {
      console.log(this.$route);
      this.board_url = 'http://192.168.190.18:8080/#/history';
    }
  },
  data () {
    return {
      board_url: 'http://192.168.190.18:8080/#/history'
    };
  },
  created () {
    if (this.$route.query.redirect) {
      this.board_url = localStorage.getItem('board_url');
    }
  }
};

</script>

<style lang="less">
.result-page {
  .hidden-nav {
    position: relative;
    width: 100%;
    height: 1280px;
    overflow: hidden;
  }
  .iframe {
    position: absolute;
    top: -58px;
    left: -180px;
    width: 117%;
    height: 120%;
  }
}
</style>
