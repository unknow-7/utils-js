/**
 * 中英文输入字符长度分别计算
 * @params value 需要验证的字符串
 * @return {number} 长度
 */
export function calcTextLength(value){
	if(value===null||value===undefined) return 0;
	//中文、中文标点、全角字符按 2 长度，英文、英文符号、数字按 1 长度计算
	let cnReg = /([\u4e00-\u9fa5]|[\u3000-\u303F]|[\uFF00-\uFF60])/g;
	let mat = value.match(cnReg);
	if (mat) {
		return mat.length * 2 + (value.length - mat.length);
	} else {
		return value.length;
	}
}
/**
 * 限制输入长度 （区分中英文）
 * @params value 需要验证的字符串
 * @params len 需要限制的长度
 */
export function limitTextLength(value,len) {
	if(value===null||value===undefined) return '';
	let textLen = calcTextLength(value)
	let cnReg = /([\u4e00-\u9fa5]|[\u3000-\u303F]|[\uFF00-\uFF60])/g;
	while (textLen > len) {
		const mat = value.charAt(value.length-1).match(cnReg);
		value = value.substr(0, value.length - 1);
		if(mat) textLen -=2;
		else textLen--;
	}
	return value;
}
