const initialState = {
   filters: [],
   currentFilter: 'all'
}

const filters = (state = initialState, action) => {
   switch (action.type) {
      case 'FILTERS_FETCHED':
         return {
            ...state,
            filters: action.payload
         }
      case 'FILTER_SETTED':
         return {
            ...state,
            currentFilter: action.payload
         }
      default: return state
   }
}

export default filters;

