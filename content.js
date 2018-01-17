var keycodes_small = new Array();
keycodes_small[1] = 48;
keycodes_small[2] = 49;			
keycodes_small[3] = 50;			
keycodes_small[4] = 51;
keycodes_small[5] = 52;			
keycodes_small[6] = 53;			
keycodes_small[7] = 54;
keycodes_small[8] = 55;			
keycodes_small[9] = 56;			

var keycodes_big = new Array();
keycodes_big[1] = 97;
keycodes_big[2] = 98;			
keycodes_big[3] = 99;			
keycodes_big[4] = 100;
keycodes_big[5] = 101;			
keycodes_big[6] = 102;			
keycodes_big[7] = 103;
keycodes_big[8] = 104;			
keycodes_big[9] = 104;

$(function(){

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
	
	function isAllowKeyCode(keyCode, keycodes_ints) {
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
		console.log(allow_keycodes);
		
		// 判断按键是否允许
		for(var i = 0; i < allow_keycodes.length; i++) {
			if(keyCode == allow_keycodes[i]) {
				return true;
			}
		}
		return false;
	}
	
	function filterParams(data) {
		if(data == '') {
			return flase;
		}
		if(data.keys == undefined && data.keys == '') {
			return flase;
		}
		if(data.toggle_state == undefined && data.toggle_state == '') {
			return flase;
		}
		if(data.tab_count == undefined || data.tab_count == '') {
			return flase;
		}
		if(data.host == undefined || data.host == '') {
			return flase;
		}
		if(data.delayed == undefined || data.delayed == '') {
			return flase;
		}
		return true;
	}
	
	function isStart(toggle_state) {
		if(toggle_state == false) {
			return false;
		}
		return true;
	}
	
	function isAllowHost(host) {
		
	}
	
	function doMove() {
		setTimeout(function(){				
			console.log('doMove');
			chrome.extension.sendMessage({cmd: "move"}, function (response) {
						
			});				
		}, 1000);
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
			
			// 是否是允许的按键
			if(!isAllowKeyCode(keyCode, data.keys)) {
				return;
			}
			
			// 是否是允许的host
			if(!isAllowHost(data.host)) {
				
			}
			
			doMove();
		});
	}
	
	// 监听事件
	$(document).keypress(function(e) {
		var keyCode = e.keyCode || e.which;
		move(keyCode);
		return true;
	});
	
});