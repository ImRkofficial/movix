import React, { useState } from 'react';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import SwitchTabs from '../../../components/switchTabs/SwitchTabs';
import useFetch from '../../../hooks/useFetch';
import Carousel from '../../../components/carousel/Carousel';

const Popular = () => {
    const [endPoint,setEndPoint] = useState("movie");

    const {data , loading} = useFetch(`/${endPoint}/popular`);

    const onTabChange = (tab)=>{
        setEndPoint(tab === "Movies" ? "movie" : "tv");
    }

  return (
    <>
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">
                    What's Popular
                </span>
                <SwitchTabs data={["Movies","TV Shows"]} onTabChange={onTabChange} />
            </ContentWrapper>
            <Carousel endPoint={endPoint} data={data?.results} loading={loading} />
        </div>
    </>
  )
}

export default Popular