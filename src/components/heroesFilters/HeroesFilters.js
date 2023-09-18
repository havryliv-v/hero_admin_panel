import classNames from 'classnames'
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { filterSetted, filtersFetched } from "../../actions";
import { useHttp } from "../../hooks/http.hook";

const HeroesFilters = () => {

    const dispatch = useDispatch()
    const { request } = useHttp();
    const currentFilter = useSelector(state => state.filters.currentFilter)
    const filters = useSelector(state => state.filters.filters)
    const [error, setError] = useState(null);
    console.log('HeroesFilters')

    useEffect(() => {
        request("http://localhost:3001/filters")
            .then(data => {
                dispatch(filtersFetched(data))
            })
            .catch(error => {
                console.error('Помилка з фільтрами', error);
                setError('Помилка при завантаженні фільтрів. Будь ласка, спробуйте пізніше.')
            })

        // eslint-disable-next-line
    }, []);

    const handleClick = (filter) => {
        dispatch(filterSetted(filter))
    }


    const renderButtons = () => {
        return filters.map(({ filter, label, className }) => {
            const activeClass = classNames({ 'active': currentFilter === filter });
            return (
                <button key={filter} onClick={() => handleClick(filter)} className={`btn ${className} ${activeClass}`}>{label}</button>
            )
        })
    }

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Відфільтруйте героів по элементам</p>


                <div className="btn-group">
                    {error ? <div className="alert alert-danger">{error}</div> : renderButtons()}
                </div>
            </div>
        </div>
    )
}

export default memo(HeroesFilters);