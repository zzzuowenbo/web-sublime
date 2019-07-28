const fs = require('fs');
const path = require('path');
const util = require('util');
const dataPath = path.normalize(__dirname+"/../data/item.json");
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

async function get(){
    const data = await readFile(dataPath);
    const arr = JSON.parse(data);
    return arr;
}

// 添加
async function add(task){
	const data = await readFile(dataPath);
	const arr = JSON.parse(data);
	const obj = {
		id:Date.now().toString(),
		task:task
	}
	arr.push(obj);
	await writeFile(dataPath,JSON.stringify(arr));
	return obj;
}

// 删除
async function del(id){
	const data = await readFile(dataPath);
	const arr = JSON.parse(data);
	const newArr = arr.filter((item)=>{
		return item.id != id;
	})
	await writeFile(dataPath,JSON.stringify(newArr));
}

module.exports = {
    get,
    add,
    del
}