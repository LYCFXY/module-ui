<template>
    <el-row id="product-select-container" type="flex" justify="center">
       <div class="product-container">
            <el-col :span="24" class='product-search'>
                <el-col :span="3" :offset="3">卡号/账号：</el-col>
                <el-col :span="8" size="8">
                    <el-select @change="changeCard" v-model="valueCard" placeholder="请选择">
                        <el-option
                            v-for="item in cities"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            <span style="float: left">{{ item.label }}</span>
                            <span style="float: right; color: #8492a6; font-size: 13px"></span>
                        </el-option>
                    </el-select>
                </el-col>

                <el-col :span="2" class="money">币种: </el-col>
                <el-col :span="4">
                    <el-select v-model="valueCoin" placeholder="请选择">
                        <el-option
                            v-for="item in money"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            <span style="float: left">{{ item.label }}</span>
                            <span style="float: right; color: #8492a6; font-size: 13px"></span>
                        </el-option>
                    </el-select>
                </el-col>
            </el-col>
            <el-col :span="24" class="content" style="padding-left: 0;padding-right: 0;">
                    <el-tabs type="border-card" class="tags">
                        <el-tab-pane label="得利宝理财">
                            <div class="product-earnings" style="padding-left: 0;padding-right: 0;">
                                <el-col :span="12" :offset="4">
                                   <p class="earnings-title">当前 <span>{{ valueCoin }}</span> 得利宝获利总额</p>
                                   <p class="rmb-number">0.00</p>
                                </el-col>
                                <el-col :span="8">
                                   <p class="earnings-title">至今预计总收益</p>
                                   <p class="earnings-number"></p>
                                </el-col>
                            </div>
                            <table cellspacing="0" cellpadding="0" class="product-list product-manage">
                              <!--  <p class="search-reminder" >没有符合查询条件的记录!</p> -->
                               <tr class="search-list" v-for="(item, index) in tableData">
                                   <td>
                                      <div class="product-title">
                                            {{ item.fundName }}
                                      </div>
                                      <div class="product-feture">
                                          <span>{{ item.currencyType }}</span>
                                          <span>{{ item.fundChar }}</span>
                                          <span>{{ item.fundLevel }}</span>
                                      </div>
                                   </td>
                                   <td>
                                       <div class="product-title">{{ item.deadline }}</div >
                                       <div class="product-content">投资期限</div>
                                   </td>
                                   <td>
                                       <div class="product-title">{{ item.minAccountBalance }}</div >
                                       <div class="product-content">持有金额/份额</div>
                                   </td>
                                   <td>
                                       <div class="product-title">{{ item.availVol }}</div >
                                       <div class="product-content">可用份额</div>
                                   </td>
                                   <td>
                                       <div class="product-title red">{{ item.guestRatio }}</div >
                                       <div class="product-content">预期收益率</div>
                                   </td>
                                   <td>
                                       <div class="product-title red">{{ item.preGainBalance }}</div >
                                       <div class="product-content">至今预期收益</div>
                                   </td>
                                   <td>
                                       <div class="product-buy" @click="$goRoute(links[0].route), repurchaseGo(index)">
                                       再购买
                                       </div>
                                       <div v-if="item.fastFlag == 1" class="product-redeem" @click="$goRoute(links[1].route), repurchaseGo(index)">赎回</div >
                                       <!-- <div class="product-buy">质押</div>
                                       <div class="product-cancel">撤销</div > -->
                                   </td>
                               </tr>

                            </table>
                            <div class="product-pagination block">
                                <el-pagination
                                    @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange"
                                    :current-page="currentPage"
                                    :page-sizes="[10, 20, 30, 40]"
                                    :page-size="100"
                                    layout="total, sizes, prev, pager, next, jumper"
                                    :total=this.totalCount>
                                </el-pagination>
                                <div class="print"><span>打印</span></div>
                            </div>
                            <Explain></Explain>
                        </el-tab-pane>
                        <el-tab-pane label="易添利">
                            <table cellspacing="0" cellpadding="0" class="product-list product-manage">
                                <p class="search-reminder" >没有符合查询条件的记录!</p>
                                <tr class="search-list">
                                    <td>
                                        <div class="product-title" title="交行添利一个月(2222222222)">交行添利一个月(2222222222)</div>
                                        <div class="product-feture"><span>人民币</span><span>定期利</span><span>低风险</span></div>
                                    </td>
                                    <td>
                                        <div class="product-title">34天</div >
                                        <div class="product-content">投资期限</div>
                                    </td>
                                    <td>
                                        <div class="product-title">4.45%</div >
                                        <div class="product-content">预期收益率</div>
                                    </td>
                                    <td>
                                        <div class="product-title">5.00万</div >
                                        <div class="product-content">起售金额</div>
                                    </td>
                                    <td>
                                        <div class="product-title">34天</div >
                                        <div class="product-date">
                                            <p>起息日：2017-11-17</p>
                                            <p>到期日：2017-11-17</p>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="product-title">手机银行专享</div >
                                        <div class="product-buy">购买</div>
                                    </td>
                                </tr>
                            </table>
                            <div class="product-pagination block">
                                <el-pagination
                                    @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange"
                                    :current-page="currentPage"
                                    :page-sizes="[100, 200, 300, 400]"
                                    :page-size="100"
                                    layout="total, sizes, prev, pager, next, jumper"
                                    :total="400">
                                </el-pagination>
                                <div class="print"><span>打印</span></div>
                            </div>
                            <Explain></Explain>
                        </el-tab-pane>
                        <el-tab-pane label="智慧添利">
                            <table cellspacing="0" cellpadding="0" class="product-list product-manage">
                                <p class="search-reminder" >没有符合查询条件的记录!</p>
                                <tr class="search-list">
                                    <td>
                                        <div class="product-title" >交行添利一个月(2222222222)</div>
                                        <div class="product-feture"><span>人民币</span><span>定期利</span><span>低风险</span></div>
                                    </td>
                                    <td>
                                        <div class="product-title">34天</div >
                                        <div class="product-content">投资期限</div>
                                    </td>
                                    <td>
                                        <div class="product-title">4.45%</div >
                                        <div class="product-content">预期收益率</div>
                                    </td>
                                    <td>
                                        <div class="product-title">5.00万</div >
                                        <div class="product-content">起售金额</div>
                                    </td>
                                    <td>
                                        <div class="product-title">34天</div >
                                        <div class="product-date">
                                            <p>起息日：2017-11-17</p>
                                            <p>到期日：2017-11-17</p>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="product-title">手机银行专享</div >
                                        <div class="product-buy">购买</div>
                                    </td>
                                </tr>
                            </table>
                            <div class="product-pagination block">
                                <el-pagination
                                    @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange"
                                    :current-page="currentPage"
                                    :page-sizes="[100, 200, 300, 400]"
                                    :page-size="100"
                                    layout="total, sizes, prev, pager, next, jumper"
                                    :total="400">
                                </el-pagination>
                                <div class="print"><span>打印</span></div>
                            </div>
                            <Explain></Explain>
                        </el-tab-pane>
                    </el-tabs>
            </el-col>
       </div>
   </el-row>
</template>

<script>
    var qs = require('qs');
    import { MINE_URL } from '../../api/api.js';
    const cityOptions= ['专享产品', '活期类', '定期类', '结构性','外币类','私人银行']
    const cityOptions1= ['极地风险', '低风险', '较低风险', '中等风险','较高风险','高风险']
    const cityOptions2= ['5万以下', '5-600万', '10-600万', '600万以上']
    const cityOptions3= ['30天(含)以下', '31天~90天(含)', '91天~180天(含)', '181天~365天(含)','365天以上']
    export default {
        name: 'mine',
        data() {
            return {

               /*防止按钮多次触发*/
                preventData: false,
                /*tableData: [],*/
                repurchase: true,
                input: '',

                /*分页*/
                pagesize: 10,
                totalCount: 0,
                currentPage: 1,

                isHidden:true,
                checkAll: false,
                checkAll1: false,
                checkAll2: false,
                checkAll3: false,
                checkedCities: [],
                checkedCities1: [],
                checkedCities2: [],
                checkedCities3: [],
                cities: cityOptions,
                cities1: cityOptions1,
                cities2: cityOptions2,
                cities3: cityOptions3,
                isIndeterminate: true,
                isIndeterminate1: true,
                isIndeterminate2: true,
                isIndeterminate3: true,
                cities: [{
                  value: '6222600140004825644',
                  label: '6222600140004825644'
                }, {
                  value: '2',
                  label: '6111 6001 1004 4405 582'
                }],
                valueCard: '6222600140004825644',
                money: [{
                  value: '人民币',
                  label: '人民币'
                }, {
                  value: '日元',
                  label: '日元'
                }, {
                  value: '美元',
                  label: '美元'
                }, {
                  value: '澳元',
                  label: '澳元'
                }, {
                  value: '加元',
                  label: '加元'
                }, {
                  value: '瑞郎',
                  label: '瑞郎'
                }, {
                  value: '欧元',
                  label: '欧元'
                }, {
                  value: '英镑',
                  label: '英镑'
                }, {
                  value: '港币',
                  label: '港币'
                }],
                valueCoin: '人民币',
                links: [
                    {
                      text: '再购买',
                      route: '/mine/page'
                    },
                    {
                      text: '赎回',
                      route: '/mine/redeem'
                    }
                ]
            }
        },
        mounted(){
          this.$nextTick(() => {
            this.searchResult();
          })
        },
        computed: {
            tableData: {
              get(){
                return this.$store.state.tableData;
              },
              set(data){
                return this.$store.commit('setData', data)
              }
            },
            searchData() {
                return{
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
                    "frontTransType": "522402",
                    "termVersion": "",
                    "tellerLevel": "",
                    "authorPasswordA": "",
                    "authorPasswordB": "",
                    "transType": "2402",
                    "filler": "",
                    "lastLogno": "",
                    "termCode": "ECTLBB8",
                    "endDate": "",
                    "fundCode": "",
                    "transMode": "",
                    "depositAcct": this.valueCard,
                    "fundChar": "",
                    "startDate": "",
                    "currencyCode": this.coinCode()
                }
            }
        },
        methods:{
            searchResult() {
                var _this = this;
                if(this.preventData){ return }
                this.preventData = true;
                /*this.$axios.get('http://192.168.191.1:8082/static/json/mine.json', {})*/
                var _this = this;
                this.$axios.post(MINE_URL, qs.stringify(this.searchData)
                )
                .then((res) => {
                    let allData = res.data.queryBalanceResult;
                    this.totalCount = res.data.queryBalanceResult.length;
                    this.preventData = false;
                    allData.map((value) => {
                        if(value.fundChar == '001' || value.fundChar == '002' || value.fundChar == '003'){
                            return value.fundChar = '活期类'
                        }else{
                            return  value.fundChar = '定期类'
                        }

                    })

                    allData.map((value) => {

                        if(value.currencyType == "CNY"){
                            return value.currencyType = '人民币'
                        }else{
                            return  value.currencyType = '外币'
                        }
                    })

                    allData.map((value) => {

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
                        let sDate = new Date( (value.fundStartDate + '').replace(/(\d{4})?(\d{2})?(\d{2})?/,'$1,$2,$3'));
                        let eDate = new Date( (value.fundEndDate + '').replace(/(\d{4})?(\d{2})?(\d{2})?/,'$1,$2,$3'));
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
                   _this.$alert('网络错误！')
                })
            },
            /*币种代码*/
            coinCode() {
                  switch( this.valueCoin )
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
            listenToMyBoy: function (somedata){
              alert(somedata);
            },
            search:function(){
                this.isHidden =! this.isHidden;
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
                console.log(this.$router.options.routes)
            },
            //分页
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            //赎回
            repurchaseGo(index){
              this.$store.commit('repurchaseIndex', index);
            },
            changeCard(){
                this.tableData.length = 0;
                this.searchResult();
            }

        }
    }
</script>
<style scoped lang='sass'>
    @import "../../css/mine.scss";
</style>