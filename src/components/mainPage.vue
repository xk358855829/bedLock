<template>
  <div class="body">
    <div class="top"><div class="topdiv"><img src="../../static/images/icon/144.png"></div></div>
    <div class="mid" v-if="showOnline"><p>设备未在线请激活</p></br>请按下<span>“按钮”</span>再次尝试</div>
    <div class="open" v-if="!showOnline" @click="open">已按下，立即开锁</div>
    <div class="bottom"><span>无法开锁，立即上报</span></div>
  </div>
</template>

<script>
import {isOnline,unlock,open,closeRecord,isOnlines,message,openRecord,openStatus,list} from '../axios/api.js'
import {mapState} from "vuex"
import { Toast,Indicator,MessageBox } from 'mint-ui';
import {} from '../axios/filer.js'

export default {
  name: 'mainPage',
  data () {
    return {
      showOnline:true,
      onlod:'',
      intervalID:'',
      time:0,
      websock:'',
      msg:'',
      dev1:'',
      count:0,
      i:60,
      ontime:''
    }
  },
  computed:{
    ...mapState(["openId","dev"])
  },
  created:function () {
    document.title=this.$route.meta.title
    // this.onlodaingOnline();
    // this.onlod=setInterval(()=>{
    //   this.onlodaingOnline()
    // },1000)
    this.initWebSocket();
  },
  beforeDestroy () { // 离开页面生命周期函数
    this.websock.close();
    console.log(111)
    Indicator.close();
    clearInterval(this.ontime);
  },
  methods:{
    onlodaingOnline(){
      let data={
        deviceId:this.dev
      }
      isOnline(data).then(res=>{
        if(res.data.resCode==1){
          Toast(res.data.result);
          this.$router.go(-1);//返回上一层
        }else{
           if(res.data.data.onLineStatus==0){
              this.showOnline=true
            }else{
              // Toast(res.data.result)
              this.showOnline=false
            }
        }
      })
    },
    initWebSocket () {
      console.log(this.dev)
      // this.dev1="UUUU"
      // WebSocket与普通的请求所用协议有所不同，ws等同于http，wss等同于https
      this.websock = new WebSocket('ws://39.104.99.181:12000/websocket/'+this.dev)
      // this.websock = new WebSocket('ws://39.104.99.181:12010/websocket/'+this.dev)
      this.websock.onopen = this.websocketonopen
      this.websock.onerror = this.websocketonerror
      this.websock.onmessage = this.websocketonmessage
      this.websock.onclose = this.websocketclose
    },
    websocketonopen () {
      console.log('WebSocket连接成功');
      this.send (this.dev);
    },
    websocketonerror (e) {
      console.log('WebSocket连接发生错误')
    },
    websocketonmessage (e) {
      console.log(JSON.parse(e.data).code)
      if(JSON.parse(e.data).code==200){
        let da = JSON.parse(e.data);
        console.log(da.data.onLineStatus)
        if(da.data.onLineStatus==0){
            this.showOnline=true
        }else if(da.data.onLineStatus==1){
            this.showOnline=false
        }else if(da.data.onLineStatus==2){
            Toast("开锁成功");
            this.i = 60;
            Indicator.close();
            let that=this;
            let params = {
              openId:sessionStorage.getItem("openId"),
              pageNum:1,
              pageSize:10,
              statusList:[0,3]
            };
            console.log(params);
            list(params).then(res=>{
              // console.log(res.data.data.list.length)
              that.list=res.data.data.list;
              for(let i=0;i<res.data.data.list.length;i++){
                if(res.data.data.list[i].status==0||res.data.data.list[i].status==3){
                  sessionStorage.setItem("changePass",JSON.stringify(res.data.data.list[i]));
                  that.$router.push({path:'/mianHist'})
                  // that.websock.close()
                }
              }
          });
        }
      }else{
        Toast(JSON.parse(e.data).message);
      }
    },
    websocketclose () {
      console.log('connection closed')

    },
    // 发送消息
    send (message) {
      console.log(message)
      this.websock.send(message)
      this.setMessageInnerHTML(message)
    },
    // 将消息显示在网页上
    setMessageInnerHTML (innerHTML) {
      this.msg = innerHTML
    },
    open(){
      let data={
        deviceId:this.dev,
        openId:sessionStorage.getItem("openId")
      }
      let that=this;
      // clearInterval(that.onlod)
      Indicator.open({
        text: '开锁中，请稍后...',
        spinnerType: 'fading-circle'
      });
      unlock(data).then(res=>{
        console.log(res);
        if(res.data.resCode==0){
           that.ontime=setInterval(()=>{
                that.countDown()
              },1000)
          // Toast(res.data.result)
          that.showOnline=true;
          // that.intervalID = setInterval(()=>{
          //   that.funSever()
          // }, 1000);
        }else{
          Indicator.close();
          Toast(res.data.result)
          // that.onlod=setInterval(()=>{
          //   that.onlodaingOnline()
          // },1000)
        }
      })
    },
    countDown() {
          this.i = this.i - 1;
          console.log(this.i)
          if (this.i == 0) {
              this.i =60;
              clearInterval(this.ontime);
              Indicator.close();
              Toast("请重试")
              return;
          }
      },
    pay(){
      this.$router.push({path:'/mianHist'})
    },
    funSever(){
      this.time++;
      this.timeTo();
      let data={
        deviceId:this.dev
      }
      let that=this;
      console.log(data)
      openStatus(data).then(res=>{
        console.log(res);
        if(res.data.resCode ==0){
          clearInterval(that.intervalID);
          Indicator.close();
          that.time=1;
          Toast("开锁成功");
          let params = {
            openId:sessionStorage.getItem("openId")
          };
          console.log(params);
          list(params).then(res=>{
            // console.log(res.data.data.list.length)
            that.list=res.data.data.list;
            for(let i=0;i<res.data.data.list.length;i++){
              if(res.data.data.list[i].status==0||res.data.data.list[i].status==3){
                sessionStorage.setItem("changePass",JSON.stringify(res.data.data.list[i]));
                that.$router.push({path:'/mianHist'})
              }
            }
        });
        }else{
          console.log(0);
          // Indicator.close();
        }
      })
    },
    timeTo(){
      if(this.time==60){
        clearInterval(this.intervalID);
        Indicator.close();
        Toast("开锁超时，请稍后再试！")
        this.time=1;
        this.onlod=setInterval(()=>{
              this.onlodaingOnline()
          },1000)
      }else{
        console.log(this.time);
      }
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
  overflow: hidden;
}
.top{
  width: 100%;
  margin-top: 6.2rem;
  @extend .boxCenter;
}
.topdiv{
  width: 17.1rem;
  position: relative;
}
.top img{
  width: 17.1rem;
  margin-left: 2rem;
}
.topSpan{
  position: absolute;
  right: -4rem;
  top:7.2rem;
  font-size:2rem;
  color:$red;
}
.mid{
  width: 100%;
  font-size: 2rem;
  color:#303030;
  text-align: center;
  margin-top:3rem;
}
.mid span{
  color: $red;
}
.bottom{
  width: 100%;
  height: 3rem;
  text-align: center;
  color:#666;
  font-size:1.5rem;
  position: fixed;
  bottom: 0;
  left: 0
}
.bottom span{
  display: inline-block;
  border-bottom: 1px solid #666;
}
.open{
  width: 58%;
  height: 4.6rem;
  border-radius: 8px;
  background: #4eb55a;
  color:#fff;
  font-size:1.6rem;
  margin:0 auto;
  @extend .boxCenter;
  margin-top:3.9rem;
}
</style>
