import { v4 as uuidv4 } from 'uuid'
import { useDispatch } from "react-redux";
import { useState } from "react";

import { heroAdding } from "../../actions";
import { useHttp } from "../../hooks/http.hook";

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const Form = () => {
   const initialFormData = {
      id: null,
      name: '',
      description: '',
      element: 'fire',
   };

   const { request } = useHttp();
   const dispatch = useDispatch();
   const [error, setError] = useState(null);
   const [formData, setFormData] = useState(initialFormData);

   const addHero = (e) => {
      e.preventDefault()
      const newHero = {
         id: uuidv4(),
         name: formData.name,
         description: formData.description,
         element: formData.element,
      }

      request(`http://localhost:3001/heroes`, 'POST', JSON.stringify(newHero))
         .then(dispatch(heroAdding(newHero)))
         .then(setFormData({ ...initialFormData, element: formData.element }))
         .catch(error => {
            console.error('Помилка при додаванні героя', error)
            setError('Помилка при додаванні героя. Будь ласка, спробуйте пізніше.')
         })
   }

   const handleChange = (e) => {
      const { name, value } = e.target
      setFormData({ ...formData, [name]: value })
   }
   return (
      <form className="border p-4 shadow-lg rounded">
         <div className="mb-3">
            <label htmlFor="name" className="form-label fs-4">Ім'я новогоwww героя</label>
            <input
               required
               type="text"
               name="name"
               className="form-control"
               id="name"
               placeholder="Як мене звати?"
               value={formData.name}
               onChange={handleChange}
            />
         </div>

         <div className="mb-3">
            <label htmlFor="text" className="form-label fs-4">Опис</label>
            <textarea
               required
               name="description"
               className="form-control"
               id="text"
               placeholder="Що я вмію?"
               value={formData.description}
               onChange={handleChange}
               style={{ "height": '130px' }} />
         </div>

         <div className="mb-3">
            <label htmlFor="element" className="form-label">Вибрати елемент героя</label>
            <select
               required
               className="form-select"
               id="element"
               name="element"
               onChange={handleChange}>
               <option >Я володію елементом...</option>
               <option value="fire">Вогонь</option>
               <option value="water">Вода</option>
               <option value="wind">Вітер</option>
               <option value="earth">Земля</option>
            </select>
         </div>

         {error ? <div className="alert alert-danger">{error}</div> : <button onClick={addHero} type="submit" className="btn btn-primary">Створити</button>}
      </form>
   )
}

export default Form;