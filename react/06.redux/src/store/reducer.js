const defaultState = {
	list:["吃饭","睡觉","读书"],
    task:''
}
export default (state=defaultState,action)=>{
	if(action.type == "change_item"){
		/*不推荐使用
		state.task = action.payload;*/
		const newState = JSON.parse(JSON.stringify(state));
		newState.task = action.payload;
		return newState;
	}
	if(action.type == "add_item"){
		const newState = JSON.parse(JSON.stringify(state));
		newState.list.push(state.task);
		newState.task = '';
		return newState;
	}
	if(action.type == "del_item"){
		const newState = JSON.parse(JSON.stringify(state));
		newState.list.splice(action.payload,1);
		return newState;
	}
	return state
}