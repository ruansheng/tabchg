function getConfig(){
	chrome.extension.sendMessage({cmd:"get_config"}, function (response) {
		var data = response.data;
		if(data == '') {
			return;
		}
		if(data.keys != undefined && data.keys != '') {
			var keys = data.keys.split(',');
			var action_keys = $('.action-key-item');
			action_keys.each(function(){
				var key = $(this).attr('key');
				for(var i = 0; i < keys.length; i++) {
					if(key == keys[i]) {
						$(this).attr('is_selected', 1);
						$(this).removeClass('label-default');	
						$(this).addClass('label-success');			
					}
				}
			});				
		}
		if(data.tab_count != undefined) {
			$('#tab_count').val(data.tab_count)
		}
		if(data.host != undefined) {
			$('#host').val(data.host)
		}
		if(data.delayed != undefined) {
			$('#delayed').val(data.delayed)
		}		
	});
}

function saveConfig(){
	var action_keys = $('.action-key-item');
	var keys_array = new Array();
	action_keys.each(function(){
	    var is_selected = $(this).attr('is_selected');
	    var key = $(this).attr('key');		
		if(is_selected == 1) {
			keys_array.push(key);
		}
	});
	
	var keys = keys_array.join(',');
	var tab_count = $('#tab_count').val();
	var host = $('#host').val();
	var delayed = $('#delayed').val();

	var data = {
		cmd:"save_config",
		keys:keys,
		tab_count:tab_count,
		host:host,
		delayed:delayed
	};
	chrome.extension.sendMessage(data, function (response) {
		if(response.status == 1) {
			new Toast({context:$('body'),top:200 ,message:'success'}).success();
		}
	});
}

$(function(){
	// 初始化配置
	getConfig();

	// 点击选择按键效果
	$('.action-key-item').click(function() {
		var is_selected = $(this).attr('is_selected');
		if(is_selected == 0) {
			$(this).attr('is_selected', '1');
			$(this).removeClass('label-default');	
			$(this).addClass('label-success');			
		} else if(is_selected == 1) {
			$(this).attr('is_selected', '0');		
			$(this).removeClass('label-success');					
			$(this).addClass('label-default');						
		}
	});

	// 保存配置
	$('#save-form').click(function() {
		saveConfig();
	});

	$('#on-off-witch input').bootstrapSwitch({
		onColor:"success",  
        offColor:"warning",  
	}); 
	
});
