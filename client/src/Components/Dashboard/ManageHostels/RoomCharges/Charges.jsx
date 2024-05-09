import MenuItem from '@mui/material/MenuItem';
import { React, useForm, InputAdornment, TextField, useState } from "../../../../assets/MaterialUiExports.js";
import { Button, FormHelperText } from '@mui/material';
import "./Charges.css";
import DisplayRoom from './DisplayRooms.jsx';
import { useDispatch } from "react-redux";
import { updateMyHostels } from "../../../../features/hostel/registerHostelSlice";

const RoomCharges = ({ data }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [rooms, setRooms] = useState(data.rooms || []);
  const [roomNotAdded, setRoomAdded] = useState(false);
  const [chargesError, setChargesError] = useState(false);
  const dispatch = useDispatch();

  const addRoom = (data) => {
    if (data.charges > 0) {
      setRooms([...rooms, data]);
      reset();
      setRoomAdded(false)
      setChargesError(false)
    } else {
      setChargesError(true)
    }
  }

  const onSubmit = () => {
    if (rooms.length === 0) {
      setRoomAdded(true)
    } else {
      localStorage.setItem("updatingHostelId", data._id);
      const roomChargesFormData = new FormData();
      roomChargesFormData.append('roomCharges', JSON.stringify(rooms));
      dispatch(updateMyHostels(roomChargesFormData))
    }
  };

  return (
    <div className='mainDiv'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className='chooseRH'>Choose Room Type & Charges</h2>
        <div className='addRoomDiv'>
          <TextField
            id="addRoomF"
            select
            error={roomNotAdded}
            label="Select Room Type"
            defaultValue="4"
            // helperText="Please select room type"
            variant="outlined"
            {...register('roomType')}
          >
            <MenuItem id="addRItem" value="1">1 Students Space</MenuItem>
            <MenuItem id="addRItem" value="2">2 Students Space</MenuItem>
            <MenuItem id="addRItem" value="3">3 Students Space</MenuItem>
            <MenuItem id="addRItem" value="4">4 Students Space</MenuItem>
            <MenuItem id="addRItem" value="5">5 Students Space</MenuItem>
          </TextField>
          <TextField
            id="addRoomF"
            name="detail"
            variant='outlined'
            multiline
            error={roomNotAdded}
            label="Enter any details"
            defaultValue="Good for you"
            {...register('detail')}
          />
          <TextField
            id="addRoomF"
            name="noOfBeds"
            defaultValue="0"
            variant='outlined'
            error={roomNotAdded}
            type="number"
            label="Enter No of Beds"
            inputProps={{ min: 0 }}
            {...register('noOfBeds')}
          />
          <div>
            <TextField
              id="addRoomF"
              name="charges"
              variant='outlined'
              label="Charges Per/Head"
              defaultValue="0"
              type="number"
              error={chargesError || roomNotAdded}
              InputProps={{
                endAdornment: <InputAdornment position="end">RS</InputAdornment>
              }}
              {...register('charges')}

            />
            <FormHelperText id="hostelFormInputs">{chargesError ? "Must be greater than 0" : ""}</FormHelperText>
          </div>
          <Button variant='contained' id="addRoomBtn" type='submit' onClick={handleSubmit(addRoom)} >Add Room</Button>
        </div>
        <div className='updateBtnDiv'><button className='updateBtn' type='submit'>Update</button></div>
      </form>
      <h2 className={`${roomNotAdded ? "roomNotAddedError" : null}`}>Added Rooms  {roomNotAdded ? "( Add atleast one room )" : null}</h2>
      <DisplayRoom rooms={rooms} setRooms={setRooms} />
    </div>
  );
};

export default RoomCharges;
