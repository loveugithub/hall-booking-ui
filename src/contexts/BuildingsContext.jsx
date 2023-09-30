import { createContext, useContext, useEffect, useState } from "react";

const BASE_URL = "http://localhost:3000/api/v1";

const BuildingsContext = createContext();

function BuildingsProvider({ children }) {
  const [buildings, setBuildings] = useState([]);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentBuilding, setCurrentBuilding] = useState({});

  useEffect(function () {
    async function fetchBuildings() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/buildings`);
        const data = await res.json();
        console.log("fetchBuildings ", data.data.buildings);
        if (data.status === "fail") {
          throw data;
        }

        setBuildings(data.data.buildings);
      } catch (err) {
        console.log("err ", err);
        console.log(err);
        const msg = err.message || `Got some error`;
        alert(msg);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBuildings();
  }, []);

  async function getBuilding(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/buildings/${id}`);
      const data = await res.json();
      console.log("getBuilding ", data.data.building);

      if (data.status === "fail") {
        throw data;
      }
      setCurrentBuilding(data.data.building);
    } catch (err) {
      console.log("err ", err);
      const msg = err.message || `Got some error`;
      alert(msg);
    } finally {
      setIsLoading(false);
    }
  }

  const handleSelect = async (info, id) => {
    // console.log("info ", info);
    // console.log("id ", id);
    const eventNamePrompt = prompt("Enter, event name");
    if (eventNamePrompt) {
      const { start, end } = info;
      console.log("start ", start);
      console.log("end ", end);
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/bookings`, {
          method: "POST",
          body: JSON.stringify({
            buildingId: id,
            title: eventNamePrompt,
            startDatetime: start,
            endDatetime: end,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();

        console.log("data ", data);
        if (data.status === "fail") {
          throw data;
        }
        const newEvent = data.data.booking;

        setEvents((curr) => [...curr, newEvent]);
        // getBuilding(id);
      } catch (err) {
        console.log("err ", err);
        const msg = err.message || `Got some error`;
        alert(msg);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <BuildingsContext.Provider
      value={{
        buildings,
        isLoading,
        currentBuilding,
        getBuilding,
        handleSelect,
        events,
        setEvents,
      }}
    >
      {children}
    </BuildingsContext.Provider>
  );
}

function useBuildings() {
  const context = useContext(BuildingsContext);

  if (!context)
    throw new Error(`BuildingsContext was used outside the BuildingsProvider`);

  return context;
}

export { BuildingsContext, BuildingsProvider, useBuildings };
