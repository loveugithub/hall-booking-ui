import { Link } from "react-router-dom";
import BuildingList from "../components/BuildingList";
import styles from "./Homepage.module.css";

function HomePage() {
  return (
    <main className={styles.homepage}>
      <section>
        <Link to="/buildings" className="cta">
          Explore buildings
        </Link>
      </section>
    </main>
  );
}

export default HomePage;
