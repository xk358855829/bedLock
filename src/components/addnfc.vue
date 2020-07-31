<template>
  <div class="body">
    <div class="top">押金</div>
    <div class="topmaney"><span class="topic">￥</span>{{maney}}</div>
    <div class="pay" @click="pay"></div>
    <div class="bottom">
      <div><span class="bottic"></span>交押金用床</div>
      <div><span class="bottic"></span>随时可退</div>
      <div><span class="bottic"></span>急速到账</div>
    </div>
  </div>  
</template>

<script>
import {deposit,JSSDKTicket} from '../axios/api.js'
import {mapState} from "vuex"
import { Toast ,MessageBox,Indicator} from 'mint-ui';
import lock from '../../static/images/lock.png'

export default {
  name: 'add',
  data () {
    return {
      onlod:'',
      maney:'100.00',
      parameter:'',
      timeStamp:'',
      nonceStr:'',
      package:'',
      signType:'',
      paySign:''
    }
  },
  computed:{
    ...mapState(["openId","fee","dev"])
  },

destroyed() {
},

created:function () {
  this.maney=this.fee
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
  mounted:function () {
    document.title=this.$route.meta.title;
  },
  methods:{
    pay(){
      let data={
        deviceId:this.dev,
        openId:this.openId,
        customerMobileIP:returnCitySN.cip
      }
      Indicator.open('Loading...');
      let that=this;
      deposit(data).then(res=>{
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
  color: #303030;
  overflow:hidden;
}
.top{
  width: 100%;
  height: 2rem;
  text-align: center;
  line-height: 2rem;
  margin-top: 10.1rem;
  font-size: 1.7rem;
}
.topmaney{
  width: 100%;
  text-align: center;
  color:#4eb55a;
  font-size: 2.4rem;
  margin-top: 2.4rem;
}
.topic{
  font-size: 1.5rem;
  margin-right: 0.4rem;
}
.pay{
  width: 73.6%;
  height: 4.4rem;
  // background: #4eb55a;
  margin:0 auto;
  line-height: 4.4rem;
  text-align: center;
  color:#fff;
  font-size: 1.5rem;
  margin-top: 6rem;
  border-radius: 0.5rem;
}
.bottom{
  width: 100%;
  margin-top:1.9rem;
  @extend .boxCenter;
}
.bottom div{
  width: 33%;
  @extend .boxCenter;
  font-size: 1.2rem;
  color:#999;
}
.bottic{
  display: inline-block;
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
  background: #4eb55a;
  margin-right: 0.4rem;
}
</style>
