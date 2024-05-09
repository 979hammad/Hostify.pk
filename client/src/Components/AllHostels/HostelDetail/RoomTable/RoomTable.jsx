import React from 'react'
import "./RoomTable.css";
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';

const RoomTable = ({ roomType }) => {
    return (
        <>
            <h1>Rooms Type Present</h1>
            <div className='hostelDtailRoomsDiv'>
                {
                    roomType.map((curr, index) => {
                        return (
                            <div key={index} className='hostelDetailRoomType'>
                                <p>{curr.roomType} Student Space</p>
                                <p>{(curr.noOfBeds === 0) ? (<><DoNotDisturbAltIcon /> Beds</>) : (<>{curr.noOfBeds} Beds</>)}</p>
                                <p>{curr.charges} RS/head</p>
                                <p>Detail : {curr.details}</p>
                            </div>
                        )
                    })
                }


            </div>
            {/* <table className='hostelDetailTableDiv'>
                <tr className='tableDivHeadingRow'>
                    <th className='tableDivTH'>Room Type</th>
                    <th className='tableDivTH'>Description</th>
                    <th className='tableDivTH'>Beds</th>
                    <th className='tableDivTH'>Charges ( Per/head )</th>
                </tr>
                <tr>
                    <td className='tableDivTH'>Alfreds Futterkiste</td>
                    <td className='tableDivTH'>Maria Anders</td>
                    <td className='tableDivTH'>Germany</td>
                    <td className='tableDivTH'>Germany</td>
                </tr>
                <tr>
                    <td className='tableDivTH'>Alfreds Futterkiste</td>
                    <td className='tableDivTH'>Maria Anders</td>
                    <td className='tableDivTH'>Germany</td>
                    <td className='tableDivTH'>Germany</td>
                </tr>
            </table> */}
        </>
    )
}

export default RoomTable