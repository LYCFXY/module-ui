<template>
    <el-row id="product-select-container" type="flex" justify="center">
        <div class="product-container">
            <el-col :span="24" class='product-search'>
                <el-col :span="3" :offset="3">卡号/账号：</el-col>
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
            <el-col :span="24" class="content" style="padding-left: 0;padding-right: 0;">
                    <el-tabs type="border-card" class="tags">
                        <el-tab-pane class="self-sign" label="自助购买签约">
                           <router-view></router-view>
                        </el-tab-pane>
                        <el-tab-pane label="自助购买修改/撤销">
                           <!--  <SelfModify></SelfModify> -->
                            <div class="self-revise">
                                <p class="sign-memory">我的签约记录</p>
                                <table cellspacing="0" cellpadding="0" class="product-list product-manage">
                                    <tr class="search-list">
                                        <td>
                                            <div class="product-title" >签约卡号</div>
                                        </td>
                                        <td>
                                            <div class="product-title" >理财余额</div>
                                        </td>
                                        <td>
                                            <div class="product-title" >卡留存金额</div>
                                        </td>
                                        <td>
                                            <div class="product-title" >预期收益率</div>
                                        </td>
                                        <td>
                                            <div class="product-title" >明细</div>
                                        </td>
                                        <td>
                                            <div class="product-title" >修改</div>
                                        </td>
                                        <td>
                                            <div class="product-title" >撤销</div>
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
                            <div class="explain">
                                <p>页面编号:IT-10260100-00 </p>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
            </el-col>
        </div>
    </el-row>
</template>

<script>
    import SelfModify from './SelfModify';
    export default {
        name: 'home',
        data() {
            return {
                input: '',
                currentPage4: 4,
                isHidden:true,
                cartvalue: '',
            }
        },
        components: { SelfModify },
        mounted(){
            this.$nextTick(() => {
                this.cardDefault();
           })
        },
        computed: {

            card() {
                return this.$store.state.cardNumber
            },
            getSelectedCard() {
                return this.$store.state.selectedCard;
            }
        },
        methods:{
            cardDefault() {
                this.cartvalue = this.getSelectedCard;
            },
            changeCard(){
                let mainNumber = this.cartvalue;
                this.$store.commit('selectedCard', mainNumber);
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
    @import "../../css/self.scss"
</style>