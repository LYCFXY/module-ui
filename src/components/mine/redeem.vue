<template>
    <div class="product-repurchase">
           <el-col :span="24" class="product-header">
               <h2 class="product-title">{{ formData.fundName }}</h2>
           </el-col>

           <el-col class="product-content" :span="24">
                <div>
                   <el-col :span="10" class="item-title">预期收益率：</el-col>
                   <el-col :span="10" :offset="1" class="item-content red">{{ formData.guestRatio }}</el-col>
               </div>
               <div>
                   <el-col :span="10" class="item-title">产品代码：</el-col>
                   <el-col :span="10" :offset="1" class="item-content">{{ formData.fundCode }}</el-col>
               </div>
               <div>
                   <el-col :span="10" class="item-title">币种：</el-col>
                   <el-col :span="10" :offset="1" class="item-content">{{ formData.currencyType }}</el-col>
               </div>
               <div>
                   <el-col :span="10" class="item-title">投资起日：</el-col>
                   <el-col :span="10" :offset="1" class="item-content">{{ (formData.fundStartDate + '').replace(/(\d{4})?(\d{2})?(\d{2})?/,'$1-$2-$3') }}</el-col>
               </div>
           </el-col>
           <el-col :span="24" class='product-search'>
               <hr />
               <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
                   <el-form-item>
                       <el-col :span="8" class="card-number">卡号/账号：</el-col>
                       <el-col :span="12" :offset="1">
                            {{ formData.depositAcct }}
                       </el-col>
                   </el-form-item>

                   <el-form-item>
                       <el-col :span="8" class="card-number">户名：</el-col>
                       <el-col :span="12" :offset="1">
                            {{ formData.investorName }}
                       </el-col>
                   </el-form-item>

                   <el-form-item>
                       <el-col :span="8" class="card-number">持有份额：</el-col>
                       <el-col :span="6" :offset="1">{{ formData.minAccountBalance }}</el-col>
                   </el-form-item>

                   <el-form-item>
                       <el-col :span="8" class="card-number">赎回份额：</el-col>
                       <el-col :span="7" :offset="1">
                           <el-input placeholder="请输入购买金额" v-model="sizeForm.purchase"></el-input>
                       </el-col>
                   </el-form-item>

                   <el-form-item>
                       <el-col :span="8" class="card-number">交易密码：</el-col>
                       <el-col :span="7" :offset="1">
                           <el-input type="password" v-model="sizeForm.password"></el-input>
                       </el-col>
                   </el-form-item>
                   <el-form-item size="large">
                       <el-row type="flex" justify="center">
                           <el-button size="small" type="primary" @click="onSubmit">赎回</el-button>
                           <!-- v-on:click="onClickMe" -->
                           <el-button @click="back"  size="small">返回</el-button>
                       </el-row>
                   </el-form-item>
               </el-form>
           </el-col>
           <el-col :span="24" class="content">
            <ExplainNumber></ExplainNumber>
           </el-col>
       </div>
</template>

<script>
    import { REDEEM_URL } from '../../api/api.js';
    var qs = require('qs');
    export default {
        name: 'mine-redeem',
        data() {
            return {
               /*防止按钮多次触发*/
                preventData: false,
                formData: {},
                /*form表单*/
                sizeForm: {
                  card: '6222600140004825644',
                  username: '',
                  holdShare: '50,000,000,00',
                  purchase: '',
                  number: '',
                  password: '',
                  checked: true,
                  delivery: false,
                  desc: ''
                }
            }
        },
        mounted(){
         this.$nextTick(() => {
            this.getData();
          })
        },
        computed: {
          commitData() {
                return{
                    "requestHeader.frontSerialNo" : "0DHYH0020000085",
                    "requestHeader.cicsCode" : "WM61",
                    "requestHeader.distrCode" : "001",
                    "requestHeader.transSource" : "1",
                    "requestHeader.traceNo" : "2017111620280930133510686480",
                    "requestHeader.indiInst" : "1",
                    "requestHeader.authorLog" : "",
                    "requestHeader.channelType" : "21",
                    "requestHeader.encryptFlag" : "",
                    "requestHeader.packLength" : "",
                    "requestHeader.authorDeviceA" : "",
                    "requestHeader.authorReasonC" : "",
                    "requestHeader.authorTellerA" : "",
                    "requestHeader.authorDeviceB" : "",
                    "requestHeader.authorReasonD" : "",
                    "requestHeader.authorTellerB" : "",
                    "requestHeader.authorReasonE" : "",
                    "requestHeader.regionCode" : "01310999999",
                    "requestHeader.authorReasonF" : "",
                    "requestHeader.trueTeller" : "",
                    "requestHeader.appType" : "52",
                    "requestHeader.authorLevel" : "",
                    "requestHeader.authorReasonA" : "",
                    "requestHeader.pageNo" : "1",
                    "requestHeader.authorReasonB" : "",
                    "requestHeader.transDate" : "20171116",
                    "requestHeader.authorReasonG" : "",
                    "requestHeader.authorReasonH" : "",
                    "requestHeader.zipFlag" : "",
                    "requestHeader.authorReasonI" : "",
                    "requestHeader.authorReasonJ" : "",
                    "requestHeader.netCode" : "01310150999",
                    "requestHeader.transTime" : "231100",
                    "requestHeader.requestType" : "T",
                    "requestHeader.teller" : "EBB001",
                    "requestHeader.frontTransType" : "522303",
                    "requestHeader.termVersion" : "",
                    "requestHeader.tellerLevel" : "",
                    "requestHeader.authorPasswordA" : "",
                    "requestHeader.authorPasswordB" : "",
                    "requestHeader.transType" : "2303",
                    "requestHeader.filler" : "",
                    "requestHeader.lastLogno" : "",
                    "requestHeader.termCode" : "ECTLBB8",
                    "requestHeader.endDate" : "",
                    "requestHeader.fundCode" : "",
                    "requestHeader.transMode" : "0",
                    "requestHeader.fundChar" : "",
                    "requestHeader.startDate" : "",
                    /*请求字段*/
                    "redem.depositAcct": this.formData.depositAcct,
                    "redem.transactionAccountPwd": this.sizeForm.password,
                    "redem.fundChar": this.formData.fundChar,
                    "redem.fundCode": this.formData.fundCode,
                    "redem.largeRedemptionFlag":"",
                    "redem.applicationVol": this.sizeForm.purchase,
                    "redem.availVol": this.formData.availVol,
                    "redem.taSerialNO":""
                }
          },
          repurchaseIndex(){
            return this.$store.state.repurchaseIndex;
          },
          repurchaseData(){
            return this.$store.state.tableData;
          }
        },
        methods:{
            getData() {
              let allData = this.repurchaseData;
              let indexData = this.repurchaseIndex;
              this.formData = allData[indexData];
            },
            /*form表单提交*/
            onSubmit() {
                var _this = this;

                let reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
                if( !reg.test(this.sizeForm.purchase) ){
                  this.$alert('请输入正确的数字，最多保留两位小数','赎回份额')
                  return
                }

                  let purchaseNumber = parseFloat(this.sizeForm.purchase)
                  let minNumber = parseFloat(this.formData.minRedemptionVol)
                if(parseFloat(this.sizeForm.purchase) < parseFloat(this.formData.minRedemptionVol)){
                  this.$alert('赎回份额不能低于' + minNumber, '赎回份额', {
                    confirmButtonText: '确定',
                  });
                  return
                }

                if(this.preventData){ return }
                this.preventData = true;
               /* this.$axios.get('http://192.168.191.1:8082/static/json/redeem.json',{})*/
                this.$axios.post(REDEEM_URL, qs.stringify(this.commitData)
                )
                .then((res) => {
                    let productExist = res.data.replyInformation;
                    let allData = res.data.redemResult;
                    this.preventData = false;
                    if(productExist.responseCode == 'WM0000'){
                        this.$alert('赎回成功！', '', {
                          confirmButtonText: '返回',
                          callback: action => {
                              this.$router.go(-1);
                          }
                        });
                    }else{
                      this.$alert('赎回失败，请返回重新赎回！');
                    }
                }).catch(function(err) {
                  this.preventData = false;
                    _this.$alert("网络错误！")
                })
            },
            back(){
              this.$router.go(-1);
            }
        }
}
</script>
<style scoped lang='sass'>
    @import "../../css/mine.scss";
    @import "../../css/mine_repurchase.scss";
</style>