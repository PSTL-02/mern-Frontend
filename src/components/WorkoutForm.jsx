import { useState } from 'react'
import axios from 'axios'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
const baseURL = import.meta.env.VITE_API_BASE_URL 

const WorkoutForm = () => {
     // dispatch for useContext
     const { dispatch } = useWorkoutsContext()
     // form inputs state variables:
     const [title, setTitle] = useState('')
     const [load, setLoad] = useState('')
     const [reps, setReps] = useState('')
     // set an error state
     const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
    
        const workout = {title, load, reps}
        try {
            const response = await axios.post(`${baseURL}/api/workouts`, workout, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            setTitle('')
            setReps('')
            setLoad('')
            setError(null)
            console.log('new workout added', response.data)
            dispatch({type: 'CREATE_WORKOUTS', payload: response.data})
        } catch (error) {
            console.log(error)
            setError(error.message)
        }
    }

  return (
    <form className="create" onSubmit={handleSubmit}>
        <h3>Add a New Workout</h3>

        <label>Exercise Title:</label>
        <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
        />

        <label>Load (in kg):</label>
        <input
            type="number"
            onChange={(e) => setLoad(e.target.value)}
            value={load}
        />

        <label>Reps:</label>
        <input
            type="number"
            onChange={(e) => setReps(e.target.value)}
            value={reps}
        />

        <button>Add Workout</button>
        {error && <div className="error">{error}</div>}
    </form>
  )
}

export default WorkoutForm