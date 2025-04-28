// import { useContext } from "react";
// import SearchBar from "../../components/SearcBar/SearchBar";
// import "./homePage.scss";

// function HomePage() {

//   return (
//     <div className="homePage">
//       <div className="textContainer">
//         <div className="wrapper">
//           <h1 className="title">Find Real Estate & Get Your Dream Place</h1>
//           <p>
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
//             explicabo suscipit cum eius, iure est nulla animi consequatur
//             facilis id pariatur fugit quos laudantium temporibus dolor ea
//             repellat provident impedit!
//           </p>
//           <SearchBar />
//           <div className="boxes">
//             <div className="box">
//               <h1>16+</h1>
//               <h2>Years of Experience</h2>
//             </div>
//             <div className="box">
//               <h1>200</h1>
//               <h2>Award Gained</h2>
//             </div>
//             <div className="box">
//               <h1>2000+</h1>
//               <h2>Property Ready</h2>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="imgContainer">
//         <img src="../../../public copy/bg.png" alt="" />
//       </div>
//     </div>
//   );
// }

// export default HomePage;

import { useContext, useEffect, useState } from "react";
import SearchBar from "../../components/SearcBar/SearchBar";
import "./homePage.scss";
import apiRequest from "../../lib/apiRequest";
import { PostItem } from "../../types/PropertyTypes";
import Card from "../../components/Card/Card";

function HomePage() {
  const [recommendations, setRecommendations] = useState<PostItem[]>([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await apiRequest.get(
          "/recommendations/get-recommendations"
        );
        setRecommendations(res.data.recommendations);
      } catch (err) {
        console.error("Failed to fetch recommendations", err);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <div className="homePageContainer">
      <div className="homePage">
        <div className="textContainer">
          <div className="wrapper">
            <h1 className="title">Find Real Estate & Get Your Dream Place</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
              explicabo suscipit cum eius, iure est nulla animi consequatur
              facilis id pariatur fugit quos laudantium temporibus dolor ea
              repellat provident impedit!
            </p>
            <SearchBar />
            <div className="boxes">
              <div className="box">
                <h1>16+</h1>
                <h2>Years of Experience</h2>
              </div>
              <div className="box">
                <h1>200</h1>
                <h2>Award Gained</h2>
              </div>
              <div className="box">
                <h1>2000+</h1>
                <h2>Property Ready</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="imgContainer">
          <img src="../../../public copy/bg.png" alt="" />
        </div>
      </div>

      {/* Recommendations Section */}
      {recommendations.length > 0 && (
        <div className="recommendationsSection">
          <h2>Recommended for You</h2>
          <div className="recommendationsGrid">
            {recommendations.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
