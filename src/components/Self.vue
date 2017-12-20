<template>
    <el-row id="product-select-container" type="flex" justify="center">
        <router-view></router-view>
    </el-row>
</template>

<script>
    export default {
        name: 'self',
        data() {
            return {
            }
        }
    }
</script>
<style scoped lang='sass'>
    @import "../css/buy.scss"
</style>