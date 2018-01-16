/*
function gototab(where){
	chrome.extension.sendMessage({cmd: where}, function (response) {
		
	});
}

function domap(keyCode){
	setTimeout(function(){
		var keycodes = new Array(48,49,50,51,52,53,54,55,56, 97,98,99,100,101,102,103,104,105);
		for(var i = 0; i < keycodes.length; i++) {
			if(keyCode == keycodes[i]) {
				gototab("move");				
			}
		}
	},50);
}

function main(){
	document.onkeyup = function (event) {
			var e = event || window.event;
			var keyCode = e.keyCode || e.which;
			domap(keyCode);
     }
}

main();
*/

$(function(){
	function move(keyCode) {
		chrome.extension.sendMessage({cmd:"get_config"}, function (response) {
			var data = response.data;
			if(data == '') {
				return;
			}
			
			if(data.keys == undefined && data.keys == '') {
				return;
			}
			if(data.tab_count == undefined || data.tab_count == '') {
				return;
			}
			if(data.host == undefined || data.host == '') {
				return;
			}
			if(data.delayed == undefined || data.delayed == '') {
				return;
			}		
			setTimeout(function(){
				var keycodes = new Array(48,49,50,51,52,53,54,55,56, 97,98,99,100,101,102,103,104,105);
				for(var i = 0; i < keycodes.length; i++) {
					if(keyCode == keycodes[i]) {
						chrome.extension.sendMessage({cmd: "move"}, function (response) {
		
						});				
					}
				}
			}, data.delayed);
		});
	}
	
	document.onkeyup = function (event) {
		var e = event || window.event;
		var keyCode = e.keyCode || e.which;
		move(keyCode);
    }
});