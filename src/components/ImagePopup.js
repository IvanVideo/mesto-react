function ImagePopup(props) {

    function popupUrl() {
        if (props.card == null) {
            props.dataCard.map(item => { return item.link })
        } else { return props.card.url }
    }

    function popupName() {
        if (props.card == null) {
            props.dataCard.map(item => { return item.name })
        } else { return props.card.name }
    }

    return (
        <div className={props.card ? props.className + ' popup_opened' : props.className}>
            <div className="popup__element">
                <div className="popup__box">
                    <img src={popupUrl()} alt="#" className="popup__pic" />
                    <button className="popup__close popup-img__close" type="button" onClick={props.onClose}></button>
                </div>
                <p className="popup__subtitle">{popupName()}</p>
            </div>
        </div>
    )
}

export default ImagePopup