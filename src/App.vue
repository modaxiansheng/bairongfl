<template>
  <Layout header-title="联邦学习" show-full-screen>
    <div slot="userContent" class="user-dropdown-menu-con">
      <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
        <Avatar icon="md-person" style="background: #619fe7;margin-left:10px;"></Avatar>
        <a href="javascript:void(0)">
          <span class="main-user-name">光大演示账号</span>
        </a>
      </Row>
    </div>
  </Layout>
</template>

<script>
import Jax from '@bairong/jax';
const { Layout } = Jax;

export default {
  name: 'App',
  components: {
    Layout
  }
};

</script>
