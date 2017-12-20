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
            <el-col :span="24" class='product-search deal-type'>
                <el-col :span="3" class="type-text">账单种类：</el-col>
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
                <el-col :span="3" class="type-text">账单日期：</el-col>
                <el-date-picker
                  v-model="value6"
                  type="daterange"
                  size="small"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
                <el-button size="small" type="primary" class="deal-confirm">查询</el-button>
            </el-col>
            <el-col :span="24" class="content">
                <el-col class="self-sign">
                    <div class="sign-box">
                        <div class="self-revise">
                                    <table cellspacing="0" cellpadding="0" class="product-list product-manage">
                                    <tr class="search-list">
                                        <td>
                                            <div class="product-title" >账单编号</div>
                                        </td>
                                        <td>
                                            <div class="product-title" >账单月份</div>
                                        </td>
                                        <td>
                                            <div class="product-title" >账单种类</div>
                                        </td>
                                        <td>
                                            <div class="product-title" >账单状态</div>
                                        </td>
                                        <td>
                                            <div class="product-title" >账单详情及下载</div>
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
                        </div>
                    </div>
                    <div class="explain">
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
                value6: '',
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
                  label: '无账单'
                }, {
                  value: '2',
                  label: '纸质月账单'
                }, {
                  value: '3',
                  label: '电邮月账单'
                },{
                  value: '4',
                  label: '日账单'
                }],
                dealvalue: '请选择账单种类'
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
        .product-container {
            .content {
                .self-sign {
                    .sign-box {
                        .confirm {
                            margin-top: 1em;
                            margin-bottom: 1em;
                        }
                    }
                }
            }
        }


}
</style>