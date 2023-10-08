import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { useHttp } from '../../hooks/http.hook';

const filtersAdapter = createEntityAdapter({
   selectId: (state) => state.filter,
}
);

const initialState = filtersAdapter.getInitialState({
   currentFilter: 'all',
   error: '',
   filtersLoadingStatus: 'idle'
});

export const fetchFilters = createAsyncThunk(
   'filters/fetchFilters',
   () => {
      const { request } = useHttp();
      return request("http://localhost:3001/filters")
   }
)
const filtersSlice = createSlice({
   name: 'filters',
   initialState,
   reducers: {
      filterSetted: (state, action) => { state.currentFilter = action.payload }
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchFilters.pending, state => { state.filtersLoadingStatus = 'loading' })
         .addCase(fetchFilters.fulfilled, (state, action) => {
            filtersAdapter.setAll(state, action.payload)
            state.filtersLoadingStatus = 'idle'
         })
         .addCase(fetchFilters.rejected, (state, action) => {
            state.error = action.payload
            state.filtersLoadingStatus = 'error'
         })
         .addDefaultCase(() => { })
   }
})

const { actions, reducer } = filtersSlice;

export default reducer;

export const { selectAll } = filtersAdapter.getSelectors(state => state.filters);

export const {
   filtersFetched,
   filtersFetchError,
   filterSetted
} = actions;