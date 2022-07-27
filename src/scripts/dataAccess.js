const applicationState = {
	serviceRequests: [],
	plumbers: [],
	completions: []

}

const API = "http://localhost:8088"


//function for getting the service requests
export const fetchRequests = () => {
    return fetch(`${API}/serviceRequests`)
        .then(response => response.json())
        .then(
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.serviceRequests = serviceRequests
            }
        )
}

export const getRequests = ()=> {
	return applicationState.serviceRequests.map(request => ({...request}))
}



//function for POST-ing the the job object to the database.json
export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }

    return fetch(`${API}/serviceRequests`, fetchOptions)
        .then(response => response.json())
        .then(() => {
			document.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

//function for deleting the job description
export const deleteRequest = (id) => {
    return fetch(`${API}/serviceRequests/${id}`, { method: "DELETE" })
        .then(
            () => {
                document.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}

//function for getting plumbers from the database.json
export const fetchPlumbers = () => {
    return fetch(`${API}/plumbers`)
        .then(response => response.json())
        .then(
            (data) => {
                applicationState.plumbers = data
            }
        )
}
//function to export copy of plumbers array
export const getPlumbers = ()=> {
	return applicationState.plumbers.map(plumber => ({...plumber}))
}

//
export const saveCompletion = (completedService)=> {
		const fetchOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(completedService)
		}
	
		return fetch(`${API}/completions`, fetchOptions)
			.then(response => response.json())
			.then(() => {
				document.dispatchEvent(new CustomEvent("stateChanged"))
			})
	}
	export const fetchCompletions = () => {
		return fetch(`${API}/completions`)
			.then(response => response.json())
			.then(
				(completions) => {
					// Store the external state in application state
					applicationState.completions = completions
				}
			)
	}
	export const getCompletions = ()=> {
		return applicationState.completions.map(completion => ({...completion}))
	}