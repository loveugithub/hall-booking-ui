import { useEffect, useState } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useParams } from "react-router-dom";
import Spinner from "./Spinner";
import { useBuildings } from "../contexts/BuildingsContext";

function Calendar({ bookings }) {
  const { id } = useParams();
  const { isLoading, handleSelect } = useBuildings();

  const eventArr = bookings.map((obj) => {
    return {
      start: obj.startDatetime,
      end: obj.endDatetime,
      title: obj.title,
    };
  });

  if (isLoading) return <Spinner />;

  return (
    <div className="App">
      <h1>Hello Calendar</h1>
      <FullCalendar
        editable
        selectable
        plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
        events={eventArr}
        // events={[
        //   {
        //     start: "2023-09-29T21:00:00.223Z",
        //     end: "2023-09-29T22:00:00.223Z",
        //     title: "Hello",
        //   },
        // ]}
        select={(info) => handleSelect(info, id)}
        // headerToolbar={{
        //   start: "today prev next",
        //   // end: "dayGridMonth dayGridWeek dayGridDay",
        // }}

        // headerToolbar={{
        //   start: "today prev next",
        //   end: "dayGridMonth dayGridWeek dayGridDay",
        // }}
        // initialView="dayGridMonth"
        // views={["dayGridMonth", "dayGridWeek", "dayGridDay"]}
        // weekends={false}
        // dateClick={(e) => handleDateClick(e)}
        // events={[
        //   { title: "event 1", date: "2021-05-07" },
        //   { title: "event 2", date: "2021-05-17" },
        // ]}
        // eventContent={renderEventContent}
      />
    </div>
  );
}

export default Calendar;
