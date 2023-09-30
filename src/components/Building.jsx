import { useEffect } from "react";

import { useParams } from "react-router-dom";
import { useBuildings } from "../contexts/BuildingsContext";

import styles from "./Building.module.css";
import Spinner from "./Spinner";
import BackButton from "./BackButton";
import Calendar from "./Calendar";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function Building() {
  const { id } = useParams();
  const { currentBuilding, getBuilding, isLoading, events } = useBuildings();
  console.log("events buildin ", events);

  useEffect(() => {
    getBuilding(id);
  }, [id, events]);

  const { name, Bookings } = currentBuilding;

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>Building name</h6>
        <h3>{name}</h3>

        <h6>Bookings</h6>
        {Bookings &&
          Bookings.map((booking) => (
            <div key={booking.id}>
              <p>{booking.title}</p>
              <p>{formatDate(booking.startDatetime || null)}</p>
            </div>
          ))}

        <div>
          <BackButton />
        </div>
      </div>

      <div className={styles.row}>
        {Bookings && <Calendar bookings={Bookings} />}
      </div>
    </div>
  );
}

export default Building;
