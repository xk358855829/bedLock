<template>
  <div class="body">
    <div class="order" v-for="(item,index) in list" @click="rantMain(index)">
      <div class="orderId">
        <!-- <img src="../../static/images/order.png"> -->
        <div class="orderList">{{item.name}}</div>
        <div class="orderList"><img src="../../static/images/order.png">{{item.orderNumber}}</div>
      </div>
      <div class="ordertype red" v-if="item.status==0||item.status==1||item.status==3">{{item.status|listType}}<img src="../../static/images/jiantoiu.png"></div>
      <div class="ordertype green" v-else="item.status">{{item.status|listType}}<img src="../../static/images/jiantoiu.png"></div>
    </div>
    <div class="noneMes" v-if="showDiv"><img src="../../static/images/nomess.png"></div>
  </div>  
</template>

<script>
import {orderQuery,list} from '../axios/api.js'
import {mapState} from "vuex"
import {listType} from '../axios/filer.js'

export default {
  name: 'passWordList',
  data () {
    return {
      list:[],
      showDiv:false
    }
  },
  computed:{
    ...mapState(["openId"])
  },
  mounted:function () {
    this.onlodaing();
    document.title=this.$route.meta.title
  },
  methods:{
      sub(){
      },
      onlodaing(){
        let params = {
            openId:sessionStorage.getItem("openId"),
            pageNum:1,
            pageSize:100
        };
        console.log(params);
        list(params).then(res=>{
          console.log(res.data.data.list.length)
          if(res.data.data.list.length==0){
            this.showDiv=true;
          }else{
            this.showDiv=false;
          }
          // this.showDiv=false;
          this.list=res.data.data.list;
          console.log(this.list);
        });
      },
      rantMain(i){
        sessionStorage.setItem("changePass",JSON.stringify(this.list[i]));
        this.$router.push({path:'/mianHist'})
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
  overflow-y: auto;
}
.order{
  width: 100%;
  height: 6rem;
  @extend .boxCenter;
  // padding-left:0.4rem;
  // padding-right: 0.4rem;
  border-bottom: 1px solid #ececec;
  font-size: 1.5rem; 
  background: #fff;
}
.orderId{
  width: 70%;
  height: 100%;
  text-align: left;
  line-height: 6rem;
  // @extend .boxCenter;
}
.ordertype{
  width: 20%;
  height: 100%;
  text-align: right;
  line-height: 6rem;
}
.ordertype img{
  margin-left: 5px; 
}
.noneMes{
  width: 100%;
  margin: 20px auto;
  @extend .boxCenter;
}
.noneMes img{
  width: 80%;
}
.nedPay{
  width: 90%;
  margin:0 auto;
  height: 4.6rem;
  background: #4eb55a;
  border-radius: 8px;
  text-align: center;
  line-height: 4.6rem;
  color:#fff;
  font-size:1.6rem;
  position: fixed;
  bottom: 120px;
  left: 5%
}
.orderList{
  height: 50%;
  line-height: 3rem
}
.orderList img{
  width: 14px;
  margin-right: 5px;
}
.red{
  color:red
}
.green{
  color:#4eb55a
}
</style>
