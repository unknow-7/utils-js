/**
 * 中英文输入字符分别计算 (常用在输入框)
 * @params value 需要验证的字符串
 * @params len 需要限制的长度
 */
export function limitTextLength(value,len) {
	if(value===null||value===undefined) return;
	// 先粗略判断长度，如果不超过直接返回，感觉会少点计算？
	if(len >= value.length) return value;
	//中文、中文标点、全角字符按1长度，英文、英文符号、数字按0.5长度计算
	let cnReg = /([\u4e00-\u9fa5]|[\u3000-\u303F]|[\uFF00-\uFF60])/g;
	let mat = value.match(cnReg);
	let textLen;
	if (mat) {
		textLen = mat.length + (value.length - mat.length) * 0.5;
	} else {
		textLen = value.length * 0.5;
	}
	while (textLen > len) {
		value = value.substr(0, value.length - 1);
		textLen--;
	}
	return value;
}