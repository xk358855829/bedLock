<template>
  <div class="body">
     <div class="top">
       <div class="statePay">{{sate}}</div>
       <div class="stateTime">{{timeState}}</div>
     </div>
     <div class="mid">
       <div class="midDiv borderLine">
         <div class="midInDiv">
           <div class="minLeft">单价</div>
           <div class="minRight">{{money}}元/小时</div>
         </div>
       </div>
       <!-- <div class="midDiv borderLine">
         <div class="midInDiv">
           <div class="minLeft">医院</div>
           <div class="minRight">{{Hospital}}</div>
         </div>
       </div> -->
       <div class="midDiv borderLine">
         <div class="midInDiv">
           <div class="minLeft">锁号</div>
           <div class="minRight">{{bedNo}}</div>
         </div>
       </div>
       <div class="midDiv borderLine">
         <div class="midInDiv">
           <div class="minLeft">订单号</div>
           <div class="minRight">{{orderNum}}</div>
         </div>
       </div>
       <div class="midDiv borderLine">
         <div class="midInDiv">
           <div class="minLeft">开始时间</div>
           <div class="minRight">{{createTime}}</div>
         </div>
       </div>
       <div class="midDiv borderLine">
         <div class="midInDiv">
           <div class="minLeft">结束时间</div>
           <div class="minRight">{{endTime}}</div>
         </div>
       </div>
       <div class="midDiv">
         <div class="midInDiv">
           <div class="minLeft">支付时间</div>
           <div class="minRight">{{paymentTime}}</div>
         </div>
       </div>
     </div>
     <div class="werr" v-if="type=='1'"><img src="../../static/images/icon/149.png">请关锁再结费</div>
     <div class="payDiv" v-if="type=='2'" @click="pay">立即支付</div>
     <div class="bottom"><span>计费规则</span></div>
  </div>
</template>

<script>
import {JSSDKTicket,orderPay,list} from '../axios/api.js'
import {mapState} from "vuex"
import {Toast ,MessageBox,Indicator} from 'mint-ui';
import {} from '../axios/filer.js'

export default {
  name: 'mainPage',
  data () {
    return {
      online:true,
      sate:"租用中",
      timeState:"00:00:00",
      hours:'',
      minutes:'',
      seconds:'',
      money:'X',
      Hospital:"XXXXXXXX",
      bedNo:'251252',
      startTime:'2020-03-13 15:13:56',
      orderNum:'6546316461',
      paymentTime:'2020-03-13 15:13:56',
      endTime:'2020-03-13 15:13:56',
      createTime:'2020-03-13 15:13:56',
      type:'3',
      onlod:'',
      orderMsg:'',
      onlodValue:''
    }
  },
  computed:{
    ...mapState(["openId"])
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
                jsApiList: ["chooseWXPay"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
        })
  },
  beforeDestroy(){
    // clearInterval(this.onlod)
    // clearInterval(this.onlodValue)
    if(this.onlodValue) {
    　clearInterval(this.onlodValue); //关闭
    }
    if(this.onlod) {
    　clearInterval(this.onlod); //关闭
    }
  },
  mounted:function () {
    document.title=this.$route.meta.title;
    let changePass=JSON.parse(sessionStorage.getItem("changePass"));
    this.orderMsg=changePass
    console.log(changePass)
    this.orderNum=changePass.orderNumber;
    this.Hospital=changePass.name;
    this.money=changePass.unitPrice
    this.startTime=changePass.startTime;
    this.paymentTime=changePass.paymentTime
    this.endTime=changePass.endTime
    this.createTime=changePass.createTime
    this.bedNo=changePass.deviceId
    // this.initWebSocket();

    this.onload(this.orderNum)
    this.onlodValue=setInterval(()=>{
      this.onload(this.orderNum)
    },5000)
    this.getOutTime(this.startTime);
    this.onlod=setInterval(()=>{
      this.getOutTime(this.startTime)
    },1000)
  },
  methods:{
    onload(num){
      let that=this;
        let params = {
              openId:sessionStorage.getItem("openId"),
              pageNum:1,
              pageSize:1,
              orderNumber:num
          };
        list(params).then(res=>{
          console.log(res.data)
          if(res.data.data.list[0].status==0||res.data.data.list[0].status==3){
            that.sate="租用中"
            that.type="1"
          }else if(res.data.data.list[0].status==1){
            that.sate="待支付"
            clearInterval(that.onlodValue)
            clearInterval(that.onlod)
            that.type="2"
            that.timeState=res.data.data.list[0].settlementAmount+"元"
            console.log(that.timeState)
            that.$forceUpdate()
          }else{
            that.sate="已完成"
            clearInterval(that.onlod)
            clearInterval(that.onlodValue)
            that.type="3"
            that.timeState=res.data.data.list[0].settlementAmount+"元"
          }
        });
    },


    getOutTime(time){
      let nowDate=new Date().getTime();
      let mainDate=nowDate-(new Date(time.replace(/-/g,'/')).getTime())
      var days = Math.floor(mainDate / 1000 / 60 / 60 / 24) // 从这里开始
      var daysmod = mainDate - days * 24 *60 * 60 * 1000
      var hours = Math.floor(daysmod / 1000 / 60 / 60)
      var hoursmod = mainDate - (days * 24 *60 * 60 * 1000) - (hours * 1000 * 60 * 60)
      var minutes = Math.floor(hoursmod / 1000 / 60)
      var minutesmod = mainDate - (days * 24 *60 * 60 * 1000) - (hours * 1000 * 60 * 60) - (minutes * 1000 * 60)
      var seconds = Math.floor(minutesmod / 1000) // 到这里结束，是将总毫秒转化成对应天数+小时数+分钟数+秒数的转换方法
      if(days<10){
        days="0"+days
      }
      if(hours<10){
        hours="0"+hours
      }
      if(minutes<10){
        minutes="0"+minutes
      }
      if(seconds<10){
        seconds="0"+seconds
      }
      this.timeState=days+":"+hours+":"+ minutes+":"+seconds
    },
    pay(){
      let data={
        orderNumber:this.orderMsg.orderNumber,
        customerMobileIP:returnCitySN.cip
      }
      Indicator.open('Loading...');
      let that=this;
      orderPay(data).then(res=>{
        if(res.data.resCode==0){
                 that.timeStamp=res.data.data.timeStamp;
                 that.nonceStr=res.data.data.nonceStr;
                 that.package=res.data.data.package;
                 that.signType=res.data.data.signType;
                 that.paySign=res.data.data.paySign;
                 Indicator.close();
                 // alert(that.timeStamp)
                 // alert(that.nonceStr)
                 // alert(that.package)
                 // alert(that.signType)
                 // alert(that.paySign)
                  wx.ready(function() {
                    wx.chooseWXPay({
                      timestamp: that.timeStamp,
                      // 支付签名随机串，不长于 32 位
                      nonceStr: that.nonceStr,
                      // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                      package: that.package,
                      // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                      signType: that.signType,
                      // 支付签名
                      paySign: that.paySign,
                      success(res) {
                         // alert(res.errMsg);
                        if (
                          res.errMsg === "chooseWXPay:ok" ||
                          res.errMsg == "getBrandWCPayRequest:ok"
                        ) {
                          that.$router.push({path:'/'})
                        }
                      },
                      cancel(res){
                        Toast("未支付");
                        // that.$router.push({
                        //     path: "/washingList",
                        //   });
                      },
                      fail(res) {
                        Toast("支付失败");
                        // that.$router.push({
                        //     path: "/washingList",
                        //   });
                        // return;
                      }
                    });
                  });
                }else{
                  Indicator.close();
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
  overflow: hidden;
}
.top{
  width: 100%;
  height: 9.8rem;
  background: #fff;
  color:#4eb55a;
  font-size: 2rem;
  padding-top: 4.4rem
}
.statePay{
  width: 100%;
  height: 2rem;
  text-align: center;
}
.stateTime{
  width: 100%;
  height: 2rem;
  text-align: center;
  margin-top:2rem
}
.mid{
  width: 100%;
  background: #fff;
  font-size: 1.5rem;
  margin-top:1.2rem;
}
.midDiv{
  width: 100%;
  height: 4.6rem;
}
.borderLine{
  border-bottom: 1px solid #ececec;
}
.midInDiv{
  width: 94%;
  margin:0 auto;
  position: relative;
}
.minLeft{
  height: 4.6rem;
  line-height:4.6rem;
  position: absolute;
  left: 0;
  color:#303030;
}
.minRight{
  height: 4.6rem;
  line-height:4.6rem;
  position: absolute;
  right: 0;
  color:#999;
}
.werr{
  width: 100%;
  height: 4.6rem;
  margin-top: 1.2rem;
  line-height: 4.6rem;
  font-size:1.6rem;
  color:#303030;
  text-align: center;
  background: #fff;
}
.werr img{
  width: 1.1rem;
  margin-right: 0.5rem;
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
.payDiv{
  width: 91%;
  margin:0 auto;
  height: 4.6rem;
  background: #4eb55a;
  border-radius: 8px;
  margin-top: 2rem;
  text-align: center;
  line-height: 4.6rem;
  color:#fff;
  font-size:1.6rem;
}
</style>
