import React, { useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './calendar.css';

const CalendarWidget = () => {
  const calendarRef = useRef(null);
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [events, setEvents] = useState([]);

  const handleAddEvent = (e) => {
    e.preventDefault();
    setEvents([...events, { title: eventTitle, date: eventDate }]);
    setEventTitle('');
    setEventDate('');
  };

  return (
    <div className="calendar-container">
      <form onSubmit={handleAddEvent}>
        <input className="event-input" type="text" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} placeholder="Titre de l'événement" />
        <input className="date-input" type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
        <button className="add-button" type="submit">Ajouter événement</button>
      </form>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        ref={calendarRef}
        className="calendar"
        dayCellContent={(arg) => (
          <div className="custom-day-cell">
            {arg.dayNumberText}
          </div>
        )}
      />
    </div>
  );
}

export default CalendarWidget;
