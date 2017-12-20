<template>
    <el-row id="product-select-container" type="flex" justify="center">
        <div class="product-container">
            <el-col :span="24">
                <div class="payment-card">扣款卡号：<span>{{ paymentNumber }}</span></div>
                <h2>您可签约的自动转入开放式理财产品列表</h2>
            </el-col>
            <el-col class="tableList" :span="24">

                <el-table
                  border
                  ref="singleTable"
                  :data="tableData.slice((currentPage-1)*pagesize, currentPage*pagesize)"
                  highlight-current-row
                  @current-change="handleCurrentChange"
                  style="width: 100%">
                  <el-table-column label="选中">
                      <template scope="scope">
                          <el-radio  class="radio" v-model="radio" :label="scope.$index + 1"></el-radio>
                      </template>
                  </el-table-column>

                  </el-table-column>
                  <el-table-column
                    property="fundName"
                    label="产品名称">
                  </el-table-column>
                  <el-table-column
                    property="fundChar"
                    label="产品类型">
                  </el-table-column>
                  <el-table-column
                    property="fundLevel"
                    label="风险等级">
                  </el-table-column>
                  <el-table-column
                    property="currencyType"
                    label="币种">
                  </el-table-column>
                  <el-table-column
                    property="minBidsAmountByIndi"
                    label="起售金额">
                  </el-table-column>
                  <el-table-column
                    property="address"
                    label="追加金额">
                  </el-table-column>
                  <el-table-column
                    property="fundIncomeRatio"
                    label="预期收益率">
                  </el-table-column>
                </el-table>

                <div class="product-pagination block">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange2"
                        :current-page="currentPage"
                        :page-sizes="[40, 80, 120, 160]"
                        :page-size="100"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalCount">
                    </el-pagination>
                </div>
            </el-col>

            <el-col :span="24" class='product-search'>
               <hr />
               <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
                   <el-form-item>
                       <el-col :span="8" class="card-number">定投金额：</el-col>
                       <el-col :span="7">
                           <el-input placeholder="请输入购买金额" v-model="sizeForm.purchase"></el-input>
                       </el-col>
                   </el-form-item>

                   <!--  <el-form-item>
                      <el-col :span="8" class="card-number">卡余额：</el-col>
                      <el-col :span="6">5,000,000,00</el-col>
                   </el-form-item>

                   <el-form-item>
                      <el-col :span="8" class="card-number">持有金额/份额：</el-col>
                      <el-col :span="6">5,000,000,00</el-col>
                   </el-form-item> -->

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
                           <el-button size="small" type="primary" @click="onSubmit">提交</el-button>
                           <!-- v-on:click="onClickMe" -->
                           <el-button @click="back"  size="small">返回</el-button>
                           <!-- <el-button @click="selectProduct"  size="small">看看序号</el-button> -->
                       </el-row>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="24" class="content">
                <Explain></Explain>
            </el-col>
        </div>
    </el-row>
</template>

<script>
    var qs = require('qs');
    import { SEARCH_URL } from '../../api/api.js';
    import { SELF_SUBMIT_URL } from '../../api/api.js';
    export default {
        name: 'cutPayment',
        data() {
            return {
                tableData: [],
                currentRow: null,
                radio: '',
                 /*分页*/
                pagesize: 10,
                totalCount: 0,
                currentPage: 1,

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
            }
        },
        mounted(){
         this.$nextTick(() => {
            this.selfBuyResult();
          })
        },
        computed: {
          searchData() {
            return {
                    "frontSerialNo": "0DHYH0020000085",
                    "cicsCode": "WM61",
                    "distrCode": "001",
                    "transSource": "1",
                    "traceNo": "2017111620280930133510686480",
                    "indiInst": "1",
                    "authorLog": "",
                    "channelType": "21",
                    "encryptFlag": "",
                    "packLength": "",
                    "authorDeviceA": "",
                    "authorReasonC": "",
                    "authorTellerA": "",
                    "authorDeviceB": "",
                    "authorReasonD": "",
                    "authorTellerB": "",
                    "authorReasonE": "",
                    "regionCode": "01310999999",
                    "authorReasonF": "",
                    "trueTeller": "",
                    "appType": "52",
                    "authorLevel": "",
                    "authorReasonA": "",
                    "pageNo": "1",
                    "authorReasonB": "",
                    "transDate": "20171116",
                    "authorReasonG": "",
                    "authorReasonH": "",
                    "zipFlag": "",
                    "authorReasonI": "",
                    "authorReasonJ": "",
                    "netCode": "01310150999",
                    "transTime": "231100",
                    "requestType": "T",
                    "teller": "EBB001",
                    "frontTransType": "522401",
                    "termVersion": "",
                    "tellerLevel": "",
                    "authorPasswordA": "",
                    "authorPasswordB": "",
                    "transType": "2401",
                    "filler": "",
                    "lastLogno": "",
                    "termCode": "ECTLBB8",
                    "endDate": "",
                    "fundCode": "",
                    "transMode": "0",
                    "depositAcct": "",
                    "fundChar": "005",
                    "startDate": "",
                    "currencyCode": "",
                    "fundLevel": "",
                    "minSubsAmountByIndi": ""
            }
          },
          commitData() {
            return {
              "packLength":"",
              "cicsCode":"WM61",
              "appType":"52",
              "transType":"2307",
              "frontTransType":"522307",
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
              "trandMode":"0",
              "depositAcct": this.paymentNumber,
              "transactionAccountPwd":"",
              "investorName":"",
              "certificateType":"",
              "certificateNo":"",
              "appointCustType":"",
              "fundChar":"",
              "fundCode": this.fundCode(),
              /*this.tableData[(this.radio-1)].fundCode*/
              "fundName": "",
              "currencyType": this.coinCode(),
              "cashForeignExchangeFlag":"",
              "deductMode":"",
              "applicationAmount": this.sizeForm.purchase, //定投金额
              "firstAmount": "100",
              "appDate":"",
              "frequency":"",
              "status":"",
              "lotNo":"",
              "startDate":"",
              "endDate":"",
              "updateDate":"",
              "distriEmployee":"",
              "distriEmployeeName":"",
              "recommendPeople":"",
              "protocolAppSheetSerialNo":"",
              "updateTime":"",
              "maxSubsAmountByIndi":"",
              "minSubsAmountByIndi":"",
              "indiAppSubsAmount":"",
              "minBidsAmountByIndi":"",
              "fundLevel":"",
              "maxratio":"",
              "minratio":"",
              "custLevel":"",
            }
          },
          paymentNumber() {
            return this.$store.state.selectedCard;
          }
        },
        methods: {
            selectProduct() {
              alert(this.radio)
            },
            selfBuyResult() {
                if(this.radio == ''){
                  return
                }
                var _this = this;
                /*this.$axios.get('http://192.168.191.1:8082/static/json/buy.json',{})*/
                this.$axios.post(SEARCH_URL, qs.stringify(this.searchData)
                )
                .then((res) => {
                    let allData = res.data.queryFundInfoResult;
                    this.totalCount = res.data.queryFundInfoResult.length;

                    allData.map((value) => {
                         /*产品类型*/
                        if(value.fundChar == '001' || value.fundChar == '002' || value.fundChar == '003'){
                            return value.fundChar = '活期类'
                        }else{
                            return  value.fundChar = '定期类'
                        }

                    })

                    allData.map((value) => {
                        /*币种*/
                        if(value.currencyType == "CNY"){
                            return value.currencyType = '人民币'
                        }else{
                            return  value.currencyType = '外币'
                        }
                    })

                    allData.map((value) => {
                        /*风险等级*/
                        switch( value.fundLevel )
                        {
                            case '1R':
                                return value.fundLevel = '极低风险';
                                break;
                            case '2R':
                                return value.fundLevel = '低风险';
                                break;
                            case '3R':
                                return value.fundLevel = '较低风险';
                                break;
                            case '4R':
                                return value.fundLevel = '中等风险';
                                break;
                            case '5R':
                                return value.fundLevel = '较高风险';
                                break;
                            case '6R':
                                return value.fundLevel = '较高风险';
                                break;
                        }
                    })

                    allData.map((value) => {
                        /*起息日终止日期计算*/
                        let sDate = new Date( (value.fundStartDate + '').replace(/(\d{4})?(\d{2})?(\d{2})?/,'$1,$2,$3'))
                        let eDate = new Date( (value.fundEndDate + '').replace(/(\d{4})?(\d{2})?(\d{2})?/,'$1,$2,$3'))
                        let fundDate = parseInt(Math.abs(eDate  -  sDate)  /  1000  /  60  /  60  /24);
                        if(fundDate >= 365){
                            fundDate =  Math.floor(fundDate/365) + '年' + Math.floor(fundDate%365) + '天';
                        }else{
                            fundDate = fundDate + '天';
                        }

                        this.$set(value, "deadline", fundDate)
                    })

                    this.tableData = allData;
                    return this.tableData;
                }).catch(function(err) {
                    _this.$alert("网络错误！")
                })
            },
            coinCode() {
                if(this.radio == ''){
                  return
                }
                switch( this.tableData[(this.radio-1)].currencyType )
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
            fundCode() {
              if(this.radio == ''){
                return ''
              }else{
                return this.tableData[(this.radio-1)].fundCode
              }
            },
            /*单选*/
            setCurrent(row) {
                this.$refs.singleTable.setCurrentRow(row);
              },
            handleCurrentChange(val) {
                this.currentRow = val;
            },
            /*分页*/
            handleSizeChange(val) {
                this.pagesize = val;
            },
            handleCurrentChange2(val) {
                /*this.currentPage = val;*/
            },
            back() {
              this.$router.go(-1);
            },
            onSubmit() {

                if(!this.radio){
                  this.$alert("请选择产品！")
                  return
                }
                if(this.sizeForm.purchase == ''){
                  this.$alert('请输入定投金额！')
                  return
                }
                console.log(this.commitData)
                var _this = this;
                this.$axios.post(SELF_SUBMIT_URL, qs.stringify(this.commitData)
                )
                .then((res) => {

                    let productExist = res.data.replyInformation;
                    let allData = res.data.redemResult;

                    if(productExist.responseCode == 'WM0000'){
                        this.$alert('提交成功！', '', {
                          confirmButtonText: '返回',
                          callback: action => {
                              this.$router.go(-1);
                          }
                        });

                    }else{
                       this.$alert('提交失败，请返回重新提交！');
                    }

                }).catch(function(err) {
                    _this.$alert('网络错误！')
                })
            }
        }

    }
</script>
<style scoped lang='sass'>
    @import "../../css/self_cutpayment.scss"
</style>