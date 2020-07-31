<template>
  <div class="body">
    <div class="top">当前没有订单</div>
    <div class="img"><img src="../../static/images/nomess.png"></div>
    <div class="buttom" @click="qrcode">马上去下单</div>
  </div>  
</template>

<script>
import {JSSDKTicket,query,orderQuery,list} from '../axios/api.js'
import {mapState} from "vuex"
import {Cell,MessageBox,Toast} from 'mint-ui';
import {volPercentfire,signafire} from '../axios/filer.js'

export default {
  name: 'nfc',
  data () {
    return {
      showDiv:false,
      showDivUn:false,
      getTYpe:'',
      deviceId:'',
      resultDate:[]
    }
  },
  computed:{
    ...mapState(["openId"])
  },
  components:{
  },
  created:function () {
    let that=this
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
                }
              } 
              })   
  },
  beforeDestroy () {
  },
  methods:{
    qrcode(){
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
                jsApiList: [res.data.data.jsApiList] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
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
                alert(dev)
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
                          // Toast("开始下单");
                          that.$router.push({path:'/mainPage'})
                          // that.$router.push({path:'/addfinger'})
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
        })
      },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"  scoped>
@import "../../static/reset.scss";
.body{
  width: 100%;
  height: 100%;
  background:#F2F2F2;
}
.top{
  width: 100%;
  height: 100px;
  color:#bebebe;
  font-size: 1.4rem;
  @extend .boxCenter;
}
.img{
  width: 80%;
  margin:0 auto;
  @extend .boxCenter;
}
.img img{
  width: 100%;
}
.buttom{
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
