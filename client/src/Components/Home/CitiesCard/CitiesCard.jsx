import "./CitiesCard.css"

const CitiesCard = () => {
  return (
    <>
      <div className='citiesCardPadding'>
        <h3 >We are currently present in cities</h3>
        <hr />
        <div className='homeBodyCity'>
          <figure className="hover">
            <img className="cityImg" src='/images/faisalabad.png' />
            <figcaption className="cityCaption">Faisalabad</figcaption>
          </figure>
        </div>
      </div>
    </>
  )
}

export default CitiesCard