import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/index'

import Buy from '../components/Buy'
import BuyMain from '../components/buy/buy-main'
import BuyProduct from '../components/buy/buy-product'

import Self from '../components/Self'
import SelfMain from '../components/self/SelfMain'
import SelfSigned from '../components/self/SelfSigned'
import SelfCutPayment from '../components/self/SelfCutPayment'
import CutPaymentAffirm from '../components/self/CutPaymentAffirm'

import Deal from '../components/deal'
import Home from '../components/home'
import Reserved from '../components/reserved'
import Download from '../components/download'
import Add from '../components/add'
import Back from '../components/back'
import Repurchase from '../components/mine/mine-repurchase'
import Mine from '../components/Mine'
import MineMain from '../components/mine/mine-main'
import Redeem from '../components/mine/redeem'

Vue.use(Router)

export default new Router({
	/*mode:'history',*/
	base: './',
  	routes: [
    	{
	      path: '/',
	      /*解决首次打开网页不加载的问题*/
	      redirect: '/buy',
	      name: '得利宝理财',
	      component:Index,
	      children:[
	      	{
	      		path:'/home',
	      		name:'首页',
	      		component:Home
	      	},
	      	{
	      		path:'/buy',
	      		name:'产品购买',
	      		component:Buy,
	      		children: [
		            {
		              path: '',
		              name: 'BuyMain',
		              component: BuyMain
		            },
		            {
		              path: 'buy-product',
		              name: 'BuyProduct',
		              component: BuyProduct
		            }
		        ]
	      	},
	        {
	      		path:'/mine',
	      		name:'我的得利宝',
	      		component:Mine,
	      		children: [
		            {
		              path: '',
		              name: 'mineMain',
		              component: MineMain
		            },
		            {
		              path: 'page',
		              name: 'Repurchase',
		              component: Repurchase
		            },
		            {
		              path: 'redeem',
		              name: 'redeem',
		              component: Redeem
		            }
		        ]
	      	},{
	      		path:'/self',
	      		name:'自动购买',
	      		component:Self,
	      		children: [
		            {
		                path: '',
		                name: 'SelfMain',
		                component: SelfMain,
		                children: [
				            {
				                path: '',
				                name: 'SelfSigned',
				                component: SelfSigned
				            },{
				                path: 'cutPayment',
				                name: 'SelfCutPayment',
				                component: SelfCutPayment
				            },{
				                path: 'cutPaymentAffirm',
				                name: 'cutPaymentAffirm',
				                component: CutPaymentAffirm
				            }
		                ]
		       		}
		        ]
	      	},{
	      		path:'/reserved',
	      		name:'预留产品购买',
	      		component: Reserved
	      	},{
	      		path:'/deal',
	      		name:'交易明细查询',
	      		component:Deal
	      	},{
	      		path:'/download',
	      		name:'对账单下载',
	      		component:Download
	      	},{
	      		path:'/add',
	      		name:'增值服务订购',
	      		component: Add
	      	},{
	      		path:'/back',
	      		name:'自动赎回',
	      		component:Back
	      	}
	    ]
	    }
	]
})
