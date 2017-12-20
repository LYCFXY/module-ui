<template>
    <el-row id="product-select-container" type="flex" justify="center">
        <div class="product-container">
            <el-col :span="24" class='product-search'>
                <el-col :span="3" class="card-number">卡号/账号：</el-col>
                <!-- 卡号选择 -->
                <el-col :span="11" size="8">
                    <el-select v-model="cartvalue" @change="changeCard" placeholder="请选择">
                        <el-option
                            v-for="item in card"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            >
                            <span style="float: left">{{ item.label }}</span>
                            <span style="float: right; color: #8492a6; font-size: 13px"></span>
                        </el-option>
                    </el-select>
                </el-col>
            </el-col>
            <el-col :span="24" class='product-search deal-type'>
                <el-col :span="3" class="type-text">交易类型：</el-col>
                <el-col :span="4">
                    <el-select size="small" v-model="dealvalue" placeholder="请选择">
                        <el-option
                            v-for="item in deal"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            <span style="float: left">{{ item.label }}</span>
                            <span style="float: right; color: #8492a6; font-size: 13px"></span>
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="3" class="type-text">交易日期：</el-col>
                <el-date-picker
                  v-model="dataRange"
                  type="daterange"
                  size="small"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
                <el-button size="small" type="primary" @click="commit" class="deal-confirm">确认</el-button>
            </el-col>
            <el-col :span="24" class="content">
                <el-col class="self-sign">
                    <div class="sign-box">
                        <div class="self-revise">
                            <p class="sign-memory">我的签约记录</p>
                            <el-table
                              :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                              style="width: 100%">
                              <el-table-column
                                prop="fundName"
                                label="产品名称">
                              </el-table-column>
                              <el-table-column
                                prop="fundCode"
                                label="产品代码">
                              </el-table-column>
                              <el-table-column
                                prop="transactionDate"
                                label="交易申请日期">
                              </el-table-column>
                              <el-table-column
                                prop="fundChar"
                                label="产品类型">
                              </el-table-column>
                              <el-table-column
                                prop="applicationVol"
                                label="申请金额">
                              </el-table-column>
                              <el-table-column
                                prop="cfmAmount"
                                label="确认金额">
                              </el-table-column>
                              <el-table-column
                                prop="transStat"
                                label="交易状态">
                              </el-table-column>
                             <el-table-column
                              fixed="right"
                              label="操作">
                              <template slot-scope="scope">
                                <el-button
                                  @click.native.prevent="deleteRow(scope.$index, tableData.slice((currentPage-1)*pagesize,currentPage*pagesize))"
                                  size="small"
                                  >
                                  撤销
                                </el-button>
                            </template>
                            </el-table-column>
                            </el-table>
                            <div class="product-pagination block">
                            <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="currentPage"
                                :page-sizes="[10, 20, 30, 40]"
                                :page-size="pagesize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="totalCount">
                            </el-pagination>
                            </div>
                        </div>
                        <el-row type="flex" class="confirm" justify="center">
                            <el-button type="warning" size="small">下载</el-button>
                            <el-button type="warning" size="small">打印</el-button>
                        </el-row>
                        </div>
                        <Explain></Explain>
                </el-col>
            </el-col>
        </div>
    </el-row>
</template>

<script>
    var qs = require('qs');
    import { DEAL_URL } from '../api/api.js';
    import { DEAL_REPEAL_URL } from '../api/api.js';
    export default {
        name: 'home',
        data() {
            return {
                /*交易流水号*/
                repealNumber: '',
                /*交易明细查询数据*/
                tableData: [],
                /*撤销返回数据*/
                tableRepeal: [],
                input: '',
                /*分页设置*/
                pagesize: 10,
                totalCount: 0,
                currentPage: 1,
                isHidden:true,
                /*卡号账号选择*/
                card: [{
                  value: '6222600140004825644',
                  label: '6222600140004825644'
                }, {
                  value: '6111 6001 1004 4405 582',
                  label: '6111 6001 1004 4405 582'
                }],
                cartvalue: '6222600140004825644',
                /*交易类型*/
                deal: [{
                  value: '',
                  label: '不限'
                }, {
                  value: '2',
                  label: '购买'
                }, {
                  value: '3',
                  label: '赎回'
                }],
                dealvalue: '',
                /*交易日期范围*/
                dataRange: [new Date, new Date],
                /*防止按钮多次触发*/
                preventData: false
            }
        },
        computed: {
            /*交易明细查询发送的字段*/
            commitData() {
                return  {
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
                        "transDate": "20171025",
                        "authorReasonG": "",
                        "authorReasonH": "",
                        "zipFlag": "",
                        "authorReasonI": "",
                        "authorReasonJ": "",
                        "netCode": "01310150999",
                        "transTime": "231100",
                        "requestType": "T",
                        "teller": "EBB001",
                        "frontTransType": "522403",
                        "termVersion": "",
                        "tellerLevel": "",
                        "authorPasswordA": "",
                        "authorPasswordB": "",
                        "transType": "2403",
                        "filler": "",
                        "lastLogno": "",
                        "termCode": "ECTLBB8",
                        "endDate": this.getdate(1),
                        "fundCode": "", //产品代码
                        "transMode": this.dealvalue, //交易类型 1认购，2申购，3赎回，4撤销，5预约赎回
                        "depositAcct": this.cartvalue,
                        "fundChar": "", //产品类型
                        "startDate": this.getdate(0)
                }
            },
            /*撤销发送的字段*/
            repealData() {
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
                "transDate": "20171025",
                "authorReasonG": "",
                "authorReasonH": "",
                "zipFlag": "",
                "authorReasonI": "",
                "authorReasonJ": "",
                "netCode": "01310150999",
                "transTime": "231100",
                "requestType": "T",
                "teller": "EBB001",
                "frontTransType": "522304",
                "termVersion": "",
                "tellerLevel": "",
                "authorPasswordA": "",
                "authorPasswordB": "",
                "transType": "2304",
                "filler": "",
                "lastLogno": "",
                "termCode": "ECTLBB8",

                "voucherType":"",
                "voucherNo":"",
                "depositAcct": this.cartvalue,
                "transactionAccountPwd":"",
                "originalAppSheetNo": this.repealNumber
                }
            }
        },
        mounted(){
            this.$nextTick(() => {

            })
        },
        methods:{
            disableTouch(event){
                alert(event.target.tagName)
            },
            commit(){
                if(this.preventData){ return }
                this.preventData = true;
                console.log(this.commitData)
                /*http://192.168.27.129:8082/queryTransactionNet*/
                this.$axios.post(DEAL_URL, qs.stringify(this.commitData)
                )
                .then((res) => {
                    this.tableData = res.data.queryTransactionResult;
                    this.totalCount = res.data.queryTransactionResult.length;
                    this.preventData = false;
                    var _this = this;
                    this.tableData.map((value) => {
                        if(value.fundChar == '001' || value.fundChar == '002' || value.fundChar == '003'){
                            return value.fundChar = '活期'
                        }else{
                            return  value.fundChar = '定期'
                        }
                    })


                    this.tableData.map((value) => {

                        switch( value.transStat )
                        {
                            case '0':
                                return value.transStat = '未上报';
                                break;

                            case '1':
                                return value.transStat = '上报未确认';
                                break;

                            case '2':
                                return value.transStat = '成功';
                                break;

                            case '3':
                                return value.transStat = '失败';
                                break;

                            case '4':
                                return value.transStat = '确认未完成';
                                break;

                            case '5':
                                return value.transStat = '已撤销';
                                break;

                            case '6':
                                return value.transStat = '抹帐';
                                break;

                            case '7':
                                return value.transStat = '确认成功';
                                break;

                            case '8':
                                return value.transStat = '确认失败';
                                break;
                        }

                    })
                    return this.tableData;
                }).catch(function(err){
                    _this.$alert(err)
                })
            },
            getdate (index){
                if(this.dataRange[index]){
                    let d = new Date(this.dataRange[index]);
                    let date = `${d.getFullYear()}${(d.getMonth() + 1) > 10 ?'' + (d.getMonth() + 1):'0' + (d.getMonth() + 1)}${d.getDate() > 10 ?'' + d.getDate():'0' + d.getDate()}`;
                    return date;
                }else{
                    return '';
                }
            },
            dateFormat(date){
                return (date > 10 ? '' + date : '0' + date);
            },
            search:function(){
                this.isHidden=!this.isHidden;
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
                console.log(this.$router.options.routes)
            },
            /*撤销*/
            deleteRow(index, rows) {

                rows[index].transStat = "已撤销";

                this.repealNumber = rows[index].oriAppSheetSerialNo;

                this.$axios.post(DEAL_REPEAL_URL, qs.stringify(this.repealData)
                ).then((res) => {
                    this.tableRepeal = res.data.revokeResult;
                }).catch(function(err){
                    alert(err)
                })

            },
            changeCard(){
                this.tableData.length = 0;
            },
//          分页
//          //每页显示数据量变更
            handleSizeChange(val) {
                this.pagesize = val;
            },
            handleCurrentChange(val) {
                this.currentPage = val;
            }
        }
    }
</script>
<style scoped lang='sass'>
    @import "../css/deal.scss"
</style>