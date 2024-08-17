import React, { useContext } from 'react';
import { EventContext } from '../context/EventContext';
import styled from 'styled-components';

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border: 1px solid #ddd;
`;

const EventDetailsModal = ({ onClose }) => {
  const { state, dispatch } = useContext(EventContext);
  const { selectedEvent } = state;

  if (!selectedEvent) return null;

  const handleDelete = () => {
    dispatch({ type: 'DELETE_EVENT', payload: selectedEvent.id });
    onClose();
  };

  return (
    <ModalWrapper>
      <h2>{selectedEvent.title}</h2>
      <p>{selectedEvent.date}</p>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={onClose}>Close</button>
    </ModalWrapper>
  );
};

export default EventDetailsModal;
