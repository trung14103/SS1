import React, {Component} from 'react';
import { Fade } from 'react-slideshow-image';
import fadeProperties from './homescrp.js';
import image1 from '../img/img1.jpg';
import image2 from '../img/img2.jpg';
import image3 from '../img/img3.jpg';

export default class Homepage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div className="slide-container">
            <Fade {...fadeProperties}>
            <div className="each-fade">
                <div className="image-container">
                <img src={image1} />
                </div>
                <h2>1</h2>
            </div>
            <div className="each-fade">
                <div className="image-container">
                <img src={image2} />
                </div>
                <h2>2</h2>
            </div>
            <div className="each-fade">
                <div className="image-container">
                <img src={image3} />
                </div>
                <h2>3</h2>
            </div>
            </Fade>
        </div>
        )
    }
}