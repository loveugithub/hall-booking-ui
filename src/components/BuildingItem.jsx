import { Link } from "react-router-dom";
import styles from "./BuildingItem.module.css";
import { useBuildings } from "../contexts/BuildingsContext";

function BuildingItem({ building }) {
  const { name } = building;
  console.log("name ", name);

  return (
    <li>
      <Link className={styles.cityItem} to={`${building.id}`}>
        <h3 className={styles.name}>{name}</h3>
      </Link>
    </li>
  );
}

export default BuildingItem;
