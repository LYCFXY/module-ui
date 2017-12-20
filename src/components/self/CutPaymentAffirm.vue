<template>
    <el-row id="product-select-container" type="flex" justify="center">
        <div class="product-container">
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
                   <div>
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
            <el-col :span="24" class='product-search'>
               <hr />
               <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
                    <el-form-item>
                      <h3>安全认证</h3>
                    </el-form-item>
                    <el-form-item>
                        <el-col :span="5" class="card-number">交易密码：</el-col>
                        <el-col :span="7">
                          <el-input type="password" v-model="sizeForm.password"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-col :span="5" class="card-number">动态密码：</el-col>
                        <el-col :span="7">
                          <el-input type="password" v-model="sizeForm.password"></el-input>
                        </el-col>
                        <el-button class="send-password" size="small" type="primary" >发送动态密码</el-button>
                        <el-col :span="24">
                          <p><span class="red">*</span>动态密码有效时间为5分钟，请尽快完成相关操作</p>
                        </el-col>
                    </el-form-item>

                    <el-form-item size="large">
                       <el-row type="flex" justify="center">
                       <!-- @click="onSubmit" -->
                           <el-button size="small" type="primary" >确认</el-button>
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
    </el-row>
</template>

<script>
    export default {
        name: 'cutPayment',
        data() {
            return {
                myDate: '',
                tableData: [],
                multipleSelection: [],
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
        mounted() {
         this.$nextTick(() => {
            this.selfBuyResult();
            this.purchaseDate();
          })
        },
        computed: {
          formData() {
            return this.$store.state.tableData;
          }
        },
        methods: {
            selfBuyResult() {

                this.$axios.get('http://192.168.191.1:8082/static/json/buy.json',{})
                /*this.$axios.post('http://192.168.241.175:8080/queryFundInfoNet', qs.stringify(this.searchData)
                )*/
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
                    alert(err)
                })
            },
            /*选择*/
            /*toggleSelection(rows) {
                if (rows) {
                  rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                  });
                } else {
                  this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }*/
            /*分页*/
            handleSizeChange(val) {
                this.pagesize = val;
            },
            handleCurrentChange(val) {
                this.currentPage = val;
            },
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
    @import "../../css/cut_payment_affirm.scss"
</style>