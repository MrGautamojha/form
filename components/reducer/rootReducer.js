const initialState = {
	post: new Object(),
};

function rootReducer(state = initialState, action) {
	console.log('data : ', action);
	switch (action.type) {
		case 'POST': {
			state.post[action.payload[0]] = action.payload[1];
			console.log(state.post)
			return {post: state.post};
		}
		default:
			return state;
	}
}
export default rootReducer;
