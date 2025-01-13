export default function reducer(state, action) {
  switch (action.type) {
    case "increament": {
      return { ...state, count:state.count+1};
    }
    case "decrement": {
        return { ...state, count:state.count-1};

    }
  }
}
