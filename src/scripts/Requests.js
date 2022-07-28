import { getRequests, deleteRequest, getPlumbers, saveCompletion, getCompletions } from "./dataAccess.js"

const plumbers = getPlumbers()

//listener for the delete function to run
const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))       //delete function runs here
    }
})

mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")

            /*
                This object should have 3 properties
                   1. serviceRequestId
                   2. plumberId
                   3. date_created
            */
           const date = Date.now()
            const completion = { 
                 serviceRequestId: requestId ,
                 plumberId: plumberId,
                 dateCreated: date
            }

            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */
            saveCompletion(completion)
        }
    }
)



//function with html for the description of each job to display on the browser, as well as the button for deleting the job
export const Requests = () => {
    const serviceRequests = getRequests() 
    const plumbers = getPlumbers()
    const completions = getCompletions()
    let html = `
        <ul>
            ${
                serviceRequests.map(request => {
                if (completions.some(obj => obj.serviceRequestId == request.id)){

                return `<div class="complete">
                    <button class="request__delete"
                    id="request--${request.id}">Delete
                    </button>
                    ${request.description}
                    </div>`
                
                } else {
                  
                
                return  `<div class="newRequest">

                    <button class="request__delete"
                    id="request--${request.id}">Delete
                    </button>
                    
                    ${request.description}
                    
                    <select class="plumbers" id="plumbers">
                        <option value="">Choose</option>
                        ${
                            plumbers.map(
                            plumber => {
                            return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
                             }
                            ).join("")
                        }
                    </select>
                    </div>`}                        
                } ).join("")
            }
            
        </ul>`           
    return html
}