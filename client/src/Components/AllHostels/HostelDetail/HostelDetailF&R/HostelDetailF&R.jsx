import "./HostelDetailF&R.css";
import { React, useForm, useState, Button } from "../../../../assets/MaterialUiExports.js";
import WifiIcon from '@mui/icons-material/Wifi';
import CountertopsIcon from '@mui/icons-material/Countertops';
import InfoIcon from '@mui/icons-material/Info';
import KitchenIcon from '@mui/icons-material/Kitchen';
import CameraOutdoorIcon from '@mui/icons-material/CameraOutdoor';
import SmokeFreeIcon from '@mui/icons-material/SmokeFree';
import MoneyIcon from '@mui/icons-material/Money';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import HeatPumpIcon from '@mui/icons-material/HeatPump';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import BathroomIcon from '@mui/icons-material/Bathroom';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import GrassIcon from '@mui/icons-material/Grass';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import DeckIcon from '@mui/icons-material/Deck';
import HotTubIcon from '@mui/icons-material/HotTub';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PetsIcon from '@mui/icons-material/Pets';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

const HostelDetailFAndR = ({facilities, rules}) => {
  const comingFacilitiesArr = facilities.map(facility => Object.keys(facility)[0]);
  const comingRulesArr = rules.map(rule => Object.keys(rule)[0]);

  const facilitesArr = [
    { name: "Wifi", icon: <WifiIcon id="facilitiesIco" /> },
    { name: "Kitchen", icon: <CountertopsIcon id="facilitiesIco" /> },
    { name: "Fridge", icon: <KitchenIcon id="facilitiesIco" /> },
    { name: "CCTv", icon: <CameraOutdoorIcon id="facilitiesIco" /> },
    { name: "AC", icon: <AcUnitIcon id="facilitiesIco" /> },
    { name: "Air_Cooler", icon: <HeatPumpIcon id="facilitiesIco" /> },
    { name: "Free_Parking", icon: <LocalParkingIcon id="facilitiesIco" /> },
    { name: "Loundry", icon: <LocalLaundryServiceIcon id="facilitiesIco" /> },
    { name: "UPS_OR_Generator", icon: <FlashOnIcon id="facilitiesIco" /> },
    { name: "Lawn", icon: <GrassIcon id="facilitiesIco" /> },
    { name: "Outdoor_Sitting", icon: <DeckIcon id="facilitiesIco" /> },
    { name: "Geyser", icon: <HotTubIcon id="facilitiesIco" /> },
    { name: "Roof_Top", icon: <AutoAwesomeIcon id="facilitiesIco" /> },
    { name: "Gym", icon: <FitnessCenterIcon id="facilitiesIco" /> },
    { name: "Attach_Bath", icon: <BathroomIcon id="facilitiesIco" /> },
  ];

  const rulesArr = [
    { name: "Advance_Security", icon: <MoneyIcon id="facilitiesIco" /> },
    { name: "No_Smoking", icon: <SmokeFreeIcon id="facilitiesIco" /> },
    { name: "No_Pets", icon: <PetsIcon id="facilitiesIco" /> },
    { name: "Paid_Mess", icon: <FoodBankIcon id="facilitiesIco" /> },
    { name: "Paid_Parking", icon: <LocalParkingIcon id="facilitiesIco" /> },
    { name: "Pay_AC_Bill", icon: <AcUnitIcon id="facilitiesIco" /> },
    { name: "Time_Limits", icon: <AccessTimeFilledIcon id="facilitiesIco" /> }
  ]


  return (
    <>
      <form className='mainDivFacilites' >
        <p className="facilitiesHeading">Facilities Provided</p>
        <div className='HostelDetailfacilitesDiv'>
          {
            facilitesArr.map((CurrElement, index) => {
              if (comingFacilitiesArr.includes(CurrElement.name)) {
                return (
                  <React.Fragment key={index}>
                    <button
                      type="button"
                      value={CurrElement.name}
                      className="facility"
                    >
                      {CurrElement.icon} {CurrElement.name}
                    </button>
                  </React.Fragment>
                )
              }
              return null
            })
          }
        </div>
        <p className="facilitiesHeading rulesHeading">Rules</p>
        <div className='HostelDetailfacilitesDiv'>
          {
            rulesArr.map((currRule, index) => {
              if (comingRulesArr.includes(currRule.name)) {
                return (
                  <React.Fragment key={index}>
                    <button
                      type="button"
                      value={currRule.name}
                      className="rules facility"
                    >
                      {currRule.icon} {currRule.name}</button>
                  </React.Fragment>
                )
              }
              return null;
            })
          }

        </div>
      </form>
    </>
  )
}

export default HostelDetailFAndR