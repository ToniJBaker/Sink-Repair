import { SinkRepair } from "./SinkRepair.js"
import { fetchCompletions, fetchPlumbers, fetchRequests } from "./dataAccess.js"


//function for rendering the HTML
const mainContainer = document.querySelector("#container")

const render = () => {
    fetchRequests()
        .then(()=> fetchPlumbers())
        .then(()=> fetchCompletions())
        .then (
        ()=> {
        mainContainer.innerHTML = SinkRepair()
        }
    )   
}
render()


//event listener
document.addEventListener(
    "stateChanged",
    customEvent => {
        render()
    }
)