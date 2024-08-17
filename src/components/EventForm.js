import React, { useState, useContext } from 'react';
import { EventContext } from '../context/EventContext';
import styled from 'styled-components';

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const EventForm = ({ event, onClose }) => {
  const [title, setTitle] = useState(event ? event.title : '');
  const [date, setDate] = useState(event ? event.date : '');
  const { dispatch } = useContext(EventContext);

  const handleSubmit = () => {
    if (event) {
      dispatch({ type: 'EDIT_EVENT', payload: { ...event, title, date } });
    } else {
      dispatch({ type: 'ADD_EVENT', payload: { id: Date.now(), title, date } });
    }
    onClose();
  };

  return (
    <FormWrapper>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Event Title" />
      <input value={date} onChange={e => setDate(e.target.value)} placeholder="Event Date" />
      <button onClick={handleSubmit}>{event ? 'Edit' : 'Add'} Event</button>
      <button onClick={onClose}>Cancel</button>
    </FormWrapper>
  );
};

export default EventForm;
