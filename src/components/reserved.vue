<template>
    <el-row id="product-select-container" type="flex" justify="center">
        <div class="product-container">
            <el-col :span="24" class='product-search'>
                <el-col :span="3" class="card-number">卡号/账号：</el-col>
                <!-- 卡号选择 -->
                <el-col :span="11" size="8">
                    <el-select v-model="cartvalue" placeholder="请选择">
                        <el-option
                            v-for="item in card"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            <span style="float: left">{{ item.label }}</span>
                            <span style="float: right; color: #8492a6; font-size: 13px"></span>
                        </el-option>
                    </el-select>
                </el-col>
            </el-col>
            <el-col :span="24" class="content">
                <el-col class="self-sign">
                    <div class="sign-box">
                        <p class="reminder">现在没有可以通过网银购买的预留额度产品!</p>
                        <!-- <div class="self-revise">
                            <p class="sign-memory">我的签约记录</p>
                            <table cellspacing="0" cellpadding="0" class="product-list product-manage">
                            <tr class="search-list">
                                <td>
                                    <div class="product-title" >产品名称</div>
                                </td>
                                <td>
                                    <div class="product-title" >产品代码</div>
                                </td>
                                <td>
                                    <div class="product-title" >交易申请日期</div>
                                </td>
                                <td>
                                    <div class="product-title" >产品类型</div>
                                </td>
                                <td>
                                    <div class="product-title" >交易类型</div>
                                </td>
                                <td>
                                    <div class="product-title" >申请金额/份额</div>
                                </td>
                                <td>
                                    <div class="product-title" >确认金额份额</div>
                                </td>
                                <td>
                                    <div class="product-title" >交易状态</div>
                                </td>
                            </tr>
                            </table>
                            <p class="search-reminder" >没有符合查询条件的记录!</p>
                            <div class="product-pagination block">
                            <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="currentPage4"
                                :page-sizes="[100, 200, 300, 400]"
                                :page-size="100"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="400">
                            </el-pagination>
                            </div>
                        </div> -->
                        <!-- <el-row type="flex" class="confirm" justify="center">
                            <el-button type="warning" size="small">下载</el-button>
                            <el-button type="warning" size="small">打印</el-button>
                        </el-row> -->
                    </div>
                    <div class="explain">
                        <h5>说明： </h5>
                        <p>1.每日银行系统清算期间（参考时间段：22：00-7：00），在此期间您的理财产品网上认购申请可能因系统清算原因不被接受。请尽量选择在日间提交购买申请。
                        </p>
                        <p>
                        2.销售渠道仅为柜面的产品，网上银行无法认购，同时网上银行可能不提供该类产品的产品说明书。
                        </p>
                        <p>
                        3.可购买额度数据更新时间为 2017-11-16 15:40:10 鉴于部分产品非常热销，不排除在您购买过程中产品售罄的可能，敬请谅解。
                        </p>
                        <p>
                        4.产品可购买额度实时更新，仅供参考。购买结果以系统确认为准。
                        </p>
                        <p>
                        5.外币理财产品到期时，理财本金以及收益按购买时现钞账户或现汇账户分别划转至原账户。
                        </p>
                        <p>页面编号:IT-10260100-00 </p>
                    </div>
                </el-col>
            </el-col>
        </div>
    </el-row>
</template>

<script>
    export default {
        name: 'home',
        data() {
            return {
                input: '',
                currentPage4: 4,
                isHidden:true,
                /*卡号账号选择*/
                card: [{
                  value: '1',
                  label: '6222 6001 1004 4405 582'
                }, {
                  value: '2',
                  label: '6111 6001 1004 4405 582'
                }],
                cartvalue: '6222 6001 1004 4405 582',
                /*交易类型*/
                deal: [{
                  value: '1',
                  label: '不限'
                }, {
                  value: '2',
                  label: '购买'
                }, {
                  value: '3',
                  label: '赎回'
                }],
                dealvalue: '不限'
            }
        },
        methods:{
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
//          分页
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
        }
    }
</script>
<style scoped lang='sass'>
    @import "../css/deal.scss";
    #product-select-container {
        .reminder {
            font-size: 0.875em;
            padding: 1em;
            color: #999;
            text-align: center;
        }
    }
</style>