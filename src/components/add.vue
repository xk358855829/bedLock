<template>
  <div class="body">
    <div class="font">手机号</div>
    <div class="phone"><input type="text" name="" v-model='phone' placeholder="请输入手机号码"></div>
    <div class="fontCode">验证码</div>
    <div class="phone"><input type="text" name="" v-model='code' placeholder="请输入验证码"><div class="code" :class="{'colordisplay':display}" @click="sentPhone">{{sentWord}}</div></div>
    <div class="bind" @click="bindPhone">立即登陆</div>
  </div>  
</template>

<script>
import {sentCode,register} from '../axios/api.js'
import {mapState} from "vuex"
import { Toast } from 'mint-ui';

export default {
  name: 'add',
  data () {
    return {
      phone:'',
      code:'',
      sentWord:'发送验证码',
      flag:1,
      i:60,
      ontime:'',
      display:false
    }
  },
  computed:{
    ...mapState(["openId","phoneNumber"])
  },
  mounted:function () {
    document.title=this.$route.meta.title
  },
  beforeDestroy () {
  clearInterval(this.ontime)
  },
  methods:{
      sentPhone(){
        let myreg=/^[1][3,4,5,7,8,9][0-9]{9}$/;
        if (!myreg.test(this.phone)) {
          Toast('请输入正确手机号');
                return false;
        } 
        if(this.phone==''){
          Toast('请输入手机号');
          return;
        }
        if(this.i!==60){
          return;
        }
        let data={
          phoneNumber:this.phone
        }
        console.log(data);
        sentCode(data).then(res=>{
          console.log(res)
          if(res.data.resCode == 0){
              Toast(res.data.result);
              this.ontime=setInterval(()=>{
                this.countDown()
              },1000) 
          }else{
              Toast(res.data.result);         
          }
        });
      },
      countDown() {  
        this.display=true
          this.i = this.i - 1;  
          this.sentWord=this.i;
          console.log(this.i)
          if (this.i == 0) {  
              this.sentWord='发送验证码' 
              this.i = 60;  
              clearInterval(this.ontime);
              this.display=false;
              return;  
          } 
      },
      bindPhone(){
        let myreg=/^[1][3,4,5,7,8,9][0-9]{9}$/;
        if (!myreg.test(this.phone)) {
          Toast('请输入正确手机号');
                return;
        } 
        if(this.phone==''){
          Toast('请输入手机号');
          return;
        }
        if(this.code==''){
          Toast('请输入验证码');
          return;
        }
        let data={
          phoneNumber:this.phone,
          openId:sessionStorage.getItem("openId"),
          code:this.code
        }
        register(data).then(res=>{
          console.log(res);
           if(res.data.resCode == 0){
              Toast(res.data.result);
              sessionStorage.setItem("phoneNumber",this.phone)
              console.log(sessionStorage.getItem("phoneNumber"))
              this.$router.push({path:'/'})
          }else{
              Toast(res.data.result);         
          }
        })
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
  overflow:hidden;
}
.font{
  width: 90%;
  height: 1.3rem;
  margin: 0 auto;
  margin-top: 8.8rem;
  margin-bottom: 2rem;
  font-size: 1.3rem;
}
.fontCode{
  width: 90%;
  height: 1.3rem;
  margin: 0 auto;
  margin-top: 2.3rem;
  font-size: 1.3rem;
  margin-bottom: 2rem;
}
.phone{
  width: 90%;
  height: 4.7rem;
  margin: 0 auto;
  border-bottom: 1px solid #ececec;
  position: relative;
}
.phone input{
  width: 100%;
  height: 1.7rem;
  font-size:1.7rem;
  outline: none;
  border:0;
  background: $mainbc;
  padding-top: 1.8rem;
}
.code{
  position: absolute;
  right: 0;
  bottom:1.2rem;
  width: 7.8rem;
  height: 2.4rem;
  border-radius: 1.2rem;
  background: #4eb55a;
  color:#fff;
  text-align: center;
  line-height: 2.4rem;
  font-size:1.3rem;
}
.bind{
  width: 92%;
  height: 4.4rem;
  text-align: center;
  line-height: 4.4rem;
  background: #4eb55a;
  color: #fff;
  font-size: 1.7rem;
  margin: 0 auto;
  border-radius: 2.2rem;
  margin-top: 5.2rem;
}
.colordisplay{
  background: #C0C0C0
}
</style>