const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    heroAddingStatus: 'idle',
    filters: [],
    currentFilter: 'all'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'HEROES_DELETING':
            const newHeroes = state.heroes
                .filter(hero => hero.id !== action.payload)
            return {
                ...state,
                heroes: newHeroes,
                heroesLoadingStatus: 'deleting'
            }
        case 'HERO_ADDING':
            return {
                ...state,
                heroAddingStatus: 'loading'
            }

        case 'HERO_ADDED':
            return {
                ...state,
                heroes: [...state.heroes, action.payload],
                heroAddingStatus: 'idle'
            }

        case 'HERO_ADDING_ERROR':
            return {
                ...state,
                heroAddingStatus: 'error'
            }

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

export default reducer;

