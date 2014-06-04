/**
 * GNATS Helper
 *
 * Created on: 2014-03-08
 * Author: wtwu@juniper.net
 * Latest version will be stored in http://10.208.180.10/root/wtwu/gnats/
 *
 **/

 
//define public info
var  pr_template_list="__PR_TEMPLATE_LIST__";
var  query_template_list="__QUERY_TEMPLATE_LIST__";
var  gnats_helper_ver="0.1" 

var  default_name = "Default template";
var  default_template = '{"synopsis":"Department:Project:Feature-Tested:Subcategory(optional):<one-line summary>"}';
var  public_name="__PUBLIC_PR_TEMPLATE__"
var  public_template =  '{"description":"##################################################################\n1.    SYMPTOMS AND FREQUENCY OF OCCURRENCE\n##################################################################\nREPLACE WITH SYMPTOMS AND FREQUENCY OF OCCURRENCE\n\n\n\n##################################################################\n2.    EXPECTED-BEHAVIOR\n##################################################################\nREPLACE WITH EXPECTED-BEHAVIOR\n\n\n\n##################################################################\n3.    ORIGINATOR-ANALYSIS\n      E.G. MAIN-FINDINGS, EXCERPTS OF RELEVANT COUNTERS/LOGS/SHOW COMMANDS\n##################################################################\nREPLACE WITH ORIGINATOR-ANALYSIS \n\n\n\n#################################################################################\n4.    MORE-INFO\n      E.G. LOCATION OF COMPLETE CONFIGS, SYSLOGS, FDA OUTPUT, DETAILED COUNTERS\n#################################################################################\nREPLACE WITH MORE-INFO\n\n\n##################################################################\n5.    METADATA (DO NOT MODIFY METADATA VALUES!!!)\n##################################################################\nMETADATA_START\nTEMPLATE_TYPE:SBU\nTEMPLATE_VERSION:2012071302\nMETADATA_END",\
						  "environment":"##################################################################\n1.    TOPOLOGY\n##################################################################\nREPLACE WITH TOPOLOGY\n\n##################################################################\n2.    TRAFFIC-PROFILE\n##################################################################\n------------------------------------------------------------------\n- TRAFFIC PROTOCOLS SENT\n------------------------------------------------------------------\nREPLACE WITH TRAFFIC PROTOCOLS SENT\n\n------------------------------------------------------------------\n- EXTERNAL TRAFFIC GENERATOR\'S PROFILE\n------------------------------------------------------------------\nN/A or REPLACE HERE",\
						  "how-to-repeat":"##################################################################\nSTEPS TO REPRODUCE\n##################################################################\nREPLACE HERE\n\nOR\n\n##################################################################\nTEST-STEPS (if reproduce steps not known)\n##################################################################\nREPLACE HERE"}';

//check localStore
function check_public() {
	// if pr_template_list not exist in localStorage
	// it's first time running,add default value to localStorage
	if (!window.localStorage.getItem(pr_template_list)) {
		window.localStorage.setItem(pr_template_list,default_name);
		window.localStorage.setItem(default_name,default_synopsis);
		}
	if (!window.localStorage.getItem(public_name)) {
		window.localStorage.setItem(public_name,public_template);
	}
}
//first time running end

check_public();

//get template_list from local store
//pr_template_list will save PR tempalte name ,it split each name with ,
function get_template_list(local_name) {
	var my_template_list=window.localStorage.getItem(local_name);
	var my_template_list_arr=my_template_list.split(",");
	return my_template_list_arr;
}


var isChrome = navigator.userAgent.indexOf("AppleWebKit") != -1;

//alert(isChrome);
//alert(isFirefox);

var dbinfo=$("#dbinfo").html();
var mytemp=/user:\ *(\w*)/im;
var myresult=dbinfo.match(mytemp);
var myname=myresult[1];

//get appid path
//fonts will use this path to load
//var fontURL = chrome.extension.getURL("libs/fonts/OpenSans.woff");
//var fontURL = chrome.extension.getURL("libs/font-awesome/fonts/fontawesome-webfont.woff");
//alert(fontURL1);
//alert(fontURL2);


//get the pr/query template name list from localStorage
var memu_pr_template_list=get_template_list(pr_template_list);
//var memu_query_template_list=local_to_obj(query_template_list);

var ui_menu=MenuUI();
var ui_div=DivUI();

//add Float Div to gnats
$("#footer").after(ui_div.join(""));

//add UI to gnats
$("#footer").after(ui_menu.join(""));
	
//disable old toolbar
$("#toolbar").hide();
	
	$(document).ready(function(){
		//enable new menu
		$().wtwu();
		
		//save PR template to local
		$("#save_pr_template").on( "click", function(){
			save_pr_to_local();
		})
		
		//save Query template to local
		$("#save_query_template").on( "click", function(){
			save_query_to_local();
		});
	
		//write default template to form
		$("#sbu").on( "click", function(){
			invoke_templates();
		});
	
		$("#pdt").on( "click", function(){
			invoke_templates();
		});
	
		$("#x47").on( "click", function(){
			var form_value=get_web_form();
		});
		
		//hide gnats helper
		$("#show_old").on( "click", function(){
			$("#wtwu_content").hide();
			$("#toolbar").show();
			//add show button to gnats
			$("#dbinfo").before(oldmenu.join(""));
		});
		
		//show gnats helper
		//$("#show_new").on( "click", function(){
		//	$("#footer").after(ui_menu.join(""));
		//	$("#toolbar").hide();
		//});
	
		
		//add action list for pr template 
		//it will write localStorage PR template to create_form
		if (memu_pr_template_list) {
				$.each(memu_pr_template_list, function(n,my_value){
						$("#"+my_value).on("click", function(){ write_web_form(my_value); });
					});
			
		}
		
		
	});


//Float div for top/bottom function
function DivUI() {
	
	var html = [];
	html.push('<div id="wtwu_div" class="btn-group-vertical btn-group-sm">');
	html.push('<button type="button" id="toTop" class="btn btn-default"><i class="fa fa-chevron-up"></i></button>');
	html.push('<button type="button" id="toBottom" class="btn btn-default"><i class="fa fa-chevron-down"></i></button>');
	html.push('<button type="button" id="switch_menu" class="btn btn-default"><i class="fa fa-exchange"></i></button>');
	html.push('<button type="button" id="filter_content" class="btn btn-default"><i class="fa fa-filter"></i></button>');
	html.push('</div>');
	
	//start to add javascript to gnats web
	html.push('<script type="text/javascript">');
	
	//toTop jquery
    html.push('$("#toTop").click( function () { $("html,body").animate({ "scrollTop" : 0 }, 500); });');
    //toBottom jquery
	//page height
    html.push('var windowHeight = parseInt($("body").css("height" ));');
    html.push('$( "#toBottom").click(function () { $( "html,body").animate({ "scrollTop" : windowHeight }, 500); });');
	
	 html.push('</script>');
	//end to add javascript to gnats web
	
	return html;
}

//Menu define function
function MenuUI() {
	
	var html = [];
	html.push('<div id="wtwu_content">');
	html.push('<ul class="wtwu_menu">');
    html.push('<li><a href="/web/default/"><i class="fa fa-home"></i>Home</a></li>');
	html.push('<li><a href="/web/default/all-my-prs"><i class="fa fa-eye"></i>All My PRs</a>');
		html.push('<ul>');
		html.push('<li><a href="/web/default/my-ownprs">My Owned</a></li>');		
		html.push('<li><a href="/web/default/my-prs">My Responsible</a></li>');
		html.push('<li><a href="/web/default/my-subms">My Submissions</a></li>');
		html.push('</ul>');
    html.push('</li>');
    html.push('<li><a href="Javascript:void(0)"><i class="fa fa-pencil"></i>PR Action</a>');
		html.push('<ul>');
		html.push('<li><a href="/web/default/create">Create PR</a></li>');
		html.push('<li><a href="/web/default/query/">Query PR</a></li>');
		html.push('<li><a href="/web/default/edit/">Edit This PR</a></li>');
		html.push('<li><a href="Javascript:void(0)">Add Audit-Trial</a></li>');
		html.push('<li><a href="Javascript:void(0)">QA Action</a>');
			html.push('<ul>');
			html.push('<li><a href="Javascript:void(0)">Mark Blocker</a></li>');
			html.push('<li><a href="Javascript:void(0)">Provide Info</a></li>');
			html.push('<li><a href="Javascript:void(0)">Add Scope</a></li>');
			html.push('<li><a href="Javascript:void(0)">Verify Failure</a></li>');
			html.push('<li><a href="Javascript:void(0)">Close PR</a></li>');
			html.push('</ul>');
		html.push('</li>');
		html.push('<li><a href="Javascript:void(0)">DEV Action</a>');
			html.push('<ul>');
			html.push('<li><a href="Javascript:void(0)">Need Info</a></li>');
			html.push('<li><a href="Javascript:void(0)">Verify Private Image</a></li>');
			html.push('<li><a href="Javascript:void(0)">Feedback PR</a></li>');
			html.push('</ul>');
		html.push('</li>');
		html.push('</ul>');
	html.push('</li>');
	html.push('<li><a href="Javascript:void(0)"><i class="fa fa-random"></i>PR Template</a>');
		html.push('<ul>');
		html.push('<li id="save_pr_template"><a href="Javascript:void(0)">Save PR Template</a></li>');
		html.push('<li><a href="Javascript:void(0)">My Template</a>');
			html.push('<ul>');
			html.push('<li><a href="Javascript:void(0)">Branch</a></li>');
			html.push('<li><a href="Javascript:void(0)">HighEnd</a></li>');
			html.push('<li><a href="Javascript:void(0)">vSRX</a>');
				
				if (memu_pr_template_list) {
					html.push('<ul>');
						$.each(memu_pr_template_list, function(n,my_value){
						html.push('<li id="'+my_value+'"><a href="Javascript:void(0)">'+my_value+'</a></li>');
					});
					html.push('</ul>');
				}	

			html.push('</li>');
			html.push('<li><a href="Javascript:void(0)">SBU</a></li>');
		html.push('</ul>');
		html.push('</li>');
		html.push('<li><a href="Javascript:void(0)">Public Template</a>');
			html.push('<ul>');
			html.push('<li   id="sbu"><a href="Javascript:void(0)">SBU Template</a></li>');
			html.push('<li   id="pdt"><a href="Javascript:void(0)">PDT Template</a></li>');
			html.push('<li><a href="Javascript:void(0)"  id="x47">X47 Template</a></li>');
			html.push('<li><a href="Javascript:void(0)">vSRX Template</a></li>');
			html.push('</ul>');
		html.push('</li>');
		html.push('<li><a href="Javascript:void(0)">Manager Template</a></li>');
		html.push('</ul>');
	html.push('</li>');
	html.push('<li><a href="Javascript:void(0)"><i class="fa fa-retweet"></i>Query Template</a>');
		html.push('<ul>');
		html.push('<li id="save_query_template"><a href="Javascript:void(0)">Save Template</a></li>');
		html.push('<li><a href="Javascript:void(0)">SBU Template</a></li>');
		html.push('<li><a href="Javascript:void(0)">PDT Template</a></li>');
		html.push('<li><a href="Javascript:void(0)">X47 Template</a></li>');
		html.push('<li><a href="Javascript:void(0)">vSRX Template</a></li>');
		html.push('</ul>');
	html.push('</li>');
	html.push('<li><a href="/web/default/help"><i class="fa fa-leaf"></i>Help</a>');
		html.push('<ul>');
		html.push('<li><a href="/web/">All DBs</a></li>');
		html.push('<li><a href="web/default/az-help">a-z Fields</a></li>');
		html.push('<li><a href="web/default/changes">Gnats Changes</a></li>');
		html.push('<li><a href="mailto:wtwu@juniper.net?subject=Report a Gnats Helper Bug">Report Bug</a></li>');
		html.push('<li><a href="mailto:wtwu@juniper.net?subject=Gnats Helper new requirement">New Requirement</a></li>');
		html.push('<li><a href="Javascript:void(0)">About Gnats Helper</a></li>');
		html.push('</ul>');
	html.push('</li>');
    html.push('<li class="search">');
    html.push('<form id="dwim-form" method="get" action="/web/default/dwim">');
    html.push('<input type="text" id="dwim" name="s" size="30" title="PR NUM/edit NUMBER/Expr/username" class="search" placeholder="PR NUM/edit NUMBER/Expr/username" />');
    html.push('</form>');
    html.push('</li>');
	html.push('</ul>');
	html.push('</div>');
	
	return html;
}


//check all the detail user info
function get_Browerinfo() {
	//get userAgent
	var userinfo=new Object;
	userinfo["userAgent"]=window.navigator.userAgent;
	userinfo["language"]=window.navigator.language;
	userinfo["platform"]=window.navigator.platform;
	userinfo["appName"]=window.navigator.appName;
	userinfo["screen"]=window.screen;
	return userinfo;
}

//localStorage object to javascript object
function local_to_obj(local_name) {
		if (local_name)	{
			var obj_name = JSON.parse(localStorage.getItem(local_name));
			return obj_name;
		}
}
//javascript object to localStorage
function obj_to_local(obj_name,local_name) {
		if ( obj_name && local_name)  {
			localStorage.setItem(local_name,JSON.stringify(obj_name));
		}
}


//get create PR form value,Step1
function get_web_form() {

var gnats_web=new Object();
gnats_web['synopsis']=$('#synopsis').val();
gnats_web['reported-in']=$('#reported-in').val();
gnats_web['last-known-working-release']=$('#last-known-working-release').val();
gnats_web['submitter-id']=$('#submitter-id').val();
gnats_web['found-during']=$('#found-during').val();
gnats_web['functional-area']=$('#functional-area').val();
gnats_web['class']=$('#class').val();
gnats_web['pr-impact']=$('#pr-impact').val();
gnats_web['product']=$('#product').val();
gnats_web['platform']=$('#platform').val();
gnats_web['software-image']=$('#software-image').val();
gnats_web['category']=$('#category').val();
gnats_web['client-os']=$('#client-os').val();
gnats_web['client-browser']=$('#client-browser').val();
gnats_web['problem-level']=$('#problem-level').val();
gnats_web['cve-id']=$('#cve-id').val();
gnats_web['cvss-base-score']=$('#cvss-base-score').val();
gnats_web['cwe-id']=$('#cwe-id').val();
gnats_web['keywords']=$('#keywords').val();
gnats_web['configuration']=$('#configuration').val();
gnats_web['planned-release{1}']=$('#planned-release{1}').val();
gnats_web['customer-escalation{1}']=$('#customer-escalation{1}').val();
gnats_web['responsible{1}']=$('#responsible{1}').val();
gnats_web['systest-owner{1}']=$('#systest-owner{1}').val();
gnats_web['notify-list']=$('#notify-list').val();
gnats_web['customer']=$('#customer').val();
gnats_web['related-prs']=$('#related-prs').val();
gnats_web['rli']=$('#rli').val();
gnats_web['npi-program']=$('#npi-program').val();
gnats_web['testcase-id']=$('#testcase-id').val();
gnats_web['jtac-case-id']=$('#jtac-case-id').val();
gnats_web['support-notes']=$('#support-notes').val();
gnats_web['supporting-device-release']=$('#supporting-device-release').val();
gnats_web['supporting-device-product']=$('#supporting-device-product').val();
gnats_web['supporting-device-platform']=$('#supporting-device-platform').val();
gnats_web['supporting-device-sw-image']=$('#supporting-device-sw-image').val();
gnats_web['description']=$('#description').val();
gnats_web['corefile-location']=$('#corefile-location').val();
gnats_web['corefile-stacktrace']=$('#corefile-stacktrace').val();
gnats_web['environment']=$('#environment').val();
gnats_web['how-to-repeat']=$('#how-to-repeat').val();
gnats_web['beta-programs']=$('#beta-programs').val();
gnats_web['release-build-date']=$('#release-build-date').val();
gnats_web['beta-customers']=$('#beta-customers').val();
gnats_web['release-deploy-date']=$('#release-deploy-date').val();
gnats_web['fix']=$('#fix').val();

return replace_default_value(gnats_web)

}

//replate null and default value from web form before save to local
function replace_default_value(obj_name) {
	if (obj_name) {
		for (var p in obj_name) { 
		//delete null value and default value in form data
			if ((obj_name[p]) =="" || (obj_name[p]) =="type for auto-completion" || (obj_name[p]) =="unknown" || (obj_name[p]) =="enter the number(s) of the testcase(s) generated for gap closure" || (obj_name[p]) =="11\r\n11" || (obj_name[p]) ==" ") {
				delete obj_name[p];
			}
		}
		//delete from/how-to-repeat/description/environment,these value will always use public template
		// from: and how-to-repate need use ' to delete it
		delete obj_name['from:'];
		delete obj_name["description"];
		delete obj_name["environment"];
		delete obj_name['how-to-repeat'];
	return obj_name;
	}	
}

//var form_id_list=["synopsis","reported-in","last-known-working-release","submitter-id","found-during","functional-area","class","pr-impact","product","platform","software-image","category","client-os","client-browser","problem-level","cve-id","cvss-base-score","cwe-id","keywords","configuration","notify-list","customer","related-prs","rli","npi-program","testcase-id","jtac-case-id","support-notes","supporting-device-release","supporting-device-product","supporting-device-platform","supporting-device-sw-image","description","corefile-location","corefile-stacktrace","environment","how-to-repeat","beta-programs","release-build-date","beta-customers","release-deploy-date","fix"];
 
//get create PR form value,Step1
function get_web_form2() {
		var form_value_list=$("#create_form").serializeArray();
		var form_value={};
		$.each(form_value_list, function(i, field){
				form_value[field.name]=field.value;
			});
		return replace_default_value2(form_value);
}

//replate null and default value from web form before save to local
function replace_default_value2(obj_name) {
	if (obj_name) {
		for (var p in obj_name) { 
		//delete null value and default value in form data
			if ((obj_name[p]) =="" || (obj_name[p]) =="type for auto-completion" || (obj_name[p]) =="unknown" || (obj_name[p]) =="enter the number(s) of the testcase(s) generated for gap closure" || (obj_name[p]) =="11\r\n11" || (obj_name[p]) ==" ") {
				delete obj_name[p];
			}
		}
		//delete from/how-to-repeat/description/environment,these value will always use public template
		// from: and how-to-repate need use ' to delete it
		delete obj_name['from:'];
		delete obj_name["description"];
		delete obj_name["environment"];
		delete obj_name['how-to-repeat'];
	return obj_name;
	}	
}

//write PR form value from local template
function write_web_form(local_name) {
		//local temlate value 
		//form_value_list is not null 
		var form_value_list=local_to_obj(local_name);
		if (form_value_list) {
			//check create_form and problem-level form value is not null
			var create_form=$("#problem-level").val();
			if (create_form) {
				//need to do fireEvent for these values:
				//  #submitter-id  #product   #supporting-device-product
				//	$("#submitter-id").val("systest").trigger("change");
				//	$("#product").val("vsrx-series").trigger("change");
				//	$("#supporting-device-product").val("vsrx-series").trigger("change");
				if (form_value_list['submitter-id'])  { 
					$('#submitter-id').val(form_value_list['submitter-id']).trigger("change");
				}
				if (form_value_list['product'])  { 
					$('#product').val(form_value_list['product']).trigger("change");
				}
				if (form_value_list['supporting-device-product'])  { 
					$('#supporting-device-product').val(form_value_list['supporting-device-product']).trigger("change");
				}
				//write other value to web form
				$.each(form_value_list, function(i, field){
						//skip fireEvent id
						if ((i!='submitter-id') || (i!='product') || (i!='supporting-device-product') ) {
							$("#"+i).val(field);
						}
					});
			}
			else {
				alert("Sorry,You are not in PR Create page!")
			}
			
		}
		//public template value
		var public_value_list=local_to_obj(public_name);
		if (public_value_list) {
					$.each(public_value_list, function(i, field){
						$("#"+i).val(field);
				});
		}
}


//display a form to input the template name,Step2
function get_template_name() {
	template_name=window.prompt("\n All the form data has been saved!\n\nPlease input the template name:",myname+"_template1");
	return template_name;
}

//save template name to localStorage array
function template_name_to_local(template_name,local_name) {
	//check local_template_list
	//if pr_template_list is null
	if (template_name && local_name) {
		var local_pr_template_list = window.localStorage.getItem(local_name);
		//if no localStorage data,then add default
		if (!local_pr_template_list) {
			check_public();
		}
		else {
			//add a , to split the string as a array
			var my_pr_template_list=local_pr_template_list+","+template_name;
			//add a ,to split the string as a array
			window.localStorage.setItem(local_name,my_pr_template_list);
		}
}
}

//save web to localStorage
function template_data_to_local(obj_name,local_name) {
	//check web object is available
	if (obj_name && local_name) {
		//save object to localStorage
		//Note:the same value will be overwrite,we don't check it now
		obj_to_local(obj_name,local_name);
		return true;
	}
	else {
		alert(obj_name+" is null in web_to_local function");
		return false;
	}
	
}

//check localStorage
function check_localStorage() {
	if((window.localStorage)){
		return true;
	} else {
		alert('Sorry,Your Web browser not support localStorage feature!');
		return false;
	}
}

//save PR form data to localStorage
function save_pr_to_local() {
		//var my_template_obj_temp=get_web_form();
		//check create_form and problem-level form value is not null
		var create_form=$("#problem-level").val();
		if (create_form) {
			var my_template_obj=get_web_form();
			var my_template_name=get_template_name();
			if (my_template_obj && my_template_name) {
				template_name_to_local(my_template_name,pr_template_list);
				template_data_to_local(my_template_obj,my_template_name)
			}
		}
		else  {
			alert("Sorry,You are not in PR Create page!")
		}
}



/*
keyword:Gnats query-pr expression

$("div.code").text()
$("div.code").html()
format1:
<a name="expr"></a><b>Gnats query-pr expression</b>:
<div class="code">(responsible == &quot;wtwu&quot; &amp; state != &quot;suspended&quot; &amp; state != &quot;closed&quot;)</div>

$("#expr textarea").text()
$("#expr textarea").val()
format2:
  <div id="adv" class="tab-contents">
    Using Gnats query-pr expression:
    <div id="expr">
      <textarea name="expr" rows="5" cols="80">((From:==&quot;wtwu&quot; | From:==&quot;wtwu@juniper.net&quot;) &amp;                  state != &quot;suspended&quot; &amp; state != &quot;closed&quot;)</textarea>
    </div>

	
$.post('https://gnats.juniper.net/web/default/do-query',
		{adv:1,expr:'(responsible == "wtwu" & state != "suspended" & state != "closed")'},
		function(data,status){
			//console.log("数据：" + data + "\n状态：" + status);
			if (status=="success") {
				window.location = 'https://gnats.juniper.net/web/default/do-query';
			}
		})	
*/


//save PR form data to localStorage
function save_query_to_local() {
		//check PR Query Expression in current page
		//it have two format 
		var query_result=$("div.code").text();
		var query_form=$("#expr textarea").text();
		var query_expr;
		if (query_result) {
			query_expr=query_result;
		}
		else if (query_form)  {
			query_expr=query_form;
			}
		else  {
			alert("Sorry,This page don't have any PR Query Expression!")
		}
		//if query_expr is not null
		if (query_expr)   {
			//var my_template_obj=get_web_form();
			//var my_template_name=get_template_name();
			//if (my_template_obj && my_template_name) {
			//	template_name_to_local(my_template_name,pr_template_list);
			//	template_data_to_local(my_template_obj,my_template_name)
			alert("Query Expression is:\n"+query_expr)
			//}
		}
}

