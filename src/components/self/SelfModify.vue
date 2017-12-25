<template>
<div>
    <div class="sign-box">
        <div class="self-revise">
            <p class="sign-memory">我的签约记录</p>
            <el-table
              :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
              style="width: 100%">
              <el-table-column
                prop="depositAcct"
                label="签约卡号">
              </el-table-column>
              <el-table-column
                prop="fundCode"
                label="理财余额">
              </el-table-column>
              <el-table-column
                prop="available"
                label="卡留存金额">
              </el-table-column>
              <el-table-column
                prop="fundChar"
                label="预期收益率">
              </el-table-column>
              <el-table-column
                prop="applicationVol"
                label="明细">
              </el-table-column>
              <el-table-column
                prop="cfmAmount"
                label="修改">
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
                :page-sizes="[40, 80, 120, 160]"
                :page-size="pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalCount">
            </el-pagination>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    import { SELF_SEARCH } from '../../api/api.js';
    var qs = require('qs');
    export default {
        name: 'selfModify',
        data() {
            return {
                /*交易明细查询数据*/
                tableData: [],
                 /*分页*/
                pagesize: 40,
                totalCount: 0,
                currentPage: 1,
            }
        },
        mounted(){
            this.$nextTick(() => {
                this.commit();
           })
        },
        computed: {
            commitData () {
                return {
                    "depositAcct":"6222600140004825644"
                }
            }
        },
        methods:{
            commit(){
                var _this = this;
                this.$axios.post(SELF_SEARCH, qs.stringify(this.commitData)
                )
                /*this.$axios.get('http://192.168.191.1:8087/static/json/data.json', {}
                )*/
                .then((res) => {

                    this.tableData = res.data
                    this.totalCount = res.data.length;
                    var _this = this;
                    /*this.tableData.map((value) => {
                        if(value.fundChar == '001' || value.fundChar == '002' || value.fundChar == '003'){
                            return value.fundChar = '活期'
                        }else{
                            return  value.fundChar = '定期'
                        }
                    })*/


                    /*this.tableData.map((value) => {

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

                    })*/
                    return this.tableData;
                }).catch(function(err){
                    _this.$alert(err)
                })
            },
            /*分页*/
            handleSizeChange(val) {
                this.pagesize = val;
            },
            handleCurrentChange(val) {
                this.currentPage = val;
            },

        }
    }
</script>
<style scoped lang='sass'>
    @import "../../css/self.scss"
</style>