import React from 'react';

import DefaultCardImage from './../../assets/open-book.png';
import './Card.scss';

type CardPropsType = {
    id: string,
    caption: string,
    description: string,
    opOpenWorksheet: (id: number) => void;
};

function Card(props: CardPropsType) {
    const handleClick = (event: React.ChangeEvent<any>) => {
        // console.log('at Card - handleClick with event is ', event);
        props.opOpenWorksheet(event.target.id);
    };

    return (
        <div key={props.id} className="worksheet-card" >
            <div id={props.id} onClick={handleClick} className="worksheet-card-body">
                <div className="worksheet-card__image">
                    <img src={DefaultCardImage} />
                </div>
                <div className="worksheet-card__content">
                    <h3 className="worksheet-card-content__title">{props.caption}</h3>
                    <p className="worksheet-card-content__text">{props.description}</p>
                </div>
            </div>
        </div>
    );
};

export default Card;