import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "primereact/card";
import { faShip, faTruckArrowRight } from "@fortawesome/free-solid-svg-icons";
import Router from "next/router";

function Home() {
  return (
    <div>
      <div className="card">
        <div className="flex align-items-center justify-content-center flex-wrap card-container">
          <div className="col-12 md:col-6 lg:col-6">
            <Card
              title="Fluidification des flux camions"
              header={<FontAwesomeIcon icon={faTruckArrowRight} size={"5x"} className="text-300" />}
              onClick={() => Router.push("/deployment")}
              className="flex flex-column align-items-center justify-content-center hover:bg-blue-50 cursor-pointer h-30rem"
            ></Card>
          </div>
          <div className="col-12 md:col-6 lg:col-6">
            <Card
              title="réduction du délai d'attente des navires en rade"
              header={<FontAwesomeIcon icon={faShip} size={"5x"} className="text-300" />}
              onClick={() => Router.push("/vessel")}
              className="flex flex-column align-items-center justify-content-center hover:bg-blue-50 cursor-pointer h-30rem"
            ></Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
