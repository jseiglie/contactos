import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router";

export const EditUserInfo = props => {
    //importamos el context, store y actions mediante el useContext(Context) 
    const {store, actions} = useContext(Context);
    //inicializamos navigate con el hook useNavigate
    const navigate = useNavigate();

/* estados: 
1. crear un objeto que las propiedades sean los valores de los inputs **
2. crear 4 estados separados
*/

/* seleccion del contacto a edit
1. creando una funcion en flux que me almacene en el store el contacto a editar **
2. hacer una busqueda del contacto a partir del id 
*/

//estado que utilizaremos para recoger la informacion que introduce el usuario y mostrar la info del contacto seleccionado
const [formData, setFormData] = useState({
    id: store.selected?.id || '',
    name: store.selected?.name || '',
    phone: store.selected?.phone || '',
    email: store.selected?.email || '',
    address: store.selected?.address || ''
})
//extraemos del e.target los valores de name y value para utilizarlos cuando actualizamos la info en formData
const handleChange = e => {
    const {name, value} = e.target
    setFormData({...formData, [name]: value})
}
//usamos navigate para ir a la ruta /
const handleCancel = () => navigate('/')


const handleSubmit = e => {
    e.preventDefault();
    console.log(formData)
    //llamamos la funcion en flux, actions, para editar contactos
    actions.editContact(formData)
}
    return (
        <form className="card form-control" onSubmit={handleSubmit}>
            <input type="text" className="form-control" value={formData.name} onChange={handleChange} name="name" placeholder="name" required />
            <input type="text" className="form-control" value={formData.phone} onChange={handleChange} name="phone" placeholder="phone" required />
            <input type="text" className="form-control" value={formData.email} onChange={handleChange} name="email" placeholder="email" required />
            <input type="text" className="form-control" value={formData.address} onChange={handleChange} name="address" placeholder="address" required />
            <input className="btn btn-success" type="submit" value="enviar" />
            <button className="btn btn-danger" onClick={handleCancel}>
                cancel
            </button>
        </form>
    )
}