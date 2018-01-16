chrome.browserAction.onClicked.addListener(function(activeTab)
{
    chrome.tabs.create({ url: 'index.html'});
});
chrome.runtime.onInstalled.addListener(function (object) 
{
    chrome.tabs.create({ url: 'index.html' });
});

chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
	if(request.cmd == 'save_config') {
		var keys = request.keys;
		var tab_count = request.tab_count;
		var host = request.host;
		var delayed = request.delayed;						

		saveConfigData(keys, tab_count, host, delayed);
		sendResponse({status:1});
	} else if(request.cmd == 'get_config') {
		var data = getConfigData();
		sendResponse({data:data});
	} else if(request.cmd == 'move') {
		curTab = sender.tab;
		chrome.windows.get(sender.tab.windowId, {populate: true}, function (window) {
			curWindow = window;
			activeMove();
		});		
	}
});

// 保存配置
function saveConfigData(keys, tab_count, host, delayed) {
	var data = {
		keys:keys,
		tab_count:tab_count,
		host:host,
		delayed:delayed
	};
	var string = JSON.stringify(data);
	localStorage.setItem("tagchg_config", string);
}

// 获取配置
function getConfigData() {
	var string = JSON.stringify(data);
	var string = localStorage.getItem("tagchg_config");
	if(string == null || string == "") {
		return '';
	}
	var data = JSON.parse(string)
	return data;
}

/*
chrome.extension.onMessage.addListener(
	function (request, sender, sendResponse) {
		
		curTab = sender.tab;
		chrome.windows.get(sender.tab.windowId, {populate: true}, function (window) {
			curWindow = window;
			if(request.cmd=="move"){
				activeMove();
			}
		});		
});
*/

function activeMove(){
	//最后一个了
	if(curTab.index == curWindow.tabs.length-1){
		for (var i = 0 in curWindow.tabs) {
			if(curWindow.tabs[i].index == curTab.index-4){
				chrome.tabs.update(curWindow.tabs[i].id, {active: true});
			}
		}
	} else{
		for (var i = 0 in curWindow.tabs) {
			if(curWindow.tabs[i].index == curTab.index+1){
				chrome.tabs.update(curWindow.tabs[i].id, {active: true});
			}
		}
	}
}