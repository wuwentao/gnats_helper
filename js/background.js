function getVersion(n)
{
var t=new window.XMLHttpRequest;
t.open("GET","manifest.json");
t.onload=function()
	{
	var i=JSON.parse(t.responseText);
	n(i.version)};
	t.send(null)
	}
window.appId=/chrome-extension\:\/\/([^\/]+)\//.exec(chrome.extension.getURL(""))[1];
getVersion(
	function(n)
	{
	if(window.localStorage.cv!=n)
		{
		window.localStorage.cv=n;
		var t=window.webkitNotifications.createNotification("http://www.12306.cn/mormhweb/images/favicon.ico","订票助手已更新","您的订票助手已成功更新至 "+n+" :-)");
		window.setTimeout(function(){t.cancel()},3e3);
		t.show()
		}
	}),
	function()
	{
	function r(n)
	{
	for(var s=n.url,o=!1,t={},e,r=0;r<n.requestHeaders.length;++r)
		{
			var f=n.requestHeaders[r],i=f.name,u=f.value;i==="User-Agent"?t[i]="Mozilla/5.0 (MSIE 9.0; Windows NT 6.1; Trident/5.0;)":f.name=="TRefer"?t.Referer=u:f.name=="Referer"?t.Referer||(t.Referer=u):i.indexOf("Fish-")!=-1?(i=i.substr(5),u?t[i]=u:t[i]&&delete t[i],o=!0):t[i]||(t[i]=u)
		}
		if(!o&&$.isFunction(window.cbl)&&window.cbl.call(n,n.url,t))return{cancel:!0};e=[];
		for(r in t)e.push({name:r,value:t[r]});
		return{requestHeaders:e}
	}
	var n=!1,t=function()
	{
	if(!n)
		{
		var t={urls:["*://*.12306.cn/*"],types:["main_frame","sub_frame","stylesheet","script","image","object","xmlhttprequest","other"]};
		window.chrome.webRequest.onBeforeSendHeaders.addListener(r,t,["blocking","requestHeaders"]);
		window.chrome.webRequest.onBeforeRequest.addListener(function(){return null},t,["blocking"])
		}
	},i;
	window.appId=="gkbheeokbgmmnbjhhlphckobccejghjn"?(i=["bpbefagpafkfgoihbmcgeileodldkpnf","idjgmabfihmhmojipdkcackbihbdceno","iojocdfolilckogkigiahnjfmpjinobl"],chrome.management.getAll(function(r)
	{
	for(var f,u=0;u<r.length;u++)f=r[u],n=n||f.enabled&&$.inArray(f.id,i)!=-1;
	if(n){
		console.log("因为找到了订票助手，所以此扩展中的订票助手已经被禁用。");
		return
		}
	t()
	})):t();
	window.chrome.extension.onRequest.addListener(function(t,i,r){var f=t.function,e,u,o,s;
	if(f=="notify"&&(e=window.webkitNotifications.createNotification("http://www.12306.cn/mormhweb/images/favicon.ico",t.title||"订票助手",t.message),window.setTimeout(function(){e.cancel()},t.timeout||5e3),e.show()),f=="getAppId")
	{r({id:window.appId});return}
	if(f=="isOtherInstanceExist"){r({exist:n});
	return
	}
	if(f=="isLieBaoSpecification")
	{r({yes:appId=="gkbheeokbgmmnbjhhlphckobccejghjn"});return}
	if(f=="getRunTimeInfo")
	{r({appid:window.appId,isOtherInstanceExist:n,isLiebaoIntel:appId=="gkbheeokbgmmnbjhhlphckobccejghjn"});
	return}
	if(f=="ajax")
	{u=t.opt;u.headers=u.headers||{};o={};
	for(s in u.headers)o["Fish-"+s]=u.headers[s];
	u.headers=o;
	u.success=function(n,t,i){r({xhr:i,status:t,data:n,success:!0,opt:u})};
	u.error=function(n,t,i){r({xhr:n,status:t,error:i,success:!1,opt:u})};
	$.ajax(u);return}
	if(f=="getRules"){r(window.rules.data);
	return}
	if(f=="refreshRule")
	{window.refreshRule();return}})
	}();
	window.cbl=function(n)
	{for(var t in window.rules.block)if(window.rules.block[t].test(n))return!0;
	return!1},function()
	{var n=null,r="http://store.fishlee.net/soft/extra/44/rule.json?"+Math.random(),t=function(){n&&(new Date-n)/1e3<2||$.get(r,function(r){try{window.rules=JSON.parse(r);
	u(r);
	i()}
	catch(f){}n=new Date;
	setTimeout(t,6e5)},"text")},u=function(n)
	{localStorage.cn12306rule=n},f=function()
	{window.rules=localStorage.cn12306rule?JSON.parse(localStorage.cn12306rule):{block:["JsAction\\.do"],data:'window.cbl=function(n){return!1|/JsAction\\.do/i.test(n)};window.rc=function(n,t){var i,r,u;return/JsAction\\.do/i.test(n)?(i=/value\\.indexOf\\(\'([01])\'\\)/i.exec(t)&&RegExp.$1||"0",i=i=="0"?"1":"0",i=i.padRight(4,i),r="",u="key",t=t.replace(/(var\\s*)([a-z\\d_]+)\\s*=\\s*[\'"]([a-z\\d=]+)[\'"]/gi,function(n,t,f,e){return r=e,u=f,\'return "\'+r+":"+i+\'";\'}),t=t.replace(/window\\..*?Version/gi,"undefined"),t=t.replace(/(var\\s*([a-z]+)chek)/gi,"return "+u+\'+":\'+i+\'"; $1\'),t=t.replace(/(return\\s*key[^;]+)/gi,"return "+u+\'+":\'+i+\'";\'),t=t.replace(/=\\s*gc\\(\\s*\\)/gi,\'="\'+r+":"+i+\'"\'),t.replace(/(arr)=\\[[\\w\\W]+?\\]\\s*;/gi,"$1=[];")):t};window.dynamicLoad=function(n){$.each(["script[src*=\'JsAction.do\']"],n)}'};
	i();t()},i=function()
	{var n=[];
	$.each(window.rules.block,function(){n.push(new RegExp(this+"","gi"))});
	window.rules.block=n};
	window.refreshRule=function(){t()};
	f()}()