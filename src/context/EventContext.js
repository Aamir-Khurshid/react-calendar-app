import React, { createContext, useReducer } from 'react';

const initialState = {
  events: [],
  selectedEvent: null,
};

export const EventContext = createContext(initialState);

const eventReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_EVENT':
      return { ...state, events: [...state.events, action.payload] };
    case 'EDIT_EVENT':
      return {
        ...state,
        events: state.events.map(event =>
          event.id === action.payload.id ? action.payload : event
        ),
      };
    case 'DELETE_EVENT':
      return {
        ...state,
        events: state.events.filter(event => event.id !== action.payload),
      };
    case 'SET_SELECTED_EVENT':
      return { ...state, selectedEvent: action.payload };
    default:
      return state;
  }
};

export const EventProvider = ({ children }) => {
  const [state, dispatch] = useReducer(eventReducer, initialState);

  return (
    <EventContext.Provider value={{ state, dispatch }}>
      {children}
    </EventContext.Provider>
  );
};
