import {useEffect} from 'react'
import axios from 'axios'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

//import components
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';

const baseURL = import.meta.env.VITE_API_BASE_URL 


const Home = () => {
    const {workouts,dispatch} = useWorkoutsContext ()
  
    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await axios.get(`${baseURL}/api/workouts/`)
            console.log(response.data);
            if (response.status === 200) {
              dispatch({type: 'SET_WORKOUTS', payload: response.data})
            }
        }

        fetchWorkouts();
    }, []);
    
  return (
    <div className='home'>
        <div className='workouts'>
        {workouts && workouts.map((workout) => {
            return (
                <WorkoutDetails key={workout._id} workout={workout}/>
            )
        })}
      </div>
      <WorkoutForm/>
    </div>        
  )
}



export default Home
