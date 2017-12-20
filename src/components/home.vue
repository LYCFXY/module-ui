<template>
	<el-row id="product-select-container" type="flex" justify="center">
		<!-- <el-col :span="14"> -->
		<div class="product-container">
			<el-col :span="24" class='product-search'>
					<el-col :span="4" :offset="4" >产品名称/代码：</el-col>
				<el-col :span='8'>
					<el-input style="width: 240px;" placeholder="请输入产品名称/代码" v-model="input">
					</el-input>
				</el-col>
				<el-col :span="8">
					<el-button type="primary" style="width: 90px;">查询</el-button>
					<el-button type="primary" @click="search" v-if="isHidden">筛选<i class="el-icon-caret-bottom"></i></el-button>
					<el-button type="primary" @click="search" v-else="isHidden">筛选<i class="el-icon-caret-top"></i></el-button>
				</el-col>
			</el-col>
			<el-col :span="24" class="screen">
				<!--隐藏的筛选内容-->
				<div :style="{'display':isHidden ? 'none' : 'block'}" id="product-search-hidden" class="product-search-hidden">
								<span class="demonstration">购买起止日期</span>
								    <el-date-picker
								      v-model="value6"
								      type="daterange"
								      size="small"
								      range-separator="至"
								      start-placeholder="开始日期"
								      end-placeholder="结束日期">
								    </el-date-picker>
								    <span>币种</span>
								    <el-cascader
									  :options="options"
									  change-on-select
									  size='small'
									></el-cascader>
									<div style="margin-top: 10px;">
										<span style="padding-left: 10px;">产品类型：</span>
										<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">不限</el-checkbox>
									    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
									    	<el-checkbox  v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
									    </el-checkbox-group>
									</div>
									<div style="margin-top: 10px;">
										<span style="padding-left: 10px;">风险等级：</span>
										<el-checkbox :indeterminate="isIndeterminate1" v-model="checkAll1" @change="handleCheckAllChange1">不限</el-checkbox>
										<el-checkbox-group v-model="checkedCities1" @change="handleCheckedCitiesChange1">
										    <el-checkbox v-for="city in cities1" :label="city" :key="city">{{city}}</el-checkbox>
										</el-checkbox-group>
									</div>
									<div style="margin-top: 10px;">
										<span style="padding-left: 10px;">起购金额：</span>
									    <el-checkbox :indeterminate="isIndeterminate2" v-model="checkAll2" @change="handleCheckAllChange2">不限</el-checkbox>
									    <el-checkbox-group v-model="checkedCities2" @change="handleCheckedCitiesChange2">
									    <el-checkbox v-for="city in cities2" :label="city" :key="city">{{city}}</el-checkbox>
									   </el-checkbox-group>
									</div>
									<div style="margin-top: 10px;">
										<span style="padding-left: 10px;">投资期限：</span>
									    <el-checkbox :indeterminate="isIndeterminate3" v-model="checkAll3" @change="handleCheckAllChange3">不限</el-checkbox>
									    <el-checkbox-group v-model="checkedCities3" @change="handleCheckedCitiesChange3">
									    <el-checkbox v-for="city in cities3" :label="city" :key="city">{{city}}</el-checkbox>
									  </el-checkbox-group>
									</div>
				</div>
			</el-col>
			<el-col :span="24" class="content" style="padding-left: 0;padding-right: 0;">
					<el-tabs type="border-card" class="tags">
						<el-tab-pane label="得利宝理财">
							<div class="product-sort" style="padding-left: 0;padding-right: 0;">
								<span  @click="toggle" v-if="isShow">预期收益率<i class="el-icon-caret-top"></i></span>
								<span  @click="toggle" v-else="isShow">预期收益率<i class="el-icon-caret-bottom"></i></span>
								<span>投资期限<i class="el-icon-caret-bottom"></i></span>
								<span>起售金额<i class="el-icon-caret-bottom"></i></span>
								<span class="product-comparison clearfix">产品比较</span>
							</div>
							<table cellspacing="0" cellpadding="0" class="product-list">
								<tr class="search-list">
									<td>
										<div class="product-title" title="交行添利一个月(2222222222)">交行添利一个月(2222222222)</div>
										<div class="product-feture"><span>人民币</span><span>定期利</span><span>低风险</span></div>
									</td>
									<td>
										<div class="product-title">34天</div >
										<div class="product-content">投资期限</div>
									</td>
									<td>
										<div class="product-title">4.45%</div >
										<div class="product-content">预期收益率</div>
									</td>
									<td>
										<div class="product-title">5.00万</div >
										<div class="product-content">起售金额</div>
									</td>
									<td>
										<div class="product-title">34天</div >
										<div class="product-date">
											<p>起息日：2017-11-17</p>
											<p>到期日：2017-11-17</p>
										</div>
									</td>
									<td>
										<div class="product-title">手机银行专享</div >
										<div class="product-buy">购买</div>
									</td>
								</tr>
							</table>
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
						</el-tab-pane>
						<el-tab-pane label="易添利">
							<div class="product-sort" style="padding-left: 0;padding-right: 0;">
								<span>扣款周期<i class="el-icon-caret-bottom"></i></span>
								<span>首次投资最低金额<i class="el-icon-caret-bottom"></i></span>
								<span>最少倍增金额<i class="el-icon-caret-bottom"></i></span>
							</div>
							<table cellspacing="0" cellpadding="0" class="product-list">
								<tr>
									<td>
										<div class="product-title" title="交行添利一个月(2222222222)">交行添利一个月(2222222222)</div>
										<div class="product-feture"><span>人民币</span><span>定期利</span><span>低风险</span></div>
									</td>
									<td>
										<div class="product-title">34天</div >
										<div class="product-content">投资期限</div>
									</td>
									<td>
										<div class="product-title">34天</div >
										<div class="product-content">投资期限</div>
									</td>
									<td>
										<div class="product-title">34天</div >
										<div class="product-content">投资期限</div>
									</td>
									<td>
										<div class="product-title">34天</div >
										<div class="product-content">投资期限</div>
									</td>
									<td>
										<div class="product-buy">签约</div>
									</td>
								</tr>
							</table>
						</el-tab-pane>
						<el-tab-pane label="智慧添利">
							<div class="product-sort" style="padding-left: 0;padding-right: 0;">
								<span>预期收益率<i class="el-icon-caret-bottom"></i></span>
								<span>投资期限<i class="el-icon-caret-bottom"></i></span>
								<span>起售金额<i class="el-icon-caret-bottom"></i></span>
							</div>
							<table cellspacing="0" cellpadding="0" class="product-list">
								<tr>
									<td>
										<div class="product-title" title="交行添利一个月(2222222222)">交行添利一个月(2222222222)</div>
										<div class="product-feture"><span>人民币</span><span>定期利</span><span class="risk">低风险</span></div>
									</td>
									<td>
										<div class="product-title">34天</div >
										<div class="product-content">投资期限</div>
									</td>
									<td>
										<div class="product-title">34天</div >
										<div class="product-content">投资期限</div>
									</td>
									<td>
										<div class="product-title">34天</div >
										<div class="product-content">投资期限</div>
									</td>
									<td>
										<div class="product-title">34天</div >
										<div class="product-content">投资期限</div>
									</td>
									<td>
										<div class="product-buy">签约</div>
									</td>
								</tr>
							</table>
						</el-tab-pane>
					</el-tabs>
			</el-col>
		</div>
		<!-- </el-col> -->
	</el-row>
</template>

<script>
	const cityOptions= ['专享产品', '活期类', '定期类', '结构性','外币类','私人银行']
	const cityOptions1= ['极地风险', '低风险', '较低风险', '中等风险','较高风险','高风险']
	const cityOptions2= ['5万以下', '5-600万', '10-600万', '600万以上']
	const cityOptions3= ['30天(含)以下', '31天~90天(含)', '91天~180天(含)', '181天~365天(含)','365天以上']
	export default {
		name: 'home',
		data() {
			return {
				input: '',
				currentPage4: 4,
				isShow:false,
				isHidden:true,
				 value6: '',
				 options:[
				 {
				 	value:'money',
				 	label:'人民币'
				 },{
				 	value:'jiayuan',
				 	label:'加元'
				 }
				 ],
			  	checkAll: false,
			  	checkAll1: false,
			  	checkAll2: false,
			  	checkAll3: false,
		        checkedCities: [],
		        checkedCities1: [],
		        checkedCities2: [],
		        checkedCities3: [],
		        cities: cityOptions,
		        cities1: cityOptions1,
		        cities2: cityOptions2,
		        cities3: cityOptions3,
		        isIndeterminate: true,
		        isIndeterminate1: true,
		        isIndeterminate2: true,
		        isIndeterminate3: true
			}
		},
		methods:{

			toggle:function(){
				this.isShow=!this.isShow
			},
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
//			分页
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			},

//			筛选
			 handleCheckAllChange(val) {
		        this.checkedCities = val ? cityOptions : [];
		        this.isIndeterminate = false;
		      },
		      handleCheckedCitiesChange(value) {
		        let checkedCount = value.length;
		        this.checkAll = checkedCount === this.cities.length;
		        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
		      },
		       handleCheckAllChange1(val) {
		        this.checkedCities1 = val ? cityOptions1 : [];
		        this.isIndeterminate1 = false;
		      },
		      handleCheckedCitiesChange1(value) {
		        let checkedCount1 = value.length;
		        this.checkAll1 = checkedCount1 === this.cities1.length;
		        this.isIndeterminate1 = checkedCount1 > 0 && checkedCount1 < this.cities1.length;
		      },
		       handleCheckAllChange2(val) {
		        this.checkedCities2 = val ? cityOptions2 : [];
		        this.isIndeterminate2 = false;
		      },
		      handleCheckedCitiesChange2(value) {
		        let checkedCount2 = value.length;
		        this.checkAll2 = checkedCount2 === this.cities2.length;
		        this.isIndeterminate2 = checkedCount2 > 0 && checkedCount2 < this.cities2.length;
		      },
		       handleCheckAllChange3(val) {
		        this.checkedCities3 = val ? cityOptions3 : [];
		        this.isIndeterminate3 = false;
		      },
		      handleCheckedCitiesChange3(value) {
		        let checkedCount3 = value.length;
		        this.checkAll3 = checkedCount3 === this.cities3.length;
		        this.isIndeterminate3 = checkedCount3 > 0 && checkedCount3 < this.cities3.length;
		      }
		}
	}
</script>
<style scoped lang='sass'>
    @import "../css/buy.scss"
</style>