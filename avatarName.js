
/**
 * 根据用户名 截取其中一到两个字符，生成头像文字
 * @params 用户名
 */
export function avtarName(data){
	if(data===''||data===null|| data===undefined){
		return ''
	}
	// 如果包含中文就取最后一个字
	if(/[\u4e00-\u9fa5]$/.test(data)){
		return data.substr(-1);
	} else if(data.indexOf(' ')!==-1 ){
		// 如果 为英文名 中间有空格 则分别提取两个字段的开头
		// 如 Joyce liu 提取 JL
		let arr = data.split(" ");
		let name = '';
		for(let i in arr){
			name += arr[i].substr(0,1);
		}
		return name.toUpperCase();
	} else if(data.indexOf('.')!==-1 ){
		// 如果 为英文名则提取开头
		// 如 Joyce.liu 提取 JL
		let arr = data.split(".");
		let name = '';
		for(let i in arr){
			name += arr[i].substr(0,1);
		}
		return name.toUpperCase();
	} else {
		return data.substr(0,2).toUpperCase();
	}
}