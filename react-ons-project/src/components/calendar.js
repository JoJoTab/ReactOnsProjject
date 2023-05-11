import React, { useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

const events = [
    { title: 'Meeting', date: "2023-05-07" }
]

function Calendar() {
    return (
        <div>
          <h1>일정</h1>
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView='dayGridMonth'
            weekends={true}
            events={events}/>
        </div>
      )
}

export default Calendar;