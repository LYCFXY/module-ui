<template>
    <el-row id="product-select-container" type="flex" justify="center">
       <router-view></router-view>
    </el-row>
</template>

<script>

    export default {
        name: 'mine',
        data() {
            return {
            }
        }
    }
</script>
<style scoped lang='sass'>
    @import "../css/mine.scss";
</style>