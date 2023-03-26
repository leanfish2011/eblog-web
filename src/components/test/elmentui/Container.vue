<template>
  <div>
    <div class="wrapper">
      <manage-header></manage-header>
      <manage-aside></manage-aside>
      <div class="content-box" :class="{'content-collapse':collapse}">
        <div class="content_wrapper">
          <div class="content" style="flex:1;">
            <div class="content_inner">
              <template>
                <router-view/>
              </template>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import Service from '../../../config/service'
  import AuthUtil from '../../../utils/authUtil'
  import ManageHeader from '../../manage/Header'
  import ManageAside from '../../manage/Aside'

  export default {
    name: 'Container',
    data() {
      return {
        collapse: false
      }
    },
    components: {
      "manageHeader": ManageHeader,
      "manageAside": ManageAside,
    },
    methods: {
      authCheck() {
        this.$axios.get(Service.authUrl.authCheck, {
          headers: {
            'Authorization': localStorage.getItem('token')
          }
        }).then((res) => {
          if (res.status === 200) {
            let responseData = res.data;
            let code = responseData.code;
            if (code === -1 || code === -2) {
              this.$message.error(responseData.msg);
              AuthUtil.clearSession();

              this.$router.push('/login');
            }
          } else {
            this.$message.error("系统内部错误");
          }
        }).catch(function (error) {
          console.error(error);
        });
      },
    },
    created() {
      this.authCheck();
    }
  }
</script>

<style scoped>
  .content_wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .content_inner {
    height: 100%;
  }

</style>
