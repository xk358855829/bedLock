<template>
  <div class="body">
    <div class="top"><img src="../../static/images/icon/133.png" @click="qrcode"></div>
    <div class="button">
      <div class="iconClick"><div class="iconIn"><img src="../../static/images/icon/137.png" @click="runter('kaikong')"><span>输入锁号</span></div></div>
      <div class="iconClick"><div class="iconIn"><img src="../../static/images/icon/120.png" @click="backBed"><span>使用结束</span></div></div>
      <div class="iconClick"><div class="iconIn"><img src="../../static/images/icon/128.png" @click="helpPhone"><span>呼叫帮助</span></div></div>
      <div class="iconClick"><div class="iconIn"><img src="../../static/images/icon/337.png" @click="runter('parameter')"><span>个人中心</span></div></div>
    </div>
  </div>  
</template>

<script>
import {JSSDKTicket,query,orderQuery,list} from '../axios/api.js'
import { Cell,MessageBox,Toast} from 'mint-ui';
import {mapState} from "vuex"
import {formatDate} from '../axios/filer.js'

export default {
  name: 'index',
  data () {
    return {
      locks:[],
      phoneNumber:'',
      statusNUll:[]
    }
  },
  created:function () {
    let data={}
       let that=this;
        JSSDKTicket(data).then(res=>{
          console.log(res);
          wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端弹出出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: res.data.data.appId, // 必填，公众号的唯一标识
                timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
                nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
                signature: res.data.data.signature, // 必填，签名，见附录1
                jsApiList: ["scanQRCode"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
        })
  },
  mounted:function () {
    // sessionStorage.setItem("phoneNumber","15267084796")
    // sessionStorage.setItem("openId","oOKex1EuMmqul_o-d_fwltu27MTI")
    this.phoneNumber=sessionStorage.getItem("phoneNumber")
    this.onlodaing();
    console.log(this.phoneNumber)
    document.title=this.$route.meta.title;
  },
  computed:{
    ...mapState(["openId"])
  },
  methods:{
      onlodaing(){
        console.log(this.phoneNumber)
        if(this.phoneNumber==0||this.phoneNumber==null||this.phoneNumber==''){
          this.$router.push({path:'/add'})
        }
        const params = {
            openId: sessionStorage.getItem("openId")
        };
        console.log(params);
      },
      formatDate(secs) {
        var t = new Date(secs)
        var year = t.getFullYear()
        var month = t.getMonth() + 1
        if (month < 10) { month = '0' + month }
        var date = t.getDate()
        if (date < 10) { date = '0' + date }
        var hour = t.getHours()
        if (hour < 10) { hour = '0' + hour }
        var minute = t.getMinutes()
        if (minute < 10) { minute = '0' + minute }
        var second = t.getSeconds()
        if (second < 10) { second = '0' + second }
        return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
      },
      qrcode(){
        let data={}
        let that=this;
        // let dev="UUUf"
        // JSSDKTicket(data).then(res=>{
        //   alert(res.data.data.appId)
        //   wx.config({
        //         debug: true, // 开启调试模式,调用的所有api的返回值会在客户端弹出出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        //         appId: res.data.data.appId, // 必填，公众号的唯一标识
        //         timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
        //         nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
        //         signature: res.data.data.signature, // 必填，签名，见附录1
        //         jsApiList: ["scanQRCode"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        //     });
          wx.ready(function(){
          wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function(res) {
                console.log(res);
                let resLockId='';
                let dev='';
                // alert(res.resultStr);
                resLockId=res.resultStr;
                dev = resLockId.substring(resLockId.indexOf('state=')+6,resLockId.indexOf('#'));
                // alert(dev)
                that.$store.commit('updatedev',dev)
                let data={
                  openId:sessionStorage.getItem("openId"),
                  deviceId:dev
                }
                query(data).then(res=>{
                  console.log(res)
                   if(res.data.resCode == 0){
                      let params = {
                          openId:sessionStorage.getItem("openId")
                      };
                      console.log(params);
                      orderQuery(params).then(res=>{
                        console.log(res)
                        if(res.data.resCode==0){
                          that.$router.push({path:'/mainPage'})
                        }else{
                          Toast(res.data.result)
                        }
                      });
                  }else if(res.data.resCode==1){
                      that.$store.commit('updatefee',res.data.data.deposit_fee)
                      that.$router.push({path:'/addfinger'})      
                  }else{
                      Toast(res.data.result);   
                  }
                })
            }
          })
        })
        // })
      },
      runter(e){
         this.$router.push({path:'/'+e+''})
      },
      helpPhone(){
        Toast("0571-88381765");  
      },
      backBed(){
          let params = {
              openId:sessionStorage.getItem("openId"),
              pageSize:1000
          };
          let that=this;
         list(params).then(res=>{
          console.log(res.data.data.list.length)
          if(res.data.data.list.length==0){
            that.$router.push({path:'/nfc'})   
          }else{
            for(let i=0;i<res.data.data.list.length;i++){
              if(res.data.data.list[i].status==0||res.data.data.list[i].status==3||res.data.data.list[i].status==1){
                sessionStorage.setItem("changePass",JSON.stringify(res.data.data.list[i]));
                that.$router.push({path:'/mianHist'})
                that.statusNUll.push(res.data.data.list[i]);
              }
            }
            console.log(that.statusNUll)
            if(that.statusNUll.length==0){
                that.$router.push({path:'/nfc'})
            }
          }
        });
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"  scoped>
@import "../../static/reset.scss";
* {
-webkit-touch-callout:none;
-webkit-user-select:none;
-khtml-user-select:none;
-moz-user-select:none;
-ms-user-select:none;
user-select:none;
}
.body{
  width: 100%;
  height: 100%;
  background: #F5FCFF;
  overflow:hidden 
}
.top{
  width: 100%;
  height: 65%;
  background: $backgroundColor;
  @extend .boxCenter;
  overflow: hidden;
}
.top img{
  width: 13.8rem;
}
.button{
  width: 100%;
  height: 35%;
  background:$mainbc;
  @extend .boxCenter;
}
.iconClick{
  width: 25%;
  height: 100%;
  @extend .boxCenter;
}
.iconClick img{
  width: 5.4rem;
  margin-top:-24px;
}
.iconIn{
  width: 100%;
  height: 76px;
  text-align: center;
  // line-height: 76px;
}
.iconClick span{
  display: block;
  width: 100%;
  height: 16px;
  line-height: 16px;
  color:#303030;
  font-size: 1.3rem;
  font-family: PingFang-SC-Regular;
}
</style>
