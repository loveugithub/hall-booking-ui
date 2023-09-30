import styles from "./BuildingList.module.css";
import BuildingItem from "./BuildingItem";
import { useBuildings } from "../contexts/BuildingsContext";
import Message from "./Message";
import Spinner from "./Spinner";

function BuildingList() {
  const { buildings, isLoading } = useBuildings();

  if (isLoading) return <Spinner />;

  if (!buildings.length) return <Message message="No building found!" />;

  return (
    <ul className={styles.countryList}>
      {buildings.map((building) => (
        <BuildingItem key={building.id} building={building} />
      ))}
    </ul>
  );
}

export default BuildingList;
