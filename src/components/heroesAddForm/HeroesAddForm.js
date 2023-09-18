import { v4 as uuidv4 } from 'uuid'
import { useDispatch, useSelector } from "react-redux";
import { memo, useState } from "react";
import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';



import { heroAdded, heroAdding } from "../../actions";
import { useHttp } from "../../hooks/http.hook";


const HeroesAddForm = () => {

    const { request } = useHttp();
    const dispatch = useDispatch();
    const heroAddingStatus = useSelector(state => state.heroes.heroAddingStatus)
    const filters = useSelector(state => state.filters.filters)
    const [error, setError] = useState(false);
    console.log('HeroesAddForm')

    const addHero = (values) => {
        const newHero = {
            id: uuidv4(),
            name: values.name,
            description: values.description,
            element: values.element,
        }
        heroAdding()
        request(`http://localhost:3001/heroes`, 'POST', JSON.stringify(newHero))
            .then(dispatch(heroAdded(newHero)))
            .catch(error => {
                console.error('Помилка при додаванні героя', error)
                setError(true)
            })
    }
    const renderOptions = (filters, status) => {
        if (status === 'loading') {
            return <option>Загрузка елементів</option>
        } else if (status === 'idle' && filters) {
            return filters.map(({ filter, label }) => {
                if (filter === 'all') return;
                return <option key={filter} value={filter}>{label}</option>
            })
        }
        else {
            return <option >Помилка загрузки</option>
        }
    }
    const View = error ?
        <div className="alert alert-danger mt-2">{'Помилка при додаванні героя. Будь ласка, спробуйте пізніше.'}</div> :
        <button type="submit" className="btn btn-primary">Створити</button>

    return (
        <Formik
            initialValues={{
                name: '',
                description: '',
                element: 'fire'
            }}
            validationSchema={Yup.object({
                name: Yup.string()
                    .min(2, 'Мінімум 2 символа для заповнення')
                    .required("Обов'язкове поле!"),
                description: Yup.string()
                    .min(5, 'Мінімум 5 символів для заповнення')
                    .required("Обов'язкове поле!"),
            })}
            onSubmit={(values, { resetForm }) => {
                if (!error) {
                    addHero(values)
                    resetForm()
                }
            }}
        >
            <Form className="border p-4 shadow-lg rounded" >
                <div className="mb-3">
                    <label htmlFor="name" className="form-label fs-4">Ім'я нового героя</label>
                    <Field
                        className="form-control"
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Як мене звати?"
                        autoComplete="off"
                    />
                    <ErrorMessage style={{ color: 'red' }} component="div" className="error" name="name" />
                </div>
                <div className="mb-3"
                >
                    <label htmlFor="text" className="form-label fs-4">Опис</label>
                    <Field
                        className="form-control"
                        id="description"
                        name="description"
                        as="textarea"
                        placeholder="Що я вмію?"
                        type="text"
                        style={{ "height": '130px' }}
                    />
                    <ErrorMessage style={{ color: 'red' }} component="div" className="error" name="description" />
                </div>
                <div className="mb-3">
                    <label htmlFor="element" className="form-label">Вибрати елемент героя</label>
                    <Field
                        className="form-control"
                        id="element"
                        name="element"
                        as="select"
                    >
                        <option value="fire">Я володію елементом...</option>
                        {renderOptions(filters, heroAddingStatus)}

                    </Field>
                    <ErrorMessage style={{ color: 'red' }} component="div" className="error" name="element" />
                </div>
                {View}
            </Form>

        </Formik>
    )
}

export default memo(HeroesAddForm);