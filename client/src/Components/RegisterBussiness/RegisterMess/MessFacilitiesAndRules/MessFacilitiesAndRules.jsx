import "./MessFacilitiesAndRules.css";
import {React, Button, useForm, useState} from "../../../../assets/MaterialUiExports.js";
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import InfoIcon from '@mui/icons-material/Info';
import BrunchDiningIcon from '@mui/icons-material/BrunchDining';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import SyncDisabledIcon from '@mui/icons-material/SyncDisabled';
import MoneyIcon from '@mui/icons-material/Money';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CancelIcon from '@mui/icons-material/Cancel';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

const MessFacilitiesAndRules = ({handleNext}) => {
  const {register, handleSubmit, setValue, formState : {errors}} = useForm();
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [selectedRules, setSelectedRules] = useState([]);

    const facilitesArr = [
      {name: "Free_Dilevery", icon: <TwoWheelerIcon id="facilitiesIco"/>},
      {name: "Break_Fast", icon: <FreeBreakfastIcon id="facilitiesIco"/>},
      {name: "Lunch", icon: <BrunchDiningIcon id="facilitiesIco"/>},
      {name: "Dinner", icon: <DinnerDiningIcon id="facilitiesIco"/>},
      {name: "Call_And_Get", icon: <AccessTimeIcon id="facilitiesIco"/>},
      {name: "Cancel_Any_Meal", icon: <CancelIcon id="facilitiesIco" />},
      {name: "No_Advance", icon: <MoneyIcon id="facilitiesIco"/>},
      {name: "No_Fix_Routine", icon: <SyncDisabledIcon id="facilitiesIco"/>},
    ];

    const rulesArr = [
      {name: "Advance_Payment", icon: <MoneyIcon id="facilitiesIco"/>},
      {name: "Dilevery_Charges", icon: <TwoWheelerIcon id="facilitiesIco"/>},
      {name: "No_BreakFast", icon: <FreeBreakfastIcon id="facilitiesIco"/>},
      {name: "Fix_Time", icon: <AccessTimeFilledIcon id="facilitiesIco"/>}
    ]
    
   const submitForm = () => {
   const formattedDataFacilities = selectedFacilities.map((facility) => ({ [facility.name]: true }));
   const formattedDataRules = selectedRules.map((rule)=> ({[rule.name] : true}));
 
   console.log("Formatted Data:", formattedDataFacilities);
   console.log("FormatedRules", formattedDataRules)
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
      <Button type="submit" id="stepperNextBtns" variant="contained">Next</Button>      

    </form>
    </>
  )
}

export default MessFacilitiesAndRules