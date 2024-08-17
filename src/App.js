import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { EventProvider } from './context/EventContext';
import Calendar from './components/Calendar';
import EventForm from './components/EventForm';
import EventDetailsModal from './components/EventDetailsModal';
import EventList from './components/EventList';
import styled from 'styled-components';

const AppWrapper = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
`;

function App() {
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <EventProvider>
      <Router>
        <AppWrapper>
          <h1>React Calendar App</h1>
          <button onClick={() => setShowForm(true)}>Add Event</button>
          {showForm && <EventForm onClose={() => setShowForm(false)} />}
          {showDetails && <EventDetailsModal onClose={() => setShowDetails(false)} />}
          <Routes>
            <Route path="/" element={<Calendar />} />
            <Route path="/events" element={<EventList />} />
          </Routes>
        </AppWrapper>
      </Router>
    </EventProvider>
  );
}

export default App;
