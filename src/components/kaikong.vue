<template>
 <div class="body">
  <div class="input"><input type="text" name="" v-model="deviceId" placeholder="请输入设备编号"></div>
  <div class="button" @click="ranture">确定开锁</div>
 </div>
</template>

<script>
import {orderQuery} from '../axios/api.js'
import {Toast} from 'mint-ui';
import {mapState} from "vuex"
export default {
    data () {
        return {
            images: "../../static/images/kaikong.png",
            deviceId:''
        }
    },
    computed:{
      ...mapState(["openId"])
    },
    methods: {
      ranture(){
        let that=this;
        // this.$router.push({path:'/mainPage'})
        // this.$store.commit('updatedev',this.deviceId)
        let params = {
            openId:sessionStorage.getItem("openId")
        };
        console.log(params);
        orderQuery(params).then(res=>{
          console.log(res)
          if(res.data.resCode==0){
            // Toast("开始下单");
            that.$store.commit('updatedev',that.deviceId)
            that.$router.push({path:'/mainPage'})
            // that.$router.push({path:'/addfinger'})
          }else{
            Toast(res.data.result)
          }
        });
      }
    },
    created () {
    },
    mounted() {
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"  scoped>
@import "../../static/reset.scss";
.body{
  width: 100%;
  height: 100%;
  background:#fff;
  // @extend .boxCenter; 
  // padding-top: 68px;
}
.input{
  width: 60%;
  outline: none;
  border:2px solid #eee;
  height: 60px;
  border-radius: 10px;
  margin:0 auto;
  margin-top: 50px;
  @extend .boxCenter;
}
input{
  outline: none;
  border:0;
  line-height: 48px;
  text-align: center;
  width:80%;
  height: 80%;
  font-size: 1.8rem
}
.button{
  width: 50%;
  height: 50px;
  position: fixed;
  bottom: 160px;
  left: 25%;
  @extend .boxCenter;
  color: #fff;
  font-size: 1.6rem;
  background: #4eb55a;
  border-radius: 10px;
}
</style>
