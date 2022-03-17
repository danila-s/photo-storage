import { CHANGE_AUTORIZE , CHANGE_LOADING } from "./actions";

const initialState = {
  isAutorize: false,
  isLoading : false
};

function reducer(state = initialState, action) {
  const { isAutorize , isLoading} = state;

  if(action.type === CHANGE_AUTORIZE) {
        const{data} = action.payload
        const newState = { ...state, isAutorize: data};
        return newState;
  }
  if(action.type === CHANGE_LOADING) {
    const newState = { ...state, isLoading: !isLoading };
        return newState;
  }
    

      
  return state;
   
}

export default reducer;