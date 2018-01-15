chrome.browserAction.onClicked.addListener(function(activeTab)
{
    chrome.tabs.create({ url: 'index.html'});
});
chrome.runtime.onInstalled.addListener(function (object) 
{
    chrome.tabs.create({ url: 'index.html' });
});

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