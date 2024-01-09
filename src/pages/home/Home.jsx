import HeroBanner from "./heroBanner/HeroBanner";
import Trending from "./trending/Trending";
import "./style.scss";



const Home = () => {
  return (
    <>
      <div className="homePage">
        <HeroBanner/>
        <Trending/>
        <div style={{height:"1000px"}}></div>
      </div>
    </>
  )
}

export default Home