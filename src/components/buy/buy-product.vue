<template>
    <div class="product-repurchase">
          <el-col :span="24" class="product-header">
              <h2 class="product-title">{{ formData.fundName }}</h2>
              <div class="product-feture">
                  <span>{{ formData.currencyType }}</span>
                  <span>{{ formData.fundChar }}</span>
                  <span>{{ formData.fundLevel }}</span>
              </div>
          </el-col>

          <el-col class="product-content" :span="24">
              <el-col :span="12">
                  <div class="product-property">
                      <el-col :span="12" class="item-title">可购买额度：</el-col>
                      <el-col :span="10" :offset="2" class="item-content">{{ formData.saleAmt }}</el-col>
                  </div>
                  <div class="product-property">
                      <el-col :span="12" class="item-title">起售金额：</el-col>
                      <el-col :span="10" :offset="2" class="item-content">{{ formData.minBidsAmountByIndi }}</el-col>
                  </div>
                  <div class="product-property">
                      <el-col :span="12" class="item-title">单位递增金额：</el-col>
                      <el-col :span="10" :offset="2" class="item-content"> 1.00</el-col>
                  </div>
                  <div class="product-property">
                      <el-col :span="12" class="item-title">预期收益率：</el-col>
                      <el-col :span="10" :offset="2" class="item-content red">{{ formData.fundIncomeRatio }}</el-col>
                  </div>
              </el-col>

              <el-col :span="12">
                  <div class="product-property">
                      <el-col :span="12" class="item-title">产品代码：</el-col>
                      <el-col :span="10" :offset="2" class="item-content">{{ formData.fundCode }}</el-col>
                  </div>
                  <div class="product-property">
                      <el-col :span="12" class="item-title">币种：</el-col>
                      <el-col :span="10" :offset="2" class="item-content">{{ formData.currencyType }}</el-col>
                  </div>
                  <div class="product-property">
                      <el-col :span="12" class="item-title">投资起日：</el-col>
                      <el-col :span="10" :offset="2" class="item-content">{{ (formData.fundStartDate + '').replace(/(\d{4})?(\d{2})?(\d{2})?/,'$1-$2-$3') }}</el-col>
                  </div>
                  <div class="product-property">
                      <el-col :span="12" class="item-title">购买日期：</el-col>
                      <el-col :span="10" :offset="2" class="item-content">{{ myDate }}</el-col>
                  </div>
              </el-col>
          </el-col>
          <el-col class="product-content" :span="24">
            <!-- <div id="myChart" :style="{width: '300px', height: '300px'}"></div> -->
          </el-col>
          <el-col :span="24" class='product-search'>
               <hr />
               <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
                   <el-form-item>
                       <el-col :span="8" class="card-number">卡号/账号：</el-col>
                       <el-col :span="12">
                           <el-select v-model="sizeForm.card" placeholder="请选择活动区域">
                              <el-option label="6222600140004825644" value="1"></el-option>
                              <el-option label="6111600110044405582" value="2"></el-option>
                           </el-select>
                       </el-col>
                   </el-form-item>

                   <el-form-item>
                       <el-col :span="8" class="card-number">可用余额：</el-col>
                       <el-col :span="6">5,000,000,00</el-col>
                       <el-col :span="4" class="card-explain">
                           <span>资金归集</span>
                       </el-col>
                   </el-form-item>

                   <el-form-item>
                       <el-col :span="8" class="card-number">购买金额：</el-col>
                       <el-col :span="7">
                           <el-input placeholder="请输入购买金额" v-model="sizeForm.purchase"></el-input>
                       </el-col>
                   </el-form-item>

                   <el-form-item>
                       <el-col :span="8" class="card-number">推荐人编号(选填)：</el-col>
                       <el-col :span="7">
                           <el-input placeholder="请输入七位数字的交行员工编号" v-model="sizeForm.number"></el-input>
                       </el-col>
                   </el-form-item>

                   <el-form-item>
                       <el-col :span="8" class="card-number">交易密码：</el-col>
                       <el-col :span="7">
                           <el-input type="password" v-model="sizeForm.password"></el-input>
                       </el-col>
                   </el-form-item>
                   <el-form-item>
                        <el-checkbox v-model="sizeForm.checked">本人已经阅读
                            <span>
                             《产品说面书》
                            </span>
                            <span>
                                充分了解并清楚本产品的风险，愿意承担相关风险。
                            </span>
                        </el-checkbox>
                   </el-form-item>
                   <el-form-item size="large">
                       <el-row type="flex" justify="center">
                           <el-button size="small" type="primary" @click="onSubmit">购买</el-button>
                           <!-- v-on:click="onClickMe" -->
                           <el-button @click="back"  size="small">返回</el-button>
                       </el-row>
                   </el-form-item>
               </el-form>
          </el-col>
          <el-col :span="24" class="content">
            <Explain></Explain>
          </el-col>
       </div>
</template>

<script>
    import { BUY_URL } from '../../api/api.js';
    var qs = require('qs');
    var base = +new Date(1968, 9, 3);
    var oneDay = 24 * 3600 * 1000;
    var date = [];

    export default {
        name: 'buy-product',
        data() {
            return {
              /*当前日期*/
               myDate: '',
               /*防止按钮多次触发*/
                preventData: false,
                formData: {},
                /*form表单*/
                sizeForm: {
                  card: '6222600140004825644',
                  purchase: '',
                  number: '',
                  password: '',
                  checked: true,
                  delivery: false,
                  desc: ''
                },
                formData: []
            }
        },
        mounted(){
         this.$nextTick(() => {
            this.getData();
            this.purchaseDate();
           /* this.drawLine();*/
          })
        },
        computed: {
          commitData() {
                return{
                    "packLength":"",
                    "cicsCode":"WM61",
                    "appType":"52",
                    "transType":"2302",
                    "frontTransType":"522302",
                    "termCode":"ECTLBB8",
                    "transSource":"1",
                    "frontSerialNo":"0DHYH0020000085",
                    "teller":"EBB001",
                    "requestType":"T",
                    "authorLevel":"",
                    "authorTellerA":"",
                    "authorTellerB":"",
                    "authorPasswordA":"",
                    "authorPasswordB":"",
                    "authorDeviceA":"",
                    "authorDeviceB":"",
                    "authorReasonA":"",
                    "authorReasonB":"",
                    "authorReasonC":"",
                    "authorReasonD":"",
                    "authorReasonE":"",
                    "authorReasonF":"",
                    "authorReasonG":"",
                    "authorReasonH":"",
                    "authorReasonI":"",
                    "authorReasonJ":"",
                    "authorLog":"",
                    "lastLogno":"",
                    "zipFlag":"",
                    "encryptFlag":"",
                    "netCode":"01310150999",
                    "tellerLevel":"",
                    "termVersion":"",
                    "trueTeller":"",
                    "filler":"",
                    "channelType":"21",
                    "transDate":"20171116",
                    "transTime":"231100",
                    "regionCode":"01443999999",
                    "distrCode":"001",
                    "indiInst":"1",
                    "pageNo":"1",
                    "traceNo":"2017111620280930133510686480",

                    "depositAcct": this.sizeForm.card,
                    "transactionAccountPwd": this.sizeForm.password,
                    "fundChar": "",
                    "fundCode": this.formData.fundCode,
                    "applicationAmount": this.sizeForm.purchase,
                    "currencyType": this.coinCode(),
                    "cashForeignExchangeFlag":"",
                    "voucherType":"",
                    "voucherNo":"",
                    "voucherDate":"",
                    "smallAcc":"",
                    "isOpenResvAmt":"",
                    "subscriptionOff":"",
                    "periodNumber":"",
                    "customersIdentity":"",
                    "rev1":"",
                    "rev2":"",
                    "rev3":"",
                    "rev4":"",
                    "rev5":"",
                    "distriEmployee":"",
                    "merchantCode":"",
                    "coreAppSheetSerialNo":"",
                    "retrivalNo":"",
                    "otherBankDepositacct":"",
                    "custRiskLevel":"",
                    "offerSysNo":"",
                    "targetCustType":"",
                    "ebankCustNo":"",
                    "tjProjectId":"",
                    "numSeq":"",
                    "upAmount":"",
                    "vType":"",
                    "facesValue":"",
                    "beginTime":"",
                    "endTime":"",
                    "experienceDay":"",
                    "scaleType":"",
                    "cardSeq":"",
                    "accInputMode":"",
                    "wuWuYu":"",
                    "wuWuYuLength":"",
                    "track2":"",
                    "secretPwd":"",
                    "telAcpFlag":"",
                    "douMessId":"",
                    "endDate":""
                }
          },
          repurchaseIndex(){
            return this.$store.state.repurchaseIndex;
          },
          repurchaseData(){
            return this.$store.state.searchData;
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
                console.log(this.commitData)
                if(this.preventData){ return }
                this.preventData = true;

                let reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
                if( !reg.test(this.sizeForm.purchase) ){
                  this.$alert('请输入正确的数字，最多保留两位小数','购买金额')
                  return
                }
                /*this.$axios.get('http://192.168.191.1:8082/static/json/buy-product.json', {}
                )*/
                this.$axios.post(BUY_URL, qs.stringify(this.commitData)
                )
                .then((res) => {
                    this.preventData = false;
                    let productExist = res.data.replyInformation;
                    let allData = res.data.redemResult;

                    if(productExist.responseCode == 'WM0000'){
                        this.$alert('购买成功！', '', {
                          confirmButtonText: '返回',
                          callback: action => {
                              this.$router.go(-1);
                          }
                        });

                    }else{
                       this.$alert('购买失败，请返回重新购买！');
                    }

                }).catch(function(err) {
                    _this.$alert('网络错误！')
                })
            },
            coinCode() {
                 switch( this.formData.currencyType )
                {
                    case '人民币':
                        return '156';
                        break;
                    case '日元':
                        return '392';
                        break;
                    case '美元':
                        return '840';
                        break;
                    case '澳元':
                        return '156';
                        break;
                    case '加元':
                        return '158';
                        break;
                    case '瑞郎':
                        return '250';
                        break;
                    case '欧元':
                        return '954';
                        break;
                    case '英镑':
                        return '826';
                        break;
                    case '港币':
                        return '344';
                        break;
                }

            },
            /* drawLine(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('myChart'))
                // 绘制图表
                myChart.setOption({
                    title: { text: '在Vue中使用echarts' },
                    tooltip: {},
                    xAxis: {
                        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                    },
                    yAxis: {},
                    series: [{
                        name: '销量',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20]
                    }]
                });
            },*/
            back(){
              this.$router.go(-1);
            },
            purchaseDate(){
              let myDate = new Date();
              let str = myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate();
              this.myDate = str;
            }
        }
}
</script>
<style scoped lang='sass'>
    @import "../../css/mine.scss";
    @import "../../css/mine_repurchase.scss";
</style>