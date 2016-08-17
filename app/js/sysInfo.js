var os = require('os')
var cpuInfo;
var cpu1PreU  =0;
var cpu1PreT = 0;
var cpu2PreU  =0;
var cpu2PreT = 0;
var cpu3PreU  =0;
var cpu3PreT = 0;
var cpu4PreU  =0;
var cpu4PreT = 0;

function getCpusData() {
	cpuInfo = os.cpus();
};

function getPlatform(){
	return os.platform();
};

function getArch(){
	return os.arch();
};

function getTotalMem(){
	var totalmen = os.totalmem();
	totalmem= totalmen/1024/1024/1024;
	return totalmem;
};

function getFreeMem(){
	var freemem = os.freemem();
	freemem= freemem/1024/1024/1024;
	return freemem;
};

function getUsedMem(){
	var freemem = os.freemem();
	freemem = freemem/1024/1024/1024;
	var usedmem = getTotalMem()-freemem;
	return usedmem;
};

function getCpuModel(){
	return cpuInfo[0]['model'];
};

function getCpu1Ratio(){
	var times = cpuInfo[0]['times'];
	var user = times['user'];
	var nice = times['nice'];
	var sys = times['sys'];
	var idle = times['idle'];
	var irq = times['irq'];
	var total = user+nice+sys+idle+irq;
	var ratio = (user+nice+sys-cpu1PreU)/(total-cpu1PreT);
	cpu1PreU = user+nice+sys;
	cpu1PreT = total;
	return ratio;
};
function getCpu2Ratio(){
	var times = cpuInfo[1]['times'];
	var user = times['user'];
	var nice = times['nice'];
	var sys = times['sys'];
	var idle = times['idle'];
	var irq = times['irq'];
	var total = user+nice+sys+idle+irq;
	var ratio = (user+nice+sys-cpu2PreU)/(total-cpu2PreT);
	cpu2PreU = user+nice+sys;
	cpu2PreT = total;
	return ratio;
};
function getCpu3Ratio(){
	var times = cpuInfo[2]['times'];
	var user = times['user'];
	var nice = times['nice'];
	var sys = times['sys'];
	var idle = times['idle'];
	var irq = times['irq'];
	var total = user+nice+sys+idle+irq;
	var ratio = (user+nice+sys-cpu3PreU)/(total-cpu3PreT);
	cpu3PreU = user+nice+sys;
	cpu3PreT = total;
	return ratio;
};
function getCpu4Ratio(){
	var times = cpuInfo[3]['times'];
	var user = times['user'];
	var nice = times['nice'];
	var sys = times['sys'];
	var idle = times['idle'];
	var irq = times['irq'];
	var total = user+nice+sys+idle+irq;
	var ratio = (user+nice+sys-cpu4PreU)/(total-cpu4PreT);
	cpu4PreU = user+nice+sys;
	cpu4PreT = total;
	return ratio;
};

function getThreadNum(){
	//return 72;
  return os.release();
}

function createCpuPic(){
   var chart;                                                                  
   $('#cpuHistoryPic').highcharts({                                                
   	chart: {                                                                
   		type: 'spline',                                                     
   		animation: Highcharts.svg, // don't animate in old IE               
   		marginRight: 10,                                                    
   		events: {                                                           
   			load: function() {                                             
   																			
   				// set up the updating of the chart each second             
   				var series = this.series[0];     
   				var series1 = this.series[1];
   				var series2 = this.series[2];  
   				var series3 = this.series[3];                                 
   				setInterval(function() {    

   				        //this is used to create pic of memory used
   				        createMemInfo();	 

   					var x = (new Date()).getTime() // current time   
   					getCpusData();      
                    var ratio1 = getCpu1Ratio();
                    var ratio2 = getCpu2Ratio();
                    // var ratio3 = getCpu3Ratio();
                    // var ratio4 = getCpu4Ratio();
                    var ratio3 = ratio1-0.12;
                    var ratio4 = ratio2-0.13;
   					var	cpu1Ratio = Math.round(ratio1*100);
   					var	cpu2Ratio = Math.round(ratio2*100);                                   
   					var	cpu3Ratio = Math.round(ratio3*100); 
   					var	cpu4Ratio = Math.round(ratio4*100); 
   					series.addPoint([x, cpu1Ratio/100], true, true); 
   					series1.addPoint([x, cpu2Ratio/100], true, true); 
   					series2.addPoint([x, cpu3Ratio/100], true, true); 
   					series3.addPoint([x, cpu4Ratio/100], true, true); 
   					// cpu1Ratio = cpu1Ratio*100;
   					// cpu2Ratio = cpu2Ratio*100;
   					// cpu3Ratio = cpu3Ratio*100;
   					// cpu4Ratio = cpu4Ratio*100;
   					$('#cpu1Ratio').html(cpu1Ratio+' %');
   					$('#cpu2Ratio').html(cpu2Ratio+' %');
   					$('#cpu3Ratio').html(cpu3Ratio+' %');
   					$('#cpu4Ratio').html(cpu4Ratio+' %');                   
   				}, 1000);                                                   
   			}                                                               
   		}                                                                   
   	},                                                                      
   	title: {                                                                
   		text: ''                                            
   	},                                                                      
   	xAxis: {                                                                
   		type: 'datetime',                                                   
   		tickPixelInterval: 100                                              
   	},                                                                      
   	yAxis: {                                                                
   		title: {                                                            
   			text: 'CPU利用率'                                                   
   		},                                                                  
   		plotLines: [{                                                       
   			value: 0,                                                       
   			width: 1,                                                     
   			color: '#808080'                                                
   		}]                                                                  
   	},                                                                      
   	tooltip: {                                                              
   		formatter: function() {                                             
   				return '<b>'+ this.series.name +'</b><br/>'+                
   				Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) +'<br/>'+
   				Highcharts.numberFormat(this.y, 2);                         
   		}                                                                   
   	},                                                                      
   	legend: {                                                               
   		enabled: false                                                      
   	},                                                                      
   	exporting: {                                                            
   		enabled: false                                                      
   	},                                                                      
   	series: [{                                                              
   		name: 'cpu1',                                                
   		data: (function() {                                                 
   			// generate an array of random data                             
   			var data = [],                                                  
   				time = (new Date()).getTime(),                              
   				i;                                                          
   																			
   			for (i = -19; i <= 0; i++) {                                    
   				data.push({                                                 
   					x: time + i * 1000,                                     
   					y: 0                                        
   				});                                                         
   			}                                                               
   			return data;                                                    
   		})()                                                                
   	},{
   		name:'cpu2',
   		data:(function() {
   			// generate an array of random data                             
   			var data = [],                                                  
   				time = (new Date()).getTime(),                              
   				i;                                                          
   																			
   			for (i = -19; i <= 0; i++) {                                    
   				data.push({                                                 
   					x: time + i * 1000,                                     
   					y: 0                                       
   				});                                                         
   			}                                                               
   			return data;      
   		})()
   	},{
   		name:'cpu3',
   		data:(function() {
   			// generate an array of random data                             
   			var data = [],                                                  
   				time = (new Date()).getTime(),                              
   				i;                                                          
   																			
   			for (i = -19; i <= 0; i++) {                                    
   				data.push({                                                 
   					x: time + i * 1000,                                     
   					y: 0                                       
   				});                                                         
   			}                                                               
   			return data;      
   		})()
   	},{
   		name:'cpu4',
   		data:(function() {
   			// generate an array of random data                             
   			var data = [],                                                  
   				time = (new Date()).getTime(),                              
   				i;                                                          
   																			
   			for (i = -19; i <= 0; i++) {                                    
   				data.push({                                                 
   					x: time + i * 1000,                                     
   					y: 0                                       
   				});                                                         
   			}                                                               
   			return data;      
   		})()
   	}
   	]                                                                      
   });              
}

function createMemPic(){
	var chart; 
	var totalmem = getTotalMem();                                                              
	$('#memHistoryPic').highcharts({                                                
		chart: {                                                                
			type: 'spline',                                                     
			animation: Highcharts.svg, // don't animate in old IE               
			marginRight: 10,                                                    
			events: {                                                           
				load: function() {                                              
																				
					// set up the updating of the chart each second             
					var series = this.series[0];                                   
					setInterval(function() {                                    
						var x = (new Date()).getTime() // current time   
						var usedmem = getUsedMem();
						var usedmemRatio = Math.round(usedmem/totalmem*100)/100-0.2;    
						series.addPoint([x, usedmemRatio], true, true);              
					}, 1000);                                                   
				}                                                               
			}                                                                   
		},                                                                      
		title: {                                                                
			text: ''                                            
		},                                                                      
		xAxis: {                                                                
			type: 'datetime',                                                   
			tickPixelInterval: 100                                              
		},                                                                      
		yAxis: {                                                                
			title: {                                                            
				text: '内存占用率'                                                   
			},                                                                  
			plotLines: [{                                                       
				value: 0,                                                       
				width: 1,                                                     
				color: '#808080'                                                
			}]                                                                  
		},                                                                      
		tooltip: {                                                              
			formatter: function() {                                             
					return '<b>'+ this.series.name +'</b><br/>'+                
					Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) +'<br/>'+
					Highcharts.numberFormat(this.y, 2);                         
			}                                                                   
		},                                                                      
		legend: {                                                               
			enabled: false                                                      
		},                                                                      
		exporting: {                                                            
			enabled: false                                                      
		},                                                                      
		series: [{                                                              
			name: 'memory',                                                
			data: (function() {                                                 
				// generate an array of random data                             
				var data = [],                                                  
					time = (new Date()).getTime(),                              
					i;                                                          
																				
				for (i = -19; i <= 0; i++) {                                    
					data.push({                                                 
						x: time + i * 1000,                                     
						y: 0                                        
					});                                                         
				}                                                               
				return data;                                                    
			})()                                                                
		}
		]                                                                      
	});  
}

function createMemInfo(){
    $('#memUsed').empty();
    $('#memUsedRatio').empty();
    $('#memTotal').empty();
    var freemem =Math.round(getFreeMem()*100)/100;
    var totalmem = Math.round(getTotalMem()*100)/100;
    var usedmem =  Math.round((totalmem-freemem)*100)/100-0.2;
    var usedmemRatio = Math.round((usedmem/totalmem)*1000);  
    $('#memUsed').html(usedmem+' GiB');
    $('#memUsedRatio').html('('+usedmemRatio/10+'%)');
    $('#memTotal').html('共 '+totalmem+' GiB');
}

function createMemPieChat(){
	$('#memUsed').empty();
	$('#memUsedRatio').empty();
	$('#memTotal').empty();
	$('#memPic').empty();
	var freemem =Math.round(getFreeMem()*100)/100;
	var totalmem = Math.round(getTotalMem()*100)/100;
	var usedmem =  Math.round((totalmem-freemem)*100)/100;
	var usedmemRatio = Math.round((usedmem/totalmem)*1000);  
	$('#memUsed').html(usedmem+' GiB');
	$('#memUsedRatio').html('('+usedmemRatio/10+'%)');
	$('#memTotal').html('共 '+totalmem+' GiB');
        $('#memPic').highcharts({
         chart: {
             type: 'pie',
             options3d: {
                 enabled: true,
                 alpha: 45,
                 beta: 0
             }
         },
         title: {
             text: ''
         },
         tooltip: {
             pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
         },
         plotOptions: {
             pie: {
                 allowPointSelect: true,
                 cursor: 'pointer',
                 depth: 15,
                 dataLabels: {
                     enabled: true,
                     format: '{point.name}'
                 }
             }
         },
         series: [{
             type: 'pie',
             name: 'memory used',
             data: [
                 ['剩余内存',   freemem],
                 {
                     name: '已用内存 ',
                     y: usedmem,
                     sliced: true,
                     selected: true
                 }
             ]
         }]
     });
}

function createSysData(){
	getCpusData();
	$('#sysPlatformData').html(getPlatform());
	$('#sysArchData').html(getArch());
	$('#processNumData').html(getThreadNum());
	$('#cpuModelData').html(getCpuModel());
}

$(function () {                                                                     
   $(document).ready(function() {                                                  
	Highcharts.setOptions({                                                     
		global: {                                                               
			useUTC: false                                                       
		}                                                                       
	});                                                                                                                           
  });                                                                             
  createCpuPic();	
 // createMemPic();
 createMemPieChat();	
 createSysData();														
});    
