import { useParams } from "react-router-dom"


const ColorEdit=()=>{

    const params=useParams()

    return(
        <div>
            <h1>hello{params.id}</h1>
        </div>
    )
}
export default ColorEdit