import React, { useContext, useState } from 'react';
import { EventContext } from '../context/EventContext';
import styled from 'styled-components';

const ListWrapper = styled.div`
  margin-top: 20px;
`;

const EventList = () => {
  const { state } = useContext(EventContext);
  const [filter, setFilter] = useState('All');

  const filteredEvents = state.events.filter(event =>
    filter === 'All' ? true : event.category === filter
  );

  return (
    <ListWrapper>
      <select onChange={e => setFilter(e.target.value)}>
        <option value="All">All</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
      </select>
      <ul>
        {filteredEvents.map(event => (
          <li key={event.id}>{event.title} - {event.date}</li>
        ))}
      </ul>
    </ListWrapper>
  );
};

export default EventList;
