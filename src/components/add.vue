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
                    <template>
                      <el-table
                        :data="tableData"
                        border
                        style="width: 100%">
                        <el-table-column
                          prop="date"
                          label="日期"
                          width="180">
                        </el-table-column>
                        <el-table-column
                          prop="address"
                          label="操作">
                        </el-table-column>
                      </el-table>
                    </template>
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
            tableData: [{
                  date: '账号电子月结单',
                  address: '查询'
                }, {
                  date: '得利宝增值服务订阅',
                  address: '订阅'
            }]
        }
    },
    methods:{

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