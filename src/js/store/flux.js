const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			url: 'https://playground.4geeks.com/contact'
		},
		actions: {
			// getActions() nos permite llamar una accion dentro de otra accion
			// getStore() nos permite traernos a una accion variables del store
			selectContact: (contact) => setStore({selected: contact}),
			createAgenda: async ()=> {
				try {
					const resp = await fetch(getStore().url+'/agendas/lola', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						}
					});
					if (!resp.ok) throw new Error('Error while creating agenda');
					//si no hubieron errores, pedimos la lista actualizada de tareas 
					getActions().getAgenda();
				} catch (error) {
					console.error(error);
				}
			},
			getAgenda: async ()=> {
				try {
					const resp = await fetch(getStore().url+'/agendas/lola')
					//si no esta creada la agenda de nuestro usuario, retornamos que nos ejecute createAgenda() haciendo uso de getActions() para crearla 
					if (resp.status===404) return getActions().createAgenda()
					if (!resp.ok) throw new Error('Error while fetching agenda ')
					const data = await resp.json();
					setStore({contacts: data.contacts});
				} catch (error) {
					console.error(error);
				}
			},
			createContact: async (contact) => {
					try {
					const resp = await fetch(getStore().url+'/agendas/lola/contacts', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(contact)
					})
					if (!resp.ok) throw new Error('Error while creating contact')
					//si no hubieron errores, pedimos la lista actualizada de tareas
					return getActions().getAgenda()
				} catch (error) {
					console.error(error);
				}
			},
			editContact: async (contact) => {
					try {
					const resp = await fetch(getStore().url+'/agendas/lola/contacts/'+contact.id, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(contact)
					})
					if (!resp.ok) throw new Error('Error while ')
					//si no hubieron errores, pedimos la lista actualizada de tareas
					getActions().getAgenda();
				} catch (error) {
					console.error(error);
				}
			},
			deleteContact: async (id) => {
					try {
					const resp = await fetch(getStore().url+'/agendas/lola/contacts/'+id, {
						method: 'DELETE'
					})
					if (!resp.ok) throw new Error('Error while deleting');
					//si no hubieron errores, pedimos la lista actualizada de tareas
					getActions().getAgenda();
				} catch (error) {
					console.error(error);
				}
			},
		}
	};
};

export default getState;
