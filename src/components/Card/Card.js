import trash from '../../images/Trash.svg'

function Card(props) {
    function handleClick() {
        props.onCardClick({link: props.link, name: props.name});
      } 
      
    return (
        <div className="element">
            <div className="element__block"><img src={props.link} alt="#" className="element__imag" onClick={handleClick}/></div>
            <button className="element__trash" type="button"><img src={trash} alt="Корзина"
                className="element__pic" /></button>
            <div className="element__content">
                <h2 className="element__title">{props.name}</h2>
                <div className="right-content">
                    <button className="element__heart-like" type="button"></button>
                    <p className="element__hert-namber"></p>
                </div>
            </div>
        </div>
    )
}

export default Card