import React, { useState } from 'react'
import axios from 'axios'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";

const baseURL = import.meta.env.VITE_API_BASE_URL  

const WorkoutDetails = ({workout}) => {
  
  // states 
  const [isEditing, setIsEditing] = useState(false);

  const [editTitle, setEditTitle] = useState(workout.title);
  const [editLoad, setEditLoad] = useState(workout.load);
  const [editReps, setEditReps] = useState(workout.reps);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setEditTitle(workout.title);
    setEditLoad(workout.load);
    setEditReps(workout.reps);
    setIsEditing(false);
  };

  const handleSubmitEdit = async () => {
    const updatedWorkout = {
      title: editTitle,
      load: editLoad,
      reps: editReps,
    };
  
    try {
      const response = await axios.patch(
        `${baseURL}/api/workouts/${workout._id}`,
        updatedWorkout
      );
      const updatedData = response.data;
  
      if (response.status === 200) {
        console.log(response);
        console.log(updatedData);
        dispatch({ type: 'UPDATE_WORKOUT', payload: updatedData });
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating workout:', error);
    }
  };

   // bring in dispatch method
   const {dispatch} = useWorkoutsContext()

    const handleClick = async () => {
      const response = await axios.delete(`${baseURL}/api/workouts/${workout._id}`)
      const json = await response.data

      if(response.status === 200){
        console.log(json);
        dispatch({type: 'DELETE_WORKOUT', payload: json})
      }
    }

    return (
      <div className='workout-details'>
        {isEditing ? (
            // EDIT FORM
            <div className="edit-modal">
              <label>Edit Exercise Title:</label>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />

              <label>Edit Load:</label>
              <input
                type="number"
                value={editLoad}
                onChange={(e) => setEditLoad(e.target.value)}
              />

            <label>Edit Reps:</label>
              <input
                type="number"
                value={editReps}
                onChange={(e) => setEditReps(e.target.value)}
              />
              <button onClick={handleSubmitEdit}>Save</button>
              <button onClick={handleCancelEdit}>Cancel</button>
            </div>
            ) 

            : 

            // BELOW IS THE ORIGINAL WORK OUT DETAILS:
            (
            <>
              <h4>{workout.title}</h4>
              <p>
                <strong>Load (kg): </strong>
                {workout.load}
              </p>
              <p>
                <strong>Reps: </strong>
                {workout.reps}
              </p>
              <p>
                {formatDistanceToNow(new Date(workout.createdAt), {
                  includeSeconds: true,
                })}{' '}
                ago
              </p>
              <FaRegEdit className="edit" onClick={handleEdit}/>
              <FaRegTrashAlt className="delete" onClick={handleClick} />
            </>
        )} 
      </div>
    )
  }



export default WorkoutDetails
