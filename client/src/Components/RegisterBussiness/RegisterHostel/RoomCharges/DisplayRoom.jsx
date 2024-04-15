import React from 'react'
import "./DisplayRoom.css";
import DeleteIcon from '@mui/icons-material/Delete';

const DisplayRoom = ({rooms, setRooms}) => {
   
    const deleteRoom = (index) => {
        setRooms((prevRooms) => {
          const updatedArray = [...prevRooms]
          updatedArray.splice(index,1);
          return updatedArray
        });
      } 

  return (
    <>
     <div className="manageUsers">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Room Type</th>
              <th scope="col">Description</th>
              <th scope="col">Beds</th>
              <th scope="col">Charges</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {rooms ? (
              <>
                {rooms.map((room, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{room.roomType} St. Space</td>
                    <td>{room.detail}</td>
                    <td>{room.noOfBeds}</td>
                    <td>{room.charges}</td>
                    <td >
                    <DeleteIcon id="deleteUserIco" onClick={()=>deleteRoom(index)}/>
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <>Loading ...</>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default DisplayRoom