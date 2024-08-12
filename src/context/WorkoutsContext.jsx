import {createContext , useReducer} from 'react'

export const WorkoutsContext = createContext()

export const workoutsReducer = ( state , action) => {
    switch (action.type) {
        case 'SET_WORKOUTS':
            return {
                workouts: action.payload // updates all the workouts to the new workouts
            }
        case 'CREATE_WORKOUTS':
            return {
                // creates an array with the new workout at the front and previous workouts after
                workouts: [action.payload, ...state.workouts] 
            }
        case 'DELETE_WORKOUT':
            return {
                workouts: state.workouts.filter((workout) => workout._id !== action.payload._id)
                                // filters over the existing state workouts and makes sure that their _id does not
                                // match our deleted workouts _id
                                // We only want to keep what doesn't match
            }
        case 'UPDATE_WORKOUT': {
            const updatedWorkout = action.payload;
            const updatedWorkouts = state.workouts.map(workout => {
                if (workout._id === updatedWorkout._id) {
					// swap the workout for the updated on if id's matach
                return updatedWorkout;
                }
					// Return the workout for every workout in the workouts 
					// array
                  return workout;
                });
          
				    // last return returns the map of updatedWorkouts
                return {
                  workouts: updatedWorkouts,
                };
              }
              
        default:
            return state // return state unchanged
    } 

}

export const WorkoutsContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(workoutsReducer, {
        workouts: null
    })

    return (
        <WorkoutsContext.Provider value={{...state,dispatch}}>
            {children}
        </WorkoutsContext.Provider>
    )
}
