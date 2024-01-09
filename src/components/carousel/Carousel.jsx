import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";
import './style.scss';
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";

const Carousel = ({data,loading}) => {
    const carouselRef = useRef();
    const navigate = useNavigate();
    const {url} = useSelector((state)=>state.home);

    const navigation = ()=>{

    }

    const skItem = () =>{
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton"></div>
                <div className="textBlock">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div>
            </div>
        )
    }

  return (
    <>
        <div className="carousel">
            <ContentWrapper>
                <BsFillArrowLeftCircleFill
                    className="carouselLeftNav arrow" 
                    onClick={()=>navigation("left")}
                />
                <BsFillArrowRightCircleFill
                    className="carouselRightNav arrow"
                    onClick={()=>navigation("right")}
                />
                {!loading ? (
                    <div className="carouselItems">
                        {data?.map((item)=>{
                            const posterUrl = item.poster_path ? `${url.poster}${item.poster_path}` : PosterFallback;
                            return (
                                <div className="carouselItem" key={item.id}>
                                    <div className="posterBlock">
                                        <Img src={posterUrl} altText={item.name || item.title}/>
                                        <CircleRating rating={item.vote_average.toFixed(1)}/>
                                        <Genres  />
                                    </div>
                                    <div className="textBlock">
                                        <span className="title">
                                            {item.title || item.name}
                                        </span>
                                        <span className="date">
                                            {dayjs(item.release_date).format("MMM D, YYYY")}
                                        </span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                   <div className="loadingSkeleton">
                    {skItem()}
                    {skItem()}
                    {skItem()}
                    {skItem()}
                    {skItem()}
                    {skItem()}
                   </div>
                )}
            </ContentWrapper>
        </div>
    </>
  )
}

export default Carousel