const CHANGE_LOADING = "CHANGE_LOADING";
const CHANGE_AUTORIZE = "CHANGE_AUTORIZE";

function changeLoading() {
  return {
    type: CHANGE_LOADING,
    payload: {
      
    },
  };
}

function changeAutorize(data) {
    
  return {
    type: CHANGE_AUTORIZE,
    payload: {
      data : data
    },
  };
}


export { changeLoading, CHANGE_LOADING, changeAutorize, CHANGE_AUTORIZE };
