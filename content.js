// 常规数字按键
var keycodes_big = new Array();
keycodes_big[1] = 49;
keycodes_big[2] = 50;			
keycodes_big[3] = 51;			
keycodes_big[4] = 52;
keycodes_big[5] = 53;			
keycodes_big[6] = 54;			
keycodes_big[7] = 55;
keycodes_big[8] = 56;			
keycodes_big[9] = 57;			

// 数字键盘上的数字
var keycodes_small = new Array();
keycodes_small[1] = 97;
keycodes_small[2] = 98;			
keycodes_small[3] = 99;			
keycodes_small[4] = 100;
keycodes_small[5] = 101;			
keycodes_small[6] = 102;			
keycodes_small[7] = 103;
keycodes_small[8] = 104;			
keycodes_small[9] = 104;

// keycode_ints 转 keycodes
function transKeyCodes(allow_keycodes_ints) {
	var allow_keycodes = new Array();
	for(var i = 0; i < keycodes_small.length; i++) {
		for(var m = 0; m < allow_keycodes_ints.length; m++) {
			if((i + 1) == parseInt(allow_keycodes_ints[m])) {
				allow_keycodes.push(keycodes_small[i + 1]);
			}
		}
	}
	for(var i = 0; i < keycodes_big.length; i++) {
		for(var m = 0; m < allow_keycodes_ints.length; m++) {
			if((i + 1) == parseInt(allow_keycodes_ints[m])) {
				allow_keycodes.push(keycodes_big[i + 1]);
			}
		}
	}
	return allow_keycodes;
}

$(function(){

	// 参数合法性校验
	function filterParams(data) {
		console.log('in filterParams:' + data);
		if(data == '') {
			return false;
		}
		if(data.keys == undefined && data.keys == '') {
			return false;
		}
		if(data.tab_count == undefined || data.tab_count == '') {
			return false;
		}
		if(data.host == undefined || data.host == '') {
			return false;
		}
		if(data.delayed == undefined || data.delayed == '') {
			return false;
		}
		if(data.toggle_state == undefined && data.toggle_state == '') {
			return false;
		}
		console.log('out filterParams:' + data);
		return true;
	}

	// 插件状态开关判断
	function isStart(toggle_state) {
		console.log('in isStart:' + toggle_state);
		if(toggle_state == false) {
			return false;
		}
		
		console.log('out isStart:' + toggle_state);
		return true;
	}
	
	// 域名是否允许
	function isAllowHost(host) {
		console.log('in isAllowHost:' + host);
		var current_host = window.location.host;
		var is_allow = false;
		if(host == current_host) {
			is_allow = true;
		}
		
		console.log('out isAllowHost:' + host + '--' + current_host + '--' +is_allow);
		return is_allow;
	}

	// 按键是否允许
	function isAllowKeyCode(keyCode, keycodes_ints) {
		console.log('in isAllowKeyCode');
		
		// 没有配置按键
		if(keycodes_ints == undefined || keycodes_ints == '') {
			return false;
		}
		
		var allow_keycodes_ints = keycodes_ints.split(',');

		if(allow_keycodes_ints.length == 0) {
			return false;
		}
		
		// keycode数字 转换成 keycode码
		var allow_keycodes = transKeyCodes(allow_keycodes_ints);
		
		// 判断按键是否允许
		var is_allow = false;
		for(var i = 0; i < allow_keycodes.length; i++) {
			if(keyCode == allow_keycodes[i]) {
				is_allow = true;
				break;
			}
		}
		
		console.log('out isAllowKeyCode:--' + is_allow);
		return is_allow;
	}
	
	// 请求background移动tab
	function doMove(delayed) {
		console.log('in doMove:' + delayed);
		setTimeout(function(){				
			chrome.extension.sendMessage({cmd: "move"}, function (response) {
						
			});		
		}, delayed);
	}
	
	function move(keyCode) {
		chrome.extension.sendMessage({cmd:"get_config"}, function (response) {
			var data = response.data;
			
			console.log(data);
				
			// 参数检查
			if(!filterParams(data)) {
				return;
			}
			
			// 是否开启
			if(!isStart(data.toggle_state)) {
				return;
			}
			
			// 是否是允许的host
			if(!isAllowHost(data.host)) {
				return;
			}
			
			// 是否是允许的按键
			if(!isAllowKeyCode(keyCode, data.keys)) {
				return;
			}
			
			// 执行移动tab
			doMove(data.delayed);
		});
	}
	
	// 监听事件
	$(document).keypress(function(e) {
		var keyCode = e.keyCode || e.which;
		console.log('press keycode:' + keyCode);
		move(keyCode);
		
		return true;
	});
	
});