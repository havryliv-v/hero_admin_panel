export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}
export const heroesDeleting = (heroId) => {
    return {
        type: 'HEROES_DELETING',
        payload: heroId
    }

}
export const heroAdding = () => {
    return {
        type: 'HERO_ADDING'
    }
}

export const heroAdded = (hero) => {
    return {
        type: 'HERO_ADDED',
        payload: hero

    }
}

export const filtersFetched = (filters) => {
    return {
        type: 'FILTERS_FETCHED',
        payload: filters
    }
}
export const filterSetted = (filter) => {
    return {
        type: 'FILTER_SETTED',
        payload: filter
    }
}