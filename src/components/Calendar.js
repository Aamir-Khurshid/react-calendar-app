import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { EventContext } from '../context/EventContext';

const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
`;

const NavigationButton = styled.button`
  padding: 10px;
  cursor: pointer;
`;

const DaysWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background-color: #ccc;
  width: 100%;
`;

const DayLabel = styled.div`
  background-color: #eee;
  padding: 10px;
  text-align: center;
  font-weight: bold;
`;

const DayBox = styled.div`
  background-color: white;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  ${(props) => props.isCurrent && `
    background-color: #007bff;
    color: white;
  `}

  &:hover {
    background-color: #f0f0f0;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

const Calendar = () => {
  const { state, dispatch } = useContext(EventContext);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventTitle, setEventTitle] = useState('');

  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth()));

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const renderDaysOfWeek = () => {
    return daysOfWeek.map((day, index) => <DayLabel key={index}>{day}</DayLabel>);
  };

  const handleDayClick = (day) => {
    setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
    setShowModal(true);
  };

  const handleSaveEvent = () => {
    if (eventTitle.trim()) {
      dispatch({
        type: 'ADD_EVENT',
        payload: {
          id: new Date().toISOString(),
          title: eventTitle,
          date: selectedDate.toISOString(),
        },
      });
      setEventTitle('');
      setShowModal(false);
    }
  };

  const renderCalendarDays = () => {
    const days = [];
    const firstDayOfMonth = startOfMonth.getDay();
    const totalDays = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<DayBox key={`empty-${i}`} />);
    }

    for (let i = 1; i <= totalDays; i++) {
      const isCurrent = i === new Date().getDate() &&
        currentDate.getMonth() === new Date().getMonth() &&
        currentDate.getFullYear() === new Date().getFullYear();

      const eventsOnThisDay = state.events.filter(event =>
        new Date(event.date).getDate() === i &&
        new Date(event.date).getMonth() === currentDate.getMonth() &&
        new Date(event.date).getFullYear() === currentDate.getFullYear()
      );

      days.push(
        <DayBox key={i} isCurrent={isCurrent} onClick={() => handleDayClick(i)}>
          {i}
          {eventsOnThisDay.map(event => (
            <div key={event.id}>{event.title}</div>
          ))}
        </DayBox>
      );
    }

    return days;
  };

  return (
    <CalendarWrapper>
      <Header>
        <NavigationButton onClick={prevMonth}>Previous</NavigationButton>
        <h2>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
        <NavigationButton onClick={nextMonth}>Next</NavigationButton>
      </Header>
      <DaysWrapper>
        {renderDaysOfWeek()}
        {renderCalendarDays()}
      </DaysWrapper>

      {showModal && (
        <>
          <Overlay onClick={() => setShowModal(false)} />
          <Modal>
            <h3>Add Event on {selectedDate.toDateString()}</h3>
            <input
              type="text"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              placeholder="Event Title"
            />
            <button onClick={handleSaveEvent}>Save</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </Modal>
        </>
      )}
    </CalendarWrapper>
  );
};

export default Calendar;
