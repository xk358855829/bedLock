<template>
  <div class="body">
    <div class="top">
      <img src="../../static/images/icon/652.png">
      <!-- <div class="phone">{{phone}}</div> -->
    </div>
    <div class="main" v-for="item in pageDate" @click="runterTo(item.url)">
      <div class="mainLeft"><img :src="item.src"></div>
      <div class="mianMid">{{item.font}}</div>
      <img src="../../static/images/icon/jiantoiu.png" class="rightSrc">
    </div>
    <div class="bottom" @click="unbind">解除绑定</div>
  </div>  
</template>

<script>
import {} from '../axios/api.js'
import {mapState} from "vuex"
import { Toast } from 'mint-ui';

export default {
  name: 'add',
  data () {
    return {
      phone:sessionStorage.getItem("phoneNumber"),
      pageDate:[{
        'src':require('../../static/images/icon/755.png'),
        'font':'我的钱包',
        'url':'addnfc'
      },{
        'src':require('../../static/images/icon/730.png'),
        'font':'我的订单',
        'url':'passWordList'
      }
      //   'src':require('../../static/images/icon/803.png'),
      //   'font':'用户协议',
      //   'url':'passWordList'
      // },{
      //   'src':require('../../static/images/icon/810.png'),
      //   'font':'用户指南',
      //   'url':'passWordList'
      // },{
      //   'src':require('../../static/images/icon/724.png'),
      //   'font':'帮助',
      //   'url':'passWordList'
      // },{
      //   'src':require('../../static/images/icon/744.png'),
      //   'font':'关于我们',
      //   'url':'passWordList'
      // },{
      //   'src':require('../../static/images/icon/738.png'),
      //   'font':'故障支持',
      //   'url':'passWordList'
      // },{
      //   'src':require('../../static/images/icon/749.png'),
      //   'font':'技术支持',
      //   'url':'passWordList'
      ]
    }
  },
  computed:{
    ...mapState(["openId"])
  },
  mounted:function () {
  },
  methods:{
    subip(){
      let data=this.addMsg;
      data.deviceId=sessionStorage.getItem("deviceId");
      ipPort(data).then(res=>{
        console.log(res);
        if(res.data.resCode ==0){
          Toast("设置成功");
        }else{
          Toast("设置失败");
        }
      })
    },
    unbind(){
      this.$router.push({path:'/add'})
    },
    runterTo(url){
      this.$router.push({path:'/'+url+''})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"  scoped>
@import "../../static/reset.scss";

.body{
  width: 100%;
  height: 100%;
  background:$mainbc;
  @extend .fontSet;
  overflow-x: hidden;
}
.top{
  width: 100%;
  height: 13.6rem;
  position: relative;
}
.top img{
  width: 5.6rem;
  position: absolute;
  left: 1.6rem;
  top:2.8rem;
}
.phone{
  font-size:1.5rem;
  position: absolute;
  left: 8.6rem;
  top:4.5rem;
}
.main{
  width: 90%;
  margin:0 auto;
  height: 6.5rem;
  position: relative;
  @extend .boxCenter;
}
.mainLeft{
  width: 6%;
  height: 6.5rem;
  line-height: 6.5rem;
  display: inline-block;
}
.mainLeft img{
  width: 100%
}
.mianMid{
  width: 94%;
  display: inline-block;
  height: 100%;
  line-height: 5.8rem;
  border-bottom: 1px solid #ececec;
  font-size: 1.7rem;
  margin-left: 1rem;
}
.rightSrc{
  position: absolute;
  right: 0;
  bottom:3rem;
  width: 1.2rem;
}
.bottom{
  width: 19.1rem;
  height: 4.4rem;
  margin: 0 auto;
  margin-top: 2rem;
  border:2px solid #aaa;
  border-radius: 0.5rem;
  line-height: 4.4rem;
  text-align: center;
  font-size: 1.7rem;
  margin-bottom: 2rem;
}
</style>
