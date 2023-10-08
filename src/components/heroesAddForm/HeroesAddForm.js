import { v4 as uuidv4 } from 'uuid'
import { useDispatch, useSelector } from "react-redux";
import { memo, useState } from "react";
import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';



import store from '../../store';
import { selectAll } from '../heroesFilters/filtersSlice'
import { useCreateHeroMutation } from '../../api/apiSlice';


const HeroesAddForm = () => {

    const filterError = useSelector(state => state.filters.error)
    const [createHero] = useCreateHeroMutation()

    const [error] = useState(false);

    const { filtersLoadingStatus } = useSelector(state => state.filters);
    const filters = selectAll(store.getState());

    const addHero = (values) => {
        const newHero = {
            id: uuidv4(),
            name: values.name,
            description: values.description,
            element: values.element,
        }
        createHero(newHero).unwrap()
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
    const View = error || filterError ?
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
                        {renderOptions(filters, filtersLoadingStatus)}

                    </Field>
                    <ErrorMessage style={{ color: 'red' }} component="div" className="error" name="element" />
                </div>
                {View}
            </Form>

        </Formik>
    )
}

export default memo(HeroesAddForm);