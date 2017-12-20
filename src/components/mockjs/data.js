import Mock from 'mockjs';
Mock.mock(/\/data\/getData\?(\s\S)?/, 'post',
    function(data){
		return {
			eCode:0,
			eMsg:'ok',
			data:{
				page:1,
				count:15,
				list:[
					{
						id:1,
						projects:"惠州潼湖小镇",
						exhibition:"深圳展厅",
						time:"2017-10-14  20:25",
						description:"潼湖产业发展中心开放工位",
						num:5,
						status:1,
					},{
						id:1,
						projects:"惠州潼湖小镇",
						exhibition:"深圳展厅",
						time:"2017-10-14  20:25",
						description:"潼湖产业发展中心开放工位",
						num:5,
						status:2,
					},{
						id:1,
						projects:"惠州潼湖小镇",
						exhibition:"深圳展厅",
						time:"2017-10-14  20:25",
						description:"潼湖产业发展中心开放工位",
						num:5,
						status:3,
					},{
						id:1,
						projects:"惠州潼湖小镇",
						exhibition:"深圳展厅",
						time:"2017-10-14  20:25",
						description:"潼湖产业发展中心开放工位",
						num:5,
						status:1,
					},{
						id:1,
						projects:"惠州潼湖小镇",
						exhibition:"深圳展厅",
						time:"2017-10-14  20:25",
						description:"潼湖产业发展中心开放工位",
						num:5,
						status:3,
					},{
						id:1,
						projects:"惠州潼湖小镇",
						exhibition:"深圳展厅",
						time:"2017-10-14  20:25",
						description:"潼湖产业发展中心开放工位",
						num:5,
						status:1,
					},{
						id:1,
						projects:"惠州潼湖小镇",
						exhibition:"深圳展厅",
						time:"2017-10-14  20:25",
						description:"潼湖产业发展中心开放工位",
						num:5,
						status:2,
					}
				]
			}
		}
	}
);

Mock.mock(/\/data\/details\/(\s\S)?/, 'get',
    function(data){
		return {
			eCode:0,
			eMsg:'ok',
			data:{
				name:"张震",
				phone:"18710128818",
				status:"1",
			}
		}
	}
);

Mock.mock('/data/info', 'get',
    function(data){
		return {
			eCode:0,
			eMsg:'ok',
			data:{
				callData:{
					phone:"13132132131",
					SMS:"1312"
				},
				assemblage:[
					{
						name:"横幅标语",
						id:"1",
						hint:"提示文字"
					},{
						name:"会议室",
						id:"2",
						hint:"提示文字"
					},{
						name:"专业讲解",
						id:"3",
						hint:"提示文字"
					},{
						name:"专车服务",
						id:"4",
						hint:"提示文字"
					}
				],
				data:[
					{
						name:"横幅标语",
						url:"../../",
						id:"1",
						hint:"提示文字"
					},{
						name:"会议室",
						url:"../../",
						id:"2",
						hint:"提示文字"
					},{
						name:"专业讲解",
						url:"../../",
						id:"3",
						hint:"提示文字"
					},{
						name:"专车服务",
						url:"../../",
						id:"4",
						hint:"提示文字"
					}
				]
			}
		}
	}
);