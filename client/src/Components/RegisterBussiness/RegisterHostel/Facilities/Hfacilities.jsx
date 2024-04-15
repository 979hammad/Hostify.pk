import "./Hfacilities.css";
import {React, useForm, useState, Button} from "../../../../assets/MaterialUiExports.js";
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

const Hfacilities = ({name, handleNext}) => {
  const {register, handleSubmit, setValue, formState : {errors}} = useForm();
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [selectedRules, setSelectedRules] = useState([]);

    const facilitesArr = [
      {name: "Wifi", icon: <WifiIcon id="facilitiesIco"/>},
      {name: "Kitchen", icon: <CountertopsIcon id="facilitiesIco"/>},
      {name: "Fridge", icon: <KitchenIcon id="facilitiesIco"/>},
      {name: "CCTv", icon: <CameraOutdoorIcon id="facilitiesIco"/>},
      {name: "AC", icon: <AcUnitIcon id="facilitiesIco"/>},
      {name: "Air_Cooler", icon: <HeatPumpIcon id="facilitiesIco" />},
      {name: "Free_Parking", icon: <LocalParkingIcon id="facilitiesIco" />},
      {name: "Loundry", icon: <LocalLaundryServiceIcon id="facilitiesIco" />},
      {name: "UPS_OR_Generator", icon: <FlashOnIcon id="facilitiesIco" />},
      {name: "Lawn", icon: <GrassIcon id="facilitiesIco" />},
      {name: "Outdoor_Sitting", icon: <DeckIcon id="facilitiesIco" />},
      {name: "Geyser", icon: <HotTubIcon id="facilitiesIco" />},
      {name: "Roof_Top", icon: <AutoAwesomeIcon id="facilitiesIco" />},
      {name: "Gym", icon: <FitnessCenterIcon id="facilitiesIco" />},
      {name: "Attach_Bath", icon: <BathroomIcon id="facilitiesIco" />},        
    ];

   const rulesArr = [
      {name: "Advance_Security", icon: <MoneyIcon id="facilitiesIco"/>},
      {name: "No_Smoking", icon: <SmokeFreeIcon id="facilitiesIco"/>},
      {name: "No_Pets", icon: <PetsIcon id="facilitiesIco"/>},
      {name: "Paid_Mess", icon: <FoodBankIcon id="facilitiesIco"/>},
      {name: "Paid_Parking", icon: <LocalParkingIcon id="facilitiesIco"/>},
      {name: "Pay_AC_Bill", icon: <AcUnitIcon id="facilitiesIco"/>},
      {name: "Time_Limits", icon: <AccessTimeFilledIcon id="facilitiesIco"/>}
   ]
   const submitForm = () => {
   const formattedDataFacilities = selectedFacilities.map((facility) => ({ [facility.name]: true }));
   const formattedDataRules = selectedRules.map((rule)=> ({[rule.name] : true}));
 
   localStorage.setItem("facilities", JSON.stringify(formattedDataFacilities))
   localStorage.setItem("rules", JSON.stringify(formattedDataRules))
   handleNext()
   }

   const handleSelectedFacilities = (selectedFacility) => {
     const isSelected = selectedFacilities.some((item) => item.name === selectedFacility.name);

     if(isSelected){
        setSelectedFacilities(selectedFacilities.filter(item => item.name !== selectedFacility.name));
     }else{
        setSelectedFacilities(prevSelectedFacilities => [...prevSelectedFacilities, selectedFacility]);
        
     }
   };

   const handleSelectedRules = (currRule) => {
     const isSelected = selectedRules.some((rule) => rule.name === currRule.name);

     if(isSelected){
        setSelectedRules(selectedRules.filter(rule => rule.name !== currRule.name));
     }else{
        setSelectedRules(preSelectedRules => [...preSelectedRules, currRule]);
     }
   }

  return (
    <>
    <form className='mainDivFacilites' onSubmit={handleSubmit(submitForm)}>
    <span className="FHeading">Now Select Facilities & Rules</span>
    <span className="facilitiesSec">Facilities Section</span>
    <h6 className="FacilitiesInfo"><InfoIcon id="infoIco"/> Feel free to select multiple facilities.</h6> 
     <div className='facilitesDiv'>
        {
            facilitesArr.map((CurrElement, index)=>{
                return(
                    <React.Fragment key={index}>
                    <button
                      type="button"
                      value={CurrElement.name}
                      className={`facility ${selectedFacilities.some((item) => item.name === CurrElement.name) ? "isActive" : ""}`}
                      onClick={() => {handleSelectedFacilities(CurrElement); setValue('facilities', selectedFacilities)}}
                    >
                     {CurrElement.icon} {CurrElement.name}
                    </button>
                    </React.Fragment>
                )
            })
        }
        <input
          type="hidden"
          {...register('facilities')}
        />
     </div>
     <span className="facilitiesSec rulesSec">Rules Section</span>
     <h6 className="FacilitiesInfo RulesInfo"><InfoIcon id="infoIco"/> Select your hostel Rules.</h6> 
        {/* <button type="submit">submit</button> */}
        <div className='facilitesDiv'>
        {
            rulesArr.map((currRule, index)=>{
                return(
                    <React.Fragment key={index}>
                    <button
                      type="button"
                      value={currRule.name}
                      className={`rules facility ${selectedRules.some((rule) => rule.name === currRule.name)? "isActive" : ""}`}
                      onClick={()=>{handleSelectedRules(currRule) ;setValue('rules', selectedRules)}}
                    >
                        {currRule.icon} {currRule.name}</button>
                    </React.Fragment>
                )
            })
        }
        <input 
          type="hidden" 
          {...register("rules")}
        />
        </div>
        <Button type="submit" id="stepperNextBtns" variant="contained" >Next</Button>      
    </form>
    </>
  )
}

export default Hfacilities