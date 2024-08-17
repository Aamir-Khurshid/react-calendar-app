import { useContext } from 'react';
import { EventContext } from '../context/EventContext';

const useEvent = () => {
  const { state, dispatch } = useContext(EventContext);

  const addEvent = (event) => {
    dispatch({ type: 'ADD_EVENT', payload: event });
  };

  const editEvent = (event) => {
    dispatch({ type: 'EDIT_EVENT', payload: event });
  };

  const deleteEvent = (eventId) => {
    dispatch({ type: 'DELETE_EVENT', payload: eventId });
  };

  const setSelectedEvent = (event) => {
    dispatch({ type: 'SET_SELECTED_EVENT', payload: event });
  };

  return {
    events: state.events,
    selectedEvent: state.selectedEvent,
    addEvent,
    editEvent,
    deleteEvent,
    setSelectedEvent,
  };
};

export default useEvent;
