<template>

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

</template>

<script>
export default {
    name: 'explain',
    data () {

    }
}
</script>

<style scoped lang='sass'>
    $mainColor: #409EFF;
    .explain{
        padding-top: 1.5em;
        h5 {
            margin: 0;
            padding: 0;
            font-size: 14px;
            font-weight: 700;
        }
        p {
            margin: 0;
            padding: 5px 30px;
            font-size: 0.875em;
        }
        p:last-child {
            padding-top: 2em;
            color: $mainColor;
            text-align: center;
        }
    }
</style>