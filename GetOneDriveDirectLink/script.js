const curMaskVersion = 3; //当前的掩码设置版本，用于检测是否更新

//仿GM_getValue函数v1.0
if(typeof(GM_getValue) == "undefined")
{
	var GM_getValue = function(name, type){
		var value = localStorage.getItem(name);
		if (value == undefined) return value;
		if ((/^(?:true|false)$/i.test(value) && type == undefined) || type == "boolean")
		{
			if (/^true$/i.test(value))
				return true;
			else if (/^false$/i.test(value))
				return false;
			else
				return Boolean(value);
		}
		else if((/^\-?[\d\.]+$/i.test(value) && type == undefined) || type == "number")
			return Number(value);
		else
			return value;
	}
}
//仿GM_setValue函数v1.0
if(typeof(GM_setValue) == "undefined")
{
	var GM_setValue = function(name, value){
		localStorage.setItem(name, value);
	}
}
//仿GM_deleteValue函数v1.0
if(typeof(GM_deleteValue) == "undefined")
{
	var GM_deleteValue = function(name){
		localStorage.removeItem(name);
	}
}
//仿GM_listValues函数v1.0
if(typeof(GM_listValues) == "undefined")
{
	var GM_listValues = function(){
		var keys = new Array();
		for (var ki=0, kilen=localStorage.length; ki<kilen; ki++)
		{
			keys.push(localStorage.key(ki));
		}
		return keys;
	}
}

var maskObj = function(name,content) //一个掩码对象
{
	this.name = name;
	this.content = content;
	return this;
};
var masks = new Array(); //储存掩码数组
var mask_list = null; //掩码列表框
var mask_name = null;
var mask_content = null;
var outinfo = null;
var outcontent = null;

function mask_add()
{
	if (mask_name.value.length>0 && mask_content.value.length>0)
	{
		addNewMask(mask_name.value,mask_content.value);
		mask_name.value = "";
		mask_content.value = "";
	}else
	{
		alert("掩码名或内容为空");
	}
	mask_list.selectedIndex = mask_list.options.length - 1;
	save_mask_local();
}
//从文本添加一个新的掩码
function addNewMask(name,content)
{
	var mask = new maskObj(name,content);
	masks.push(mask);
	var opt = new Option(name + " : " + content, content);
	mask_list.options.add(opt);
}
function mask_remove()
{
	if(mask_list.selectedIndex>=0)
	{
		let lastSelectedIndex = mask_list.selectedIndex;
		masks.splice(mask_list.selectedIndex, 1);
		mask_list.remove(mask_list.selectedIndex);
		mask_list.selectedIndex = (lastSelectedIndex<mask_list.options.length) ?
									lastSelectedIndex :
									(mask_list.options.length-1);
	}else
	{
		alert("没有选中掩码");
	}
	save_mask_local();
}
function mask_select()
{
	mask_name.value = masks[mask_list.selectedIndex].name;
	mask_content.value = masks[mask_list.selectedIndex].content;
	if (redata) generate_output(redata); //重新生成
	GM_setValue("godl-mask-index",mask_list.selectedIndex);
}
function save_mask_local() //把掩码设置保存到本地
{
	var maskstr = JSON.stringify(masks);
	GM_setValue("godl-masks",maskstr);
	GM_setValue("godl-mask-index",mask_list.selectedIndex);
}
function load_mask_local() //从空白加载设置
{
	var maskstr = GM_getValue("godl-masks");
	var masksCfg;
	try {
		masksCfg = JSON.parse(maskstr);
	} catch (e) {
		masksCfg = null;
	}
	
	if (!Array.isArray(masksCfg) ||
		((parseInt(GM_getValue("new-mask-version"),10) || 1)<curMaskVersion)
	) //没有掩码数据，初始化默认配置。
	{
		addNewMask("我的外链","http://storage.live.com/items/${file.id}:/${file.name}?authkey=AG1K-ogAWv5U46E");
		addNewMask("普通外链","http://storage.live.com/items/${file.id}:/${file.name}");
		addNewMask("最短链接","http://storage.live.com/items/${file.id}");
		addNewMask("如何自定义自己的掩码？","将我的外链掩码的authkey修改为你自己的即可");
		if (Array.isArray(masksCfg))
		{addNewMask("▲以上为版本更新，重新添加的掩码示例","");}
		GM_setValue("new-mask-version",curMaskVersion);
	}else
	{
		masksCfg.forEach(function(item){
			addNewMask(item.name,item.content);
		});
	}

	var mask_index = parseInt(GM_getValue("godl-mask-index"),10) || 0;
	mask_list.selectedIndex = mask_index;
}

function do_error(e)
{
	outinfo.innerHTML = "发生错误";
	outcontent.value = e.toString();
}
function do_cancel()
{
	outinfo.innerHTML = "取消操作";
}
function do_success(files)
{
	redata = files; //存入全局数组
	console.log("本次返回 %d 个文件，数据为 %o",
		redata.value.length,
		redata
	);
	generate_output(redata);
}

function generate_output(files)
{
	var mask = masks[mask_list.selectedIndex] || masks[0];
	var filearr = files.value;
	
	outinfo.innerHTML = "共选择 " + filearr.length + " 个文件。"
	if (filearr.some(function(item){
		return item.shared == undefined || item.shared.scope != "anonymous";
	})){
		outinfo.innerHTML += "存在非公共权限文件，注意添加通行许可代码。";
	}

	var outStrArr = filearr.map(function(item,index){
		var outStr = showMask(mask.content,item,index);
		return outStr;
	});
	outcontent.value = outStrArr.join("\n");
}

//显示掩码用
function showMask(str,file,index)
{
	var newTxt = eval("`" + str +"`");
	var pattern = "%{([^}]+)}";
	var rs = null;
//	console.log(rs = regMask.exec(newTxt),rs = regMask.exec(newTxt),rs = regMask.exec(newTxt),rs = regMask.exec(newTxt))

	while (( rs = new RegExp(pattern).exec(newTxt) ) != null) {
        var mskO = rs[0], //包含括号的原始掩码
            mskN = rs[1]; //去掉掩码括号
		if (mskN != undefined)
		{
            mskN = (mskN != undefined) ? mskN.replace(/\\{/ig, "{").replace(/\\}/ig, "}").replace(/\\\\/ig, "\\") : null;
			try
			{
				var evTemp = eval(mskN);
				if (evTemp!=undefined)
					newTxt = newTxt.replace(mskO, evTemp.toString());
				else
					newTxt = newTxt.replace(mskO, "");
			}catch(e)
			{
				alert("掩码异常，详情查看控制台");
				console.error(mskO + " 掩码出现了异常情况",e);
			}
		}
	}

	return newTxt;
}

var redata;//储存返回的数据

window.onload = function() //网页加载初始化
{
	mask_list = document.querySelector(".mask-list");
	mask_name = document.querySelector(".mask-name");
	mask_content = document.querySelector(".mask-content");
	outinfo = document.querySelector(".outinfo");
	outcontent = document.querySelector(".outcontent");

	if (location.protocol !="https:" && location.hostname !="localhost" && location.hostname != "")
	{
		var goto = confirm("检测到你正在使用http模式，本应用要求使用https模式。\n是否自动跳转？");
		if (goto)
		{
			location.protocol = "https:";
		}
	}
	
	load_mask_local();
}
//OneDrive官方API格式
function launchOneDrivePicker(action = "query"){
	outinfo.innerHTML = "正在等待API返回数据";
	var odOptions = {

		clientId: "339ece93-0281-4609-88f0-c65e5779feef",
		action: action, //share | download | query
		multiSelect: true,
		openInNewWindow: true,
		//advanced: {createLinkParameters: { type: "embed", scope: "anonymous" }},
		advanced: {
			queryParameters: "select=audio,content,createdBy,createdDateTime,cTag,deleted,description,eTag,file,fileSystemInfo,folder,id,image,lastModifiedBy,lastModifiedDateTime,location,malware,name,package,parentReference,photo,publication,remoteItem,root,searchResult,shared,sharepointIds,size,specialFolder,video,webDavUrl,webUrl,activities,children,listItem,permissions,thumbnails,versions,@microsoft.graph.conflictBehavior,@microsoft.graph.downloadUrl,@microsoft.graph.sourceUrl"
		},
		success: function(files) {do_success(files); /* success handler */ },
		cancel: function() {do_cancel(); /* cancel handler */ },
		error: function(e) {do_error(e); /* error handler */ }
	};
	OneDrive.open(odOptions);
}