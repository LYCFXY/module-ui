<template>
    <div>
        <div class="sign-box">
            <div class="sign-contract">
                <h4>自助购买业务须知</h4>
                <p>1．自助购买是指客户指定一张借记卡，并选择一款支持自动购买功能的的理财产品进行自动购买签约，签约时客户应设定借记卡的金额，签约生效后系统实现在每个产品工作日自动扣除设定金额。</p>
                <p>2．银行有权变更本业务须知下的自助购买业务五福及本须知内容，在不违反法律、法规、规章和监管规定的强制性规范的前提下，银行有权提前通过交通银行门户网站或银行营业点进行公告。</p>
                <el-checkbox v-model="checked">本人已经阅读全部条款
                    <span>
                        充分了解并清楚本产品的风险，愿意承担相关风险。
                    </span>
                </el-checkbox>
            </div>
            <el-row type="flex" class="confirm" justify="center">
                <el-button type="warning" @click="$goRoute('/self/cutPayment'), agree">同意</el-button>
                <el-button type="warning" plain @click="disagree">不同意</el-button>
            </el-row>
            </div>
        <div class="explain">
            <p>页面编号:IT-10260100-00 </p>
        </div>
        <!-- <input type="text" :value="cardNumber" /> -->
    </div>
</template>

<script>
    export default {
        name: 'signed',
        data() {
            return {
                checked: true
            }
        },
        mounted(){
         this.$nextTick(() => {

          })
        },
        computed: {
            commitData() {
                return{
                    "packLength":"",
                    "cicsCode":"WM61",
                    "appType":"52",
                    "transType":"2302",
                    "frontTransType":"522302",
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

                    "depositAcct": "",
                    "transactionAccountPwd": "",
                    "fundChar": "005", //只有这一个条件
                    "fundCode": "",
                    "applicationAmount": "",
                    "currencyType": "",
                    "cashForeignExchangeFlag":"",
                    "voucherType":"",
                    "voucherNo":"",
                    "voucherDate":"",
                    "smallAcc":"",
                    "isOpenResvAmt":"",
                    "subscriptionOff":"",
                    "periodNumber":"",
                    "customersIdentity":"",
                    "rev1":"",
                    "rev2":"",
                    "rev3":"",
                    "rev4":"",
                    "rev5":"",
                    "distriEmployee":"",
                    "merchantCode":"",
                    "coreAppSheetSerialNo":"",
                    "retrivalNo":"",
                    "otherBankDepositacct":"",
                    "custRiskLevel":"",
                    "offerSysNo":"",
                    "targetCustType":"",
                    "ebankCustNo":"",
                    "tjProjectId":"",
                    "numSeq":"",
                    "upAmount":"",
                    "vType":"",
                    "facesValue":"",
                    "beginTime":"",
                    "endTime":"",
                    "experienceDay":"",
                    "scaleType":"",
                    "cardSeq":"",
                    "accInputMode":"",
                    "wuWuYu":"",
                    "wuWuYuLength":"",
                    "track2":"",
                    "secretPwd":"",
                    "telAcpFlag":"",
                    "douMessId":"",
                    "endDate":""
                }
            },
            cardNumber() {
                return this.$store.state.selectedCard;
            }
        },
        methods: {
            disagree() {
                this.$alert('现在没有可以用通过网银购买的预留额度产品!');
            },
            agree() {
                this.$axios.post()
            }
        }
    }
</script>
<style scoped lang='sass'>
    @import "../../css/self.scss"
</style>