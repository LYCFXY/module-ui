import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import Mock from 'mockjs';
//import cors from 'cors';
//import '../static/js/Underscore.js';
import vueMethodsPromise from 'vue-methods-promise';
/*import '../static/css/theme-red/index.css';*/       // 浅红色主题
/*import '../static/css/theme-blue/index.css';*/
/*import 'element-ui/lib/theme-chalk/index.css';*/
import './css/element-variables.scss'
import "babel-polyfill";
import 'components/mockjs/all.js';
import store from './store/index';

/*折线图插件*/
import echarts from 'echarts';
Vue.prototype.$echarts = echarts;

// axios.defaults.baseURL = 'http://ownedexpress.fenghuangyouxuan.com/api';  //生产

//axios.defaults.baseURL = 'http://123.57.175.234:8081'; //测试


axios.defaults.withCredentials = true;

axios.defaults.timeout =  2000;
var alert = require('element-ui').MessageBox.alert;
//var tokenBugNum = 0;
//var tokenBug = function(msg){
//  if(tokenBugNum == 1){
//      alert(msg, '温馨提示', {
//          confirmButtonText: '确定',
//          callback: action => {
//              router.push('/login');
//              tokenBugNum = 0;
//          }
//      });
//  }
//}

/*axios.interceptors.response.use(function (response) {
    // 处理对响应数据
    if(response.data.code == 'success'){
    	return response.data.data;
    }else if(response.data.code =='ST_LO10007' || response.data.code =='ST_LO10008'){
        tokenBugNum ++;
        tokenBug(response.data.errorMessage);
    }else{
    	return Promise.reject(response.data.errorMessage);
    }
}, function (error) {
        return Promise.reject('服务器请求返回错误');
    }
);*/


// 路由跳转
Vue.prototype.$goRoute = function (index) {
  this.$router.push(index)
}

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$axios = axios;
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');

// app.use(cors({
//     origin: 'http://a.com',
// 　　 credentials: true
// }))

//每次切换页面时触发，判断用户权限时可用
// router.beforeEach((to, from, next) => {
//   // ...
//   console.log(to, from)
//   next()
// })