<template>
    <el-row id="product-select-container" type="flex" justify="center">
        <!-- <el-col :span="14"> -->
        <div class="product-container">
            <el-col :span="24" class='product-search'>
                <el-col :span="4" :offset="4" >产品名称/代码：</el-col>
                <el-col :span='8'>
                    <el-input style="width: 240px;" placeholder="请输入产品名称/代码" v-model="searchContent">
                    </el-input>
                </el-col>
                <el-col :span="8">
                    <el-button @click="searchResult" type="primary" style="width: 90px;">查询</el-button>
                    <el-button type="primary" @click="search" v-if="isHidden">筛选<i class="el-icon-caret-bottom"></i></el-button>
                    <el-button type="primary" @click="search" v-else="isHidden">筛选<i class="el-icon-caret-top"></i></el-button>
                </el-col>
            </el-col>
            <el-col :span="24" class="screen">
                <!--隐藏的筛选内容-->
                <div :style="{'display':isHidden ? 'none' : 'block'}" id="product-search-hidden" class="product-search-hidden">
                    <span class="demonstration">购买起止日期</span>
                    <el-date-picker
                      v-model="dataRange"
                      type="daterange"
                      size="small"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                    </el-date-picker>
                    <span>币种</span>
                    <el-select size='small' v-model="valueCoin" placeholder="请选择">
                        <el-option
                            v-for="item in money"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            <span style="float: left">{{ item.label }}</span>
                            <span style="float: right; color: #8492a6; font-size: 13px"></span>
                        </el-option>
                    </el-select>
                    <div style="margin-top: 10px;">
                        <span style="padding-left: 10px;">产品类型：</span>
                        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">不限</el-checkbox>
                        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                            <el-checkbox  v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                        </el-checkbox-group>
                    </div>
                    <div style="margin-top: 10px;">
                        <span style="padding-left: 10px;">风险等级：</span>
                        <el-checkbox :indeterminate="isIndeterminate1" v-model="checkAll1" @change="handleCheckAllChange1">不限</el-checkbox>
                        <el-checkbox-group v-model="checkedCities1" @change="handleCheckedCitiesChange1">
                            <el-checkbox v-for="city in cities1" :label="city" :key="city">{{city}}</el-checkbox>
                        </el-checkbox-group>
                    </div>
                    <div style="margin-top: 10px;">
                        <span style="padding-left: 10px;">起购金额：</span>
                        <el-checkbox :indeterminate="isIndeterminate2" v-model="checkAll2" @change="handleCheckAllChange2">不限</el-checkbox>
                        <el-checkbox-group v-model="checkedCities2" @change="handleCheckedCitiesChange2">
                        <el-checkbox v-for="city in cities2" :label="city" :key="city">{{city}}</el-checkbox>
                       </el-checkbox-group>
                    </div>
                    <!-- <div style="margin-top: 10px;">
                        <span style="padding-left: 10px;">投资期限：</span>
                        <el-checkbox :indeterminate="isIndeterminate3" v-model="checkAll3" @change="handleCheckAllChange3">不限</el-checkbox>
                        <el-checkbox-group v-model="checkedCities3" @change="handleCheckedCitiesChange3">
                        <el-checkbox v-for="city in cities3" :label="city" :key="city">{{city}}</el-checkbox>
                      </el-checkbox-group>
                    </div> -->
                </div>
            </el-col>
            <el-col :span="24" class="content" style="padding-left: 0;padding-right: 0;">
                    <el-tabs type="border-card" class="tags">
                        <el-tab-pane label="得利宝理财">
                            <div class="product-sort" style="padding-left: 0;padding-right: 0;">
                                <span  @click="toggle" v-if="isShow">预期收益率<i class="el-icon-caret-top"></i></span>
                                <span  @click="toggle" v-else="isShow">预期收益率<i class="el-icon-caret-bottom"></i></span>
                                <span>投资期限<i class="el-icon-caret-bottom"></i></span>
                                <span>起售金额<i class="el-icon-caret-bottom"></i></span>
                                <span class="product-comparison clearfix">产品比较</span>
                            </div>
                            <table cellspacing="0" cellpadding="0" class="product-list">
                                <tr class="search-list" v-for="(item, index) in tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)">
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
                                        <div class="product-title">{{ item.fundIncomeRatio }}</div >
                                        <div class="product-content">预期收益率</div>
                                    </td>
                                    <td>
                                        <div class="product-title">{{ item.minBidsAmountByIndi }}</div >
                                        <div class="product-content">起售金额</div>
                                    </td>
                                    <td>
                                        <div class="product-title">{{ item.deadline }}</div >
                                        <div class="product-date">
                                            <p>{{ '起息日：' + (item.fundStartDate + '').replace(/(\d{4})?(\d{2})?(\d{2})?/,'$1-$2-$3') }}</p>
                                            <p>{{ '到息日：' + (item.fundEndDate + '').replace(/(\d{4})?(\d{2})?(\d{2})?/,'$1-$2-$3') }}</p>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="product-title">手机银行专享</div >
                                        <div class="product-buy" @click="$goRoute(links[0].route), repurchaseGo(index)">购买</div>
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
                                    :total="totalCount">
                                </el-pagination>
                            </div>
                            <Explain></Explain>
                        </el-tab-pane>
                        <el-tab-pane label="易添利">
                            <TableTwo></TableTwo>
                        </el-tab-pane>
                        <el-tab-pane label="智慧添利">
                            <div class="product-sort" style="padding-left: 0;padding-right: 0;">
                                <span>预期收益率<i class="el-icon-caret-bottom"></i></span>
                                <span>投资期限<i class="el-icon-caret-bottom"></i></span>
                                <span>起售金额<i class="el-icon-caret-bottom"></i></span>
                            </div>
                            <table cellspacing="0" cellpadding="0" class="product-list">
                                <tr>
                                    <td>
                                        <div class="product-title">交行添利一个月(2222222222)</div>
                                        <div class="product-feture"><span>人民币</span><span>定期利</span><span class="risk">低风险</span></div>
                                    </td>
                                    <td>
                                        <div class="product-title">34天</div >
                                        <div class="product-content">投资期限</div>
                                    </td>
                                    <td>
                                        <div class="product-title">34天</div >
                                        <div class="product-content">投资期限</div>
                                    </td>
                                    <td>
                                        <div class="product-title">34天</div >
                                        <div class="product-content">投资期限</div>
                                    </td>
                                    <td>
                                        <div class="product-title">34天</div >
                                        <div class="product-content">投资期限</div>
                                    </td>
                                    <td>
                                        <div class="product-buy">签约</div>
                                    </td>
                                </tr>
                            </table>
                        </el-tab-pane>
                    </el-tabs>
            </el-col>
        </div>
        <!-- </el-col> -->
    </el-row>
</template>

<script>
    import TableTwo from './buy-table2';
    import { SEARCH_URL } from '../../api/api.js';

    var qs = require('qs');
    const cityOptions= ['活期类', '定期类']
    const cityOptions1= ['极低风险', '低风险', '较低风险', '中等风险','较高风险','高风险']
    const cityOptions2= ['5万以下', '5-600万', '10-600万', '600万以上']
    const cityOptions3= ['30天(含)以下', '31天~90天(含)', '91天~180天(含)', '181天~365天(含)','365天以上']
    export default {
        name: 'home',
        data() {
            return {
                /*搜索数据*/
                /*tableData: [],*/
                /*搜索名称*/
                searchContent: '',
                 /*防止按钮多次触发*/
                preventData: false,
                /*分页*/
                pagesize: 10,
                totalCount: 0,
                currentPage: 1,
                isShow:false,
                isHidden:true,
                dataRange: '',
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
                links: [
                    {
                      text: '购买',
                      route: '/buy/buy-product'
                    }
                ],
                valueCoin: '',
                checkAll: false,
                checkAll1: false,
                checkAll2: false,
                checkAll3: false,
                /*产品类型fundChar*/
                checkedCities: [],
                /*风险等级*/
                checkedCities1: [],
                /*起购金额*/
                checkedCities2: [],
                checkedCities3: [],
                cities: cityOptions,
                cities1: cityOptions1,
                cities2: cityOptions2,
                cities3: cityOptions3,
                isIndeterminate: true,
                isIndeterminate1: true,
                isIndeterminate2: true,
                isIndeterminate3: true
            }
        },
        components: { TableTwo },
        mounted(){
          this.$nextTick(() => {
            this.getTotalCount();
          })
        },
        computed: {
            tableData: {
              get(){
                return this.$store.state.searchData;
              },
              set(data){
                return this.$store.commit('searchData', data)
              }
            },
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
                    "endDate": this.getdate(1),
                    "fundCode": this.searchContent.trim(),
                    "transMode": "0",
                    "depositAcct": "6222600610018764161",
                    "fundChar": this.fundChar(),
                    "startDate": this.getdate(0),
                    "currencyCode": this.coinCode(),
                    "fundLevel": this.fundLevel(),
                    "minSubsAmountByIndi": this.minSubsAmountByIndi()
                }
            }
        },
        methods:{
            searchResult() {

                var _this = this;
                this.$axios.post(SEARCH_URL, qs.stringify(this.searchData)
                )
                /*this.$axios.get('http://192.168.191.1:8082/static/json/buy.json', {})*/
                .then((res) => {
                    let productExist = res.data.replyInformation;
                    if(productExist.responseCode == 'WM1000'){
                        this.$alert('没有查到相关产品');
                        return
                    }
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
                   _this.$alert('网络错误')
                })

            },
            getTotalCount () {
                this.totalCount = this.tableData.length;
                console.log(this.totalCount)
            },
            getdate(index) {
                if(this.dataRange[index]){
                    let d = new Date(this.dataRange[index]);
                    let date = `${d.getFullYear()}${(d.getMonth() + 1) > 10 ?'' + (d.getMonth() + 1):'0' + (d.getMonth() + 1)}${d.getDate() > 10 ?'' + d.getDate():'0' + d.getDate()}`;
                    return date;
                }else{
                    return '';
                }
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
            /*fundChar转换*/
            fundChar() {
                if(this.checkedCities.length = 1 && this.checkedCities[0] == '活期类'){
                    let result = '001';
                    return result;
                } else if (this.checkedCities.length = 1 && this.checkedCities[0] !== '活期类'){
                    let resultElse = '002';
                    return resultElse;
                } else {
                    return '';
                }
            },
            /*风险等级*/
            fundLevel() {
                let levelResult = this.checkedCities1;
                if(levelResult.length != 0){
                    let data = levelResult.map((item) => {
                        switch( item )
                        {
                            case '极低风险':
                                item = '1R';
                                break;
                            case '低风险':
                                item = '2R';
                                break;
                            case '较低风险':
                                item = '3R';
                                break;
                            case '中等风险':
                                item = '4R';
                                break;
                            case '较高风险':
                                item = '5R';
                                break;
                            case '高风险':
                                return '6R';
                                break;
                        }
                        return item;
                     })
                    return data;
                }else{
                    return '';
                }
            },
            /*起购金额*/
            minSubsAmountByIndi(){
                let indiResult = this.checkedCities2;
                if(indiResult.length != 0 && indiResult.length != 4){
                    let data = this.checkedCities2.map((item) => {
                        switch( item )
                        {
                            case '5万以下':
                                item = '5';
                                break;
                            case '5-600万':
                                item = '5-6';
                                break;
                            case '10-600万':
                                item = '10-600';
                                break;
                            case '600万以上':
                                item = '600';
                                break;
                        }
                        return item;
                    })
                    return data;
                }else{
                    return '';
                }
            },
            toggle:function() {
                this.isShow=!this.isShow
            },
            search:function() {
                this.isHidden=!this.isHidden;
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
                console.log(this.$router.options.routes)
            },
            /*分页*/
            handleSizeChange(val) {
                this.pagesize = val;
            },
            handleCurrentChange(val) {
                this.currentPage = val;
            },
             //赎回序号
            repurchaseGo(index){
              this.$store.commit('repurchaseIndex', index);
            },
            /*筛选*/
             handleCheckAllChange(val) {
                this.checkedCities = val ? cityOptions : [];
                this.isIndeterminate = false;
              },
              handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.cities.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
              },
               handleCheckAllChange1(val) {
                this.checkedCities1 = val ? cityOptions1 : [];
                this.isIndeterminate1 = false;
              },
              handleCheckedCitiesChange1(value) {
                let checkedCount1 = value.length;
                this.checkAll1 = checkedCount1 === this.cities1.length;
                this.isIndeterminate1 = checkedCount1 > 0 && checkedCount1 < this.cities1.length;
              },
               handleCheckAllChange2(val) {
                this.checkedCities2 = val ? cityOptions2 : [];
                this.isIndeterminate2 = false;
              },
              handleCheckedCitiesChange2(value) {
                let checkedCount2 = value.length;
                this.checkAll2 = checkedCount2 === this.cities2.length;
                this.isIndeterminate2 = checkedCount2 > 0 && checkedCount2 < this.cities2.length;
              },
               handleCheckAllChange3(val) {
                this.checkedCities3 = val ? cityOptions3 : [];
                this.isIndeterminate3 = false;
              },
              handleCheckedCitiesChange3(value) {
                let checkedCount3 = value.length;
                this.checkAll3 = checkedCount3 === this.cities3.length;
                this.isIndeterminate3 = checkedCount3 > 0 && checkedCount3 < this.cities3.length;
              }

        }
    }
</script>
<style scoped lang='sass'>
    @import "../../css/buy.scss"
</style>