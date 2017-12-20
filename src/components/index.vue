<template>
	<el-row class="container" type="flex" justify="center">
		<el-col :span="4">
			<aside class="menu-expanded">
				<el-menu theme="dark" default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#04357B" text-color="#fff" active-text-color="#ffd04b" unique-opened router>
					<template v-for="(item,index) in $router.options.routes"  v-if="!item.hidden">
						<el-submenu :index="item.path" :key="index">
							<template slot="title">
								<span><h3>{{ item.name }}</h3></span>
							</template>
							<el-menu-item-group>
								<el-menu-item class="children-list" v-for="(child,index) in item.children" v-if="index>0" :index="child.path" :key="child.path">
									{{child.name}}
								</el-menu-item>
							</el-menu-item-group>
						</el-submenu>
					</template>
				</el-menu>
			</aside>
		</el-col>
		<el-col :span="14" >
			<!-- <transition name="fade" > -->
				<router-view></router-view>
			<!-- </transition> -->
		</el-col>
	</el-row>
</template>

<script>
	export default {
		name: 'index',
		data() {
			return {
				input: '',
				currentPage4: 4
			};
		},
		created(){
        	this.getData();
    	},
		methods: {
			getData(){
            var that = this;
            that.loading = true;
            that.$axios.post('',{}).then((res) => {
                if(res){
                    that.data = res;
                    that.loading = false;
                }
            }).catch(function(eMsg){
                that.loading = false;

            });
        },
			handleOpen(key, keyPath) {
				/*console.log(key, keyPath);*/

			},
			handleClose(key, keyPath) {
				/*console.log(key, keyPath);
				console.log(this.$router.options.routes)*/
				this.$router.push('buy')
			},

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
	@import "../css/index.scss"
</style>