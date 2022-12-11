import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useRef, useState } from 'react';
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()

  const start = new Date();
  const end = new Date(new Date().setMinutes(start.getMinutes() + 30));

  const data = [
    {
      title: 'sala 1', start, end, backgroundColor: "green", extendedProps: { id: 1 }
    },
    {
      title: 'sala 2', start: new Date(new Date().setHours(start.getHours() + 1)), end: new Date(new Date().setHours(start.getHours() + 2)), backgroundColor: "purple", extendedProps: { id: 2 }
    },
    {
      title: 'sala 3', start: new Date(new Date().setHours(start.getHours() + 2)), end: new Date(new Date().setHours(start.getHours() + 3)), backgroundColor: "#000", extendedProps: { id: 3 }
    }
  ]

  const [events, setEvents] = useState(data)


  const calendarRef = useRef(null);

  return (
    <div style={{ padding: 20 }}>
      <FullCalendar
        nowIndicator={true}
        eventClick={(info) => console.log(info.event.extendedProps, info.event.title)}
        editable={true}
        views={{
          dayGrid: {
            selectable: true
          },
          timeGrid: {
            selectable: true
          },
          dayGridMonth: {
            selectable: false
          }

        }}
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="timeGridWeek"
        eventDrop={(info) => {
          const eventFiltered = events.filter(event => event.extendedProps.id !== info.event.extendedProps.id)
          setEvents([
            ...eventFiltered,
            { title: info.event.title, start: info.event.startStr, end: info.event.endStr, backgroundColor: info.event.backgroundColor, extendedProps: { id: info.event.extendedProps.id } }
          ]
          )
          alert('Dropped ' + info.event.title)
        }}
        eventResize={(info) => {
          const eventFiltered = events.filter(event => event.extendedProps.id !== info.event.extendedProps.id)
          setEvents([
            ...eventFiltered,
            { title: info.event.title, start: info.event.startStr, end: info.event.endStr, backgroundColor: info.event.backgroundColor, extendedProps: { id: info.event.extendedProps.id } }
          ])
          alert('Resized ' + info.event.title)
        }}

        select={(info) => {
          setEvents(event => {
            const newId = events[events.length - 1].extendedProps.id + 1
            return [
              ...event,
              { title: `sala ${newId}`, start: info.startStr, end: info.endStr, backgroundColor: "gray", extendedProps: { id: newId } }]
          })
          alert('selected ' + info.startStr + ' to ' + info.endStr);
        }}
        events={events}
        locale={"pt-br"}
        timeZone={"UTF"}
        titleFormat={{ year: 'numeric', month: 'long' }}
        // allDayText={"24h"}
        allDaySlot={false}
        buttonText={{
          today: 'Hoje',
          month: 'Mês',
          week: 'Semana',
          day: 'Dia',
          list: 'Lista'
        }}
        customButtons={{
          custom1: {
            text: 'custom 1',
            click: function () {
              alert('clicked custom button 1!');
            }
          },
          custom2: {
            text: 'About page',
            click: function () {
              router.push('/about')
            }
          }
        }}
        headerToolbar={{
          left: 'dayGridMonth,timeGridWeek,timeGridDay custom1',
          center: 'title',
          right: 'custom2 today prevYear,prev,next,nextYear'
        }}
      />
    </div>
  )
}
