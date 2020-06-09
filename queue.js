// 事件处理  队列机制
class Queue {
	constructor(taskRunner) {
		this.taskRunner = taskRunner
		this.working = false
		this.tasks = []
	}

	add(item) {
		if (this.working) {
			this.tasks.push(item)
		} else {
			this.tasks.push(item)
			this._digest(this.tasks.shift())
		}
	}

	_digest(item) {
		this.working = true
		this.taskRunner(item, () => {
			if (this.tasks.length > 0) {
				this._digest(this.tasks.shift())
			} else {
				this.working = false
			}
		})
	}
}


const queue = new Queue((item, complete) => {
	// do something with item
	console.time('任务编号：' + item.no)
	setTimeout(() => {
		console.timeEnd('任务编号：' + item.no)
		complete()
	}, item.due)
})
queue.add({
	no: 1,
	due: 5000
})

queue.add({
	no: 2,
	due: 4000
})

queue.add({
	no: 3,
	due: 1000
})

// 初版
/*
function doSomething(item) {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve()
		}, item.due)
	})
}

var obj = {
	working: 0,
	tasks: [],
	push(item) {
		if (this.working) {
			this.tasks.push(item)
		} else {
			this.tasks.push(item)
			this.digest(this.tasks.shift())
		}
	},
	async digest(item) {
		this.working = true
		console.time('任务编号：' + item.no)

		await doSomething(item)

		console.timeEnd('任务编号：' + item.no)
		// 处理图片尺寸，计算布局
		if (this.tasks.length > 0) {
			this.digest(this.tasks.shift())
		} else {
			this.working = false
		}
	}
}

obj.push({
	no: 1,
	due: 5000
})

obj.push({
	no: 2,
	due: 4000
})

obj.push({
	no: 3,
	due: 1000
})
*/
export default Queue
