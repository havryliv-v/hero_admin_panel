import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { useGetHeroesQuery } from '../../api/apiSlice';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

const HeroesList = () => {

    const { data: heroes = [],
        isLoading,
        isFetching,
        isSuccess,
        isError,
    } = useGetHeroesQuery();

    const currentFilter = useSelector(state => state.filters.currentFilter)

    const filteredHeroes = useMemo(() => {
        const filteredHeroes = heroes.slice()
        if (currentFilter === 'all') {
            return filteredHeroes;
        } else {
            return filteredHeroes.filter(item => item.element === currentFilter)
        }
    }, [heroes, currentFilter])



    if (isLoading) {
        return <Spinner />;
    } else if (isError) {
        return <h5 className="text-center mt-5">Помилка завантаження</h5>
    }
    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героїв поки що немає</h5>
        }
        return arr.map(({ ...props }) => {
            return <HeroesListItem key={props.id} {...props} />
        })
    }
    const elements = renderHeroesList(filteredHeroes);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;