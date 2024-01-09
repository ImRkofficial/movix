import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Img = ({ src, className,altText }) => {
    return (
        <LazyLoadImage
            className={className || ""}
            alt={`${altText}`}
            effect="blur"
            src={src}
        />
    );
};

export default Img;