import { WorkoutsContext } from "../context/WorkoutsContext";
import { useContext } from "react";

export const useWorkoutsContext = () => {
    const context = useContext (WorkoutsContext)  // provides both state and dispatch

    if (!context) {
        throw error('useWorkoutsContext hook must be used inside WorkoutsContextProvider'); 
    }// There is only context when this is invoked inside WorkoutsContextProvider

    return context
}