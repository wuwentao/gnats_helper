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

var  default_synopsis = "Department:Project:Feature-Tested:Subcategory(optional):<one-line summary>";
var  default_description = "##################################################################\n1.    SYMPTOMS AND FREQUENCY OF OCCURRENCE\n##################################################################\nREPLACE WITH SYMPTOMS AND FREQUENCY OF OCCURRENCE\n\n\n\n##################################################################\n2.    EXPECTED-BEHAVIOR\n##################################################################\nREPLACE WITH EXPECTED-BEHAVIOR\n\n\n\n##################################################################\n3.    ORIGINATOR'S-ANALYSIS\n      E.G. MAIN-FINDINGS, EXCERPTS OF RELEVANT COUNTERS/LOGS/SHOW COMMANDS\n##################################################################\nREPLACE WITH ORIGINATOR'S-ANALYSIS \n\n\n\n#################################################################################\n4.    MORE-INFO\n      E.G. LOCATION OF COMPLETE CONFIGS, SYSLOGS, FDA OUTPUT, DETAILED COUNTERS\n#################################################################################\nREPLACE WITH MORE-INFO\n\n\n##################################################################\n5.    METADATA (DO NOT MODIFY METADATA VALUES!!!)\n##################################################################\nMETADATA_START\nTEMPLATE_TYPE:SBU\nTEMPLATE_VERSION:2012071302\nMETADATA_END";
var  default_environment = "##################################################################\n1.    TOPOLOGY\n##################################################################\nREPLACE WITH TOPOLOGY\n\n##################################################################\n2.    TRAFFIC-PROFILE\n##################################################################\n------------------------------------------------------------------\n- TRAFFIC PROTOCOLS SENT\n------------------------------------------------------------------\nREPLACE WITH TRAFFIC PROTOCOLS SENT\n\n------------------------------------------------------------------\n- EXTERNAL TRAFFIC GENERATOR\'S PROFILE\n------------------------------------------------------------------\nN/A or REPLACE HERE";
var  default_how_to_repeat = "##################################################################\nSTEPS TO REPRODUCE\n##################################################################\nREPLACE HERE\n\nOR\n\n##################################################################\nTEST-STEPS (if reproduce steps not known)\n##################################################################\nREPLACE HERE";




//add sbupdt specific template 
var keywords_template = "12.1x47d10sbupdt,sbupdt,vsrx,testbed,module/feature";
var notifylist_template = "sbu-pdt-bug,bug-sw-vsrx-platform";
var rli_template = "21988";
var plannedrelease_template = "DEV_SRX_12Q1_X47_BRANCH";
// Templates (note: multi-line values need to include escaped newline chars (\n) and backslash escape (\) at the end of each line
var synopsis_template = "SBU-PDT X47 VSRX:Feature-Tested:Subcategory(optional):<one-line summary>";
var description_template = "##################################################################\n1.    SYMPTOMS AND FREQUENCY OF OCCURRENCE\n##################################################################\nREPLACE WITH SYMPTOMS AND FREQUENCY OF OCCURRENCE\n\n\n\n##################################################################\n2.    EXPECTED-BEHAVIOR\n##################################################################\nREPLACE WITH EXPECTED-BEHAVIOR\n\n\n\n##################################################################\n3.    ORIGINATOR'S-ANALYSIS\n      E.G. MAIN-FINDINGS, EXCERPTS OF RELEVANT COUNTERS/LOGS/SHOW COMMANDS\n##################################################################\nREPLACE WITH ORIGINATOR'S-ANALYSIS \n\n\n\n#################################################################################\n4.    MORE-INFO\n      E.G. LOCATION OF COMPLETE CONFIGS, SYSLOGS, FDA OUTPUT, DETAILED COUNTERS\n#################################################################################\nREPLACE WITH MORE-INFO\n\n\n##################################################################\n5.    METADATA (DO NOT MODIFY METADATA VALUES!!!)\n##################################################################\nMETADATA_START\nTEMPLATE_TYPE:SBU\nTEMPLATE_VERSION:2012071302\nMETADATA_END";
var environment_template = "##################################################################\n1.    TOPOLOGY\n##################################################################\nREPLACE WITH TOPOLOGY\n\n##################################################################\n2.    TRAFFIC-PROFILE\n##################################################################\n------------------------------------------------------------------\n- TRAFFIC PROTOCOLS SENT\n------------------------------------------------------------------\nREPLACE WITH TRAFFIC PROTOCOLS SENT\n\n------------------------------------------------------------------\n- EXTERNAL TRAFFIC GENERATOR\'S PROFILE\n------------------------------------------------------------------\nN/A or REPLACE HERE";
var how_to_repeat_template = "##################################################################\nSTEPS TO REPRODUCE\n##################################################################\nREPLACE HERE\n\nOR\n\n##################################################################\nTEST-STEPS (if reproduce steps not known)\n##################################################################\nREPLACE HERE";



var obj_id;
var obj_value;
var template_alert_msg = '';

// Function is to get focus of text objects with input hints such as Planned-release, Notify-List 
function get_focus(obj_id) {
	if (navigator.appName == "Microsoft Internet Explorer") {
//		alert("You're using IE");	
		document.getElementById(obj_id).click();
		document.getElementById(obj_id).focus();	
/*		setTimeout('document.getElementById(obj_id).select()', 5000);
		setTimeout(function(){
			document.getElementById(obj_id).focus();
			document.getElementById(obj_id).select();	
			document.getElementById(obj_id).click();	
			}, 1000); 	
*/
	} else {
		//alert(navigator.appName);  
		document.getElementById(obj_id).focus();
	}
}

// Function is to set template value to normal text object such as Keywords, RLI 
function set_value_1(obj_id,obj_value) {

        if (document.getElementById(obj_id).value.search(obj_value) == -1) {
                if (document.getElementById(obj_id).value.length > 0) {
                        template_alert_msg = template_alert_msg + obj_id + ' has been prepended with template\n';
                }
                document.getElementById(obj_id).value = obj_value + document.getElementById(obj_id).value;
        }

}

// Function is to set template value to text objects with input hints such as Planned-Release and Notify-List
function set_value_2(obj_id, obj_value) {

	get_focus(obj_id);

        if (document.getElementById(obj_id).value.search('type for auto-completion') == -1) {
                if (document.getElementById(obj_id).value.search(obj_value) == -1) {
                        if (document.getElementById(obj_id).value.length > 0) {
                        template_alert_msg = template_alert_msg + obj_id + ' has been prepended with template\n';
                        }
		document.getElementById(obj_id).value = obj_value + document.getElementById(obj_id).value;
                }
        } else {
		document.getElementById(obj_id).value = obj_value;
	}

}

// Function is to create onchange event for select list
function fireEvent(obj_id,event){
        if (document.createEventObject){
          // dispatch for IE
          ////var evt = document.createEventObject();
          document.getElementById(obj_id).fireEvent('on'+event); 
	} else { 
	 var evt=document.createEvent("HTMLEvents");//FF 
         evt.initEvent(event, true, true);  
         document.getElementById(obj_id).dispatchEvent(evt); 
	}     
}

function _fireEvent(obj_id, obj_value, event) {
        var act = "on" + event;
	var el = document.getElementById(obj_id);
	el.onchange = function () {document.getElementById(obj_id).value = obj_value;}
        fireEvent(obj_id,event);
}

// Function is to generate template
function invoke_templates() {
//	var template_alert_msg = '';


	// Synopsis: always overwrite
	if (document.getElementById('synopsis').value.length > 0 && document.getElementById('synopsis').value.search(synopsis_template) == -1) {
		template_alert_msg = template_alert_msg + 'Synopsis has been overwritten with template value\n';
		document.getElementById('synopsis').value = synopsis_template;
	} else if (document.getElementById('synopsis').value.length == 0) {
		document.getElementById('synopsis').value = synopsis_template;
	}

	// Description: Only prepend if template does not exist
	if (document.getElementById('description').value.search('METADATA_START') == -1 && document.getElementById('description').value.search('METADATA_END') == -1) {
		if (document.getElementById('description').value.length > 0) {
			template_alert_msg = template_alert_msg + 'Description has been prepended with template\n';
		}
		document.getElementById('description').value = description_template + document.getElementById('description').value;
	}

	// Environment: Only prepend if template does not exist
	if (document.getElementById('environment').value.search('1.    TOPOLOGY') == -1) {
		if (document.getElementById('environment').value.length > 0) {
			template_alert_msg = template_alert_msg + 'Environment has been prepended with template\n';
		}
		document.getElementById('environment').value = environment_template + document.getElementById('environment').value;
	}

	// How-To-Repeat: Only prepend if template does not exist
	if (document.getElementById('how-to-repeat').value.search('STEPS TO REPRODUCE') == -1 && document.getElementById('how-to-repeat').value.search('TEST-STEPS') == -1) {
		if (document.getElementById('how-to-repeat').value.length > 0) {
			template_alert_msg = template_alert_msg + 'How-To-Repeat has been overwritten with template value\n';
		}
		document.getElementById('how-to-repeat').value = how_to_repeat_template + document.getElementById('how-to-repeat').value;
	}

	//add sbupdt specific template


	document.getElementById('submitter-id').onload = _fireEvent('submitter-id', 'systest', 'change'); 
	document.getElementById('product').onload = _fireEvent('product', 'vsrx-series', 'change');

	set_value_1('keywords', keywords_template); 
    set_value_1('rli', rli_template);   
	
	set_value_2('planned-release{1}', plannedrelease_template);
	set_value_2('notify-list', notifylist_template);

       
	setTimeout(function() {document.getElementById('found-during').value = "Product delivery test";}, 0);
	document.getElementById('functional-area').value = "software"; 
	//document.getElementById('platform').onload = _fireEvent('platform', 'SRX-5600', 'change');
	setTimeout(function() {document.getElementById('platform').value = "VSRX";}, 0);	
	setTimeout(function() {document.getElementById('software-image').value = "junos-vsrx";}, 0);


    document.getElementById('synopsis').focus();
    //document.getElementById('section_problem_summary').innerHTML = 'Problem Summary / template was created by Michael Zhou <a href="mailto:mzhou@juniper.net">mzhou</a>'; 
 
	// Generate alert if required
	if (template_alert_msg.length > 0) {
		alert(template_alert_msg);
	}
}



var isChrome = navigator.userAgent.indexOf("AppleWebKit") != -1;

//alert(isChrome);
//alert(isFirefox);

var dbinfo=$("#dbinfo").html();
var mytemp=/user:\ *(\w*)/im;
var myresult=dbinfo.match(mytemp);
var myname=myresult[1];

DefaultUI();

//-----------------UI界面--------------------------


function DefaultUI() {
	
	var html = [];
	html.push('<div id="wtwu-content">');
	html.push('<ul class="venus-menu">');
    html.push('<li><a href="/web/default/"><i class="fa fa-home"></i>Home</a></li>');
	html.push('<li><a href="/web/default/all-my-prs"><i class="fa fa-eye"></i>All My PRs</a>');
		html.push('<ul>');
		html.push('<li><a href="/web/default/my-ownprs">My Owned</a></li>');		
		html.push('<li><a href="/web/default/my-prs">My Responsible</a></li>');
		html.push('<li><a href="/web/default/my-subms">My Submissions</a></li>');
		html.push('</ul>');
    html.push('</li>');
    html.push('<li><a href="#"><i class="fa fa-pencil"></i>PR Action</a>');
		html.push('<ul>');
		html.push('<li><a href="/web/default/create">Create New</a></li>');
		html.push('<li><a href="/web/default/edit/">Edit This PR</a></li>');
		html.push('<li><a href="/web/default/query/">Query PR</a></li>');
		html.push('<li><a href="#">QA Action</a>');
			html.push('<ul>');
			html.push('<li><a href="#">Mark Blocker</a></li>');
			html.push('<li><a href="#">Provide Info</a></li>');
			html.push('<li><a href="#">Verify Failure</a></li>');
			html.push('<li><a href="#">Close PR</a></li>');
			html.push('</ul>');
		html.push('</li>');
		html.push('<li><a href="#">DEV Action</a>');
			html.push('<ul>');
			html.push('<li><a href="#">Need Info</a></li>');
			html.push('<li><a href="#">Verify Private Image</a></li>');
			html.push('<li><a href="#">Feedback PR</a></li>');
			html.push('</ul>');
		html.push('</li>');
		html.push('<li><a href="#">Add Audit-Trial</a></li>');
		html.push('<li><a href="#">Add Scope</a></li>');
		html.push('</ul>');
	html.push('</li>');
	html.push('<li><a href="#"><i class="fa fa-random"></i>PR Template</a>');
		html.push('<ul>');
		html.push('<li id="save_pr_template"><a href="#">Save Template</a></li>');
		html.push('<li><a href="#">My Template</a>');
			html.push('<ul>');
			html.push('<li><a href="#">Branch</a></li>');
			html.push('<li><a href="#">HighEnd</a></li>');
			html.push('<li><a href="#">vSRX</a>');
				html.push('<ul>');
				html.push('<li><a href="#">X46</a>');
					html.push('<ul>');
					html.push('<li><a href="#">X46-D10</a></li>');
					html.push('<li><a href="#">X46-D15</a></li>');
					html.push('<li><a href="#">X46-D20</a></li>');
					html.push('</ul>');
				html.push('</li>');
				html.push('<li><a href="#">X47</a></li>');
				html.push('<li><a href="#">X48</a></li>');
				html.push('<li><a href="#">X49</a></li>');
				html.push('</ul>');
			html.push('</li>');
			html.push('<li><a href="#">SBU</a></li>');
		html.push('</ul>');
		html.push('</li>');
		html.push('<li><a href="#">Public Template</a>');
			html.push('<ul>');
			html.push('<li   id="sbu"><a href="#">SBU Template</a></li>');
			html.push('<li   id="pdt"><a href="#">PDT Template</a></li>');
			html.push('<li><a href="#"  id="x47">X47 Template</a></li>');
			html.push('<li><a href="#">vSRX Template</a></li>');
			html.push('</ul>');
		html.push('</li>');
		html.push('<li><a href="#">Manager Template</a></li>');
		html.push('</ul>');
	html.push('</li>');
	html.push('<li><a href="#"><i class="fa fa-retweet"></i>Query Template</a>');
		html.push('<ul>');
		html.push('<li><a href="#">SBU Template</a></li>');
		html.push('<li><a href="#">PDT Template</a></li>');
		html.push('<li><a href="#">X47 Template</a></li>');
		html.push('<li><a href="#">vSRX Template</a></li>');
		html.push('</ul>');
	html.push('</li>');
	html.push('<li><a href="/web/default/help"><i class="fa fa-leaf"></i>Help</a>');
		html.push('<ul>');
		html.push('<li><a href="/web/">All DBs</a></li>');
		html.push('<li><a href="web/default/az-help">a-z Fields</a></li>');
		html.push('<li><a href="web/default/changes">Gnats Changes</a></li>');
		html.push('<li><a href="mailto:wtwu@juniper.net?subject=Report a Gnats Helper Bug">Report Bug</a></li>');
		html.push('<li><a href="mailto:wtwu@juniper.net?subject=Gnats Helper new requirement">New Requirement</a></li>');
		html.push('<li><a href="#">About Gnats Helper</a></li>');
		html.push('</ul>');
	html.push('</li>');
    html.push('<li class="search">');
    html.push('<form id="dwim-form" method="get" action="/web/default/dwim">');
    html.push('<input type="text" id="dwim" name="s" size="30" title="PR NUM/edit NUMBER/Expr/username" class="search" placeholder="PR NUM/edit NUMBER/Expr/username" />');
    html.push('</form>');
    html.push('</li>');
	html.push('</ul>');
	html.push('</div>');

	//add UI to gnats
	$("#footer").after(html.join(""));
	//disable old toolbar
	$("#toolbar").hide();
		
	$(document).ready(function(){
		
		//enable new menu
		$().wtwu();
	
		//save PR template to local
		$("#save_pr_template").on( "click", function(){
			save_web_to_local();
		});
	
		//write default template to form
		$("#sbu").on( "click", function(){
			invoke_templates();
		});
	
		$("#pdt").on( "click", function(){
			invoke_templates();
		});
	
		$("#x47").on( "click", function(){
			invoke_templates();
		});
		
		
		
	});
	
	

	
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

//javascript object to localStorage
function obj_to_local(obj_name,local_name) {
		if ( obj_name || local_name)  {
			localStorage.setItem(local_name,JSON.stringify(obj_name));
		}
}

//localStorage to javascript object
function local_to_obj(local_name) {
		var obj_name = JSON.parse(localStorage.getItem(local_name));
		return obj_name;
}


//var form_id_list=["synopsis","reported-in","last-known-working-release","submitter-id","found-during","functional-area","class","pr-impact","product","platform","software-image","category","client-os","client-browser","problem-level","cve-id","cvss-base-score","cwe-id","keywords","configuration","notify-list","customer","related-prs","rli","npi-program","testcase-id","jtac-case-id","support-notes","supporting-device-release","supporting-device-product","supporting-device-platform","supporting-device-sw-image","description","corefile-location","corefile-stacktrace","environment","how-to-repeat""beta-programs","release-build-date","beta-customers","release-deploy-date","fix"];

//get create PR form value,Step1
function get_web_form2() {

var gnats_web=new Object();
gnats_web["synopsis"]=$("#synopsis").val();
gnats_web["reported-in"]=$("#reported-in").val();
gnats_web["last-known-working-release"]=$("#last-known-working-release").val();
gnats_web["submitter-id"]=$("#submitter-id").val();
gnats_web["found-during"]=$("#found-during").val();
gnats_web["functional-area"]=$("#functional-area").val();
gnats_web["class"]=$("#class").val();
gnats_web["pr-impact"]=$("#pr-impact").val();
gnats_web["product"]=$("#product").val();
gnats_web["platform"]=$("#platform").val();
gnats_web["software-image"]=$("#software-image").val();
gnats_web["category"]=$("#category").val();
gnats_web["client-os"]=$("#client-os").val();
gnats_web["client-browser"]=$("#client-browser").val();
gnats_web["problem-level"]=$("#problem-level").val();
gnats_web["cve-id"]=$("#cve-id").val();
gnats_web["cvss-base-score"]=$("#cvss-base-score").val();
gnats_web["cwe-id"]=$("#cwe-id").val();
gnats_web["keywords"]=$("#keywords").val();
gnats_web["configuration"]=$("#configuration").val();
//gnats_web["planned-release{1}"]=$("#planned-release{1}").val();
//gnats_web["customer-escalation{1}"]=$("#customer-escalation{1}").val();
//gnats_web["responsible{1}"]=$("#responsible{1}").val();
//gnats_web["systest-owner{1}"]=$("#systest-owner{1}").val();
gnats_web["notify-list"]=$("#notify-list").val();
gnats_web["customer"]=$("#customer").val();
gnats_web["related-prs"]=$("#related-prs").val();
gnats_web["rli"]=$("#rli").val();
gnats_web["npi-program"]=$("#npi-program").val();
gnats_web["testcase-id"]=$("#testcase-id").val();
gnats_web["jtac-case-id"]=$("#jtac-case-id").val();
gnats_web["support-notes"]=$("#support-notes").val();
gnats_web["supporting-device-release"]=$("#supporting-device-release").val();
gnats_web["supporting-device-product"]=$("#supporting-device-product").val();
gnats_web["supporting-device-platform"]=$("#supporting-device-platform").val();
gnats_web["supporting-device-sw-image"]=$("#supporting-device-sw-image").val();
gnats_web["description"]=$("#description").val();
gnats_web["corefile-location"]=$("#corefile-location").val();
gnats_web["corefile-stacktrace"]=$("#corefile-stacktrace").val();
gnats_web["environment"]=$("#environment").val();
gnats_web["how-to-repeat"]=$("#how-to-repeat").val();
gnats_web["beta-programs"]=$("#beta-programs").val();
gnats_web["release-build-date"]=$("#release-build-date").val();
gnats_web["beta-customers"]=$("#beta-customers").val();
gnats_web["release-deploy-date"]=$("#release-deploy-date").val();
gnats_web["fix"]=$("#fix").val();
return gnats_web;

}

//client-browser client-os platform product software-image

//get create PR form value,Step1
function get_web_form() {

var gnats_web=new Object();
gnats_web["synopsis"]=$("#synopsis").val();
gnats_web["reported-in"]=$("#reported-in").val();
gnats_web["last-known-working-release"]=$("#last-known-working-release").val();
gnats_web["submitter-id"]=$("#submitter-id").val();
gnats_web["found-during"]=$("#found-during").val();
gnats_web["functional-area"]=$("#functional-area").val();
gnats_web["class"]=$("#class").val();
gnats_web["pr-impact"]=$("#pr-impact").val();
gnats_web["product"]=$("#product").val();
gnats_web["platform"]=$("#platform").val();
gnats_web["software-image"]=$("#software-image").val();
gnats_web["category"]=$("#category").val();
gnats_web["client-os"]=$("#client-os").val();
gnats_web["client-browser"]=$("#client-browser").val();
gnats_web["problem-level"]=$("#problem-level").val();
gnats_web["cve-id"]=$("#cve-id").val();
gnats_web["cvss-base-score"]=$("#cvss-base-score").val();
gnats_web["cwe-id"]=$("#cwe-id").val();
gnats_web["keywords"]=$("#keywords").val();
gnats_web["configuration"]=$("#configuration").val();
//gnats_web["planned-release{1}"]=$("#planned-release{1}").val();
//gnats_web["customer-escalation{1}"]=$("#customer-escalation{1}").val();
//gnats_web["responsible{1}"]=$("#responsible{1}").val();
//gnats_web["systest-owner{1}"]=$("#systest-owner{1}").val();
gnats_web["notify-list"]=$("#notify-list").val();
gnats_web["customer"]=$("#customer").val();
gnats_web["related-prs"]=$("#related-prs").val();
gnats_web["rli"]=$("#rli").val();
gnats_web["npi-program"]=$("#npi-program").val();
gnats_web["testcase-id"]=$("#testcase-id").val();
gnats_web["jtac-case-id"]=$("#jtac-case-id").val();
gnats_web["support-notes"]=$("#support-notes").val();
gnats_web["supporting-device-release"]=$("#supporting-device-release").val();
gnats_web["supporting-device-product"]=$("#supporting-device-product").val();
gnats_web["supporting-device-platform"]=$("#supporting-device-platform").val();
gnats_web["supporting-device-sw-image"]=$("#supporting-device-sw-image").val();
gnats_web["description"]=$("#description").val();
gnats_web["corefile-location"]=$("#corefile-location").val();
gnats_web["corefile-stacktrace"]=$("#corefile-stacktrace").val();
gnats_web["environment"]=$("#environment").val();
gnats_web["how-to-repeat"]=$("#how-to-repeat").val();
gnats_web["beta-programs"]=$("#beta-programs").val();
gnats_web["release-build-date"]=$("#release-build-date").val();
gnats_web["beta-customers"]=$("#beta-customers").val();
gnats_web["release-deploy-date"]=$("#release-deploy-date").val();
gnats_web["fix"]=$("#fix").val();
return gnats_web;

}

//replate null and default value in template
function replace_default_value(obj_name) {
	for (var p in obj_name) { 
		//delete null value and default value in form data
		if ((obj_name[p]) =="" || (obj_name[p]) =="type for auto-completion" || (obj_name[p]) =="unknown" || (obj_name[p]) =="enter the number(s) of the testcase(s) generated for gap closure" ) {
			delete obj_name[p];
		}
	}
	return obj_name;
}

//display a form to input the template name,Step2
function get_template_name() {
	template_name=window.prompt("\n Ok,All the form data has been saved!\n\nPlease input the template name:",myname+"_template1");
	return template_name;
}

//save template name in localStorage array
//return index value as a primary key
function template_name_to_local(template_name,local_name) {
	//check local_template_list
	//if pr_template_list is null
	var local_pr_template_list = local_to_obj(local_name);
	if (!local_pr_template_list) {
		var my_pr_template_list=new Array();
		my_pr_template_list[0]=template_name;
		}
	else {
		var my_pr_template_list=local_pr_template_list;
		my_pr_template_list.push(template_name);
	}
	obj_to_local(my_pr_template_list,pr_template_list);
}

//save web to localStorage
function template_data_to_local(obj_name,local_name) {
	//check web object is available
	if ( (obj_name) && (local_name)) {
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



//get localStorage 
function get_localStorage(local_name) {
	if (check_localStorage()) {
		obj_name = local_to_obj(local_name);
		return obj_name;
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

//save form data to localStorage
function save_web_to_local() {
		var my_template_obj_temp=get_web_form();
		var my_template_obj=replace_default_value(my_template_obj_temp);
		var my_template_name=get_template_name();
		template_name_to_local(my_template_name,pr_template_list);
		template_data_to_local(my_template_obj,my_template_name)
}


