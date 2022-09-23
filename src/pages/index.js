import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { faBoxes, faHome, faShip, faTrackMoving, faTruckArrowRight } from '@fortawesome/free-solid-svg-icons';
import Router from "next/router";

// const footer = (
//     <Button label="Cancel" icon="pi pi-times" className="p-button-secondary ml-2" />
//   </span>
// );

function Home() {
  return (<div>
    <div className="card">
      <div className="flex align-items-center justify-content-center flex-wrap card-container">
        <div className="col-12 md:col-6 lg:col-6">
          <Card title="Fluidification des flux camions" header={<FontAwesomeIcon icon={faTruckArrowRight} size={'5x'} className='text-300' />} onClick={() => Router.push('/deployment')} className='flex flex-column align-items-center justify-content-center hover:bg-blue-50 cursor-pointer h-30rem'>
            {/* <p className="flex justify-content-center m-0" style={{ lineHeight: '1.5' }}>maybe some description of the challenge here... </p> */}
          </Card>
        </div>
        <div className="col-12 md:col-6 lg:col-6">
          <Card title="réduction du délai d'attente des navires en rade" header={<FontAwesomeIcon icon={faShip} size={'5x'} className='text-300' />} onClick={() => Router.push('/vessel')} className='flex flex-column align-items-center justify-content-center hover:bg-blue-50 cursor-pointer h-30rem'>
            {/* <p className="flex justify-content-center m-0" style={{ lineHeight: '1.5' }}>maybe some description of the challenge here... </p> */}
          </Card>
        </div>

      </div>
    </div>


  </div>);
}

export default Home;