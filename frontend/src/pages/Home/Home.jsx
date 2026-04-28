import React, { useState } from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import AppDownload from "../../components/AppDownload/AppDownload";
import DetailsPopup from "../../components/DetailsPopup/DetailsPopup";

const Home = ({ setShowDetails }) => {
  const [category, setCategory] = useState("All");
  const [foodDetails, setFoodDetails] = useState({}); // نگهداری مشخصات غذا انتخاب شده

  const handleFoodDetails = (food) => {
    console.log(food); // بررسی مقدار مشخصات غذا
    setFoodDetails(food);
    setShowDetails(true);
  };

  return (
    <div>
      <Header />
      <hr />
      <ExploreMenu
        category={category}
        setShowDetails={setShowDetails}
        setCategory={setCategory}
      />
      <FoodDisplay
        setShowDetails={setShowDetails}
        category={category}
        setFoodDetails={handleFoodDetails} // ارسال تابع برای دریافت مشخصات غذا
      />
      <AppDownload />

      {/* فقط وقتی foodDetails مقداردهی شده است، پاپ‌آپ نمایش داده شود */}

      {foodDetails && Object.keys(foodDetails).length > 0 && (
        <DetailsPopup PDetails={foodDetails} setShowDetails={setShowDetails} />
      )}
    </div>
  );
};

export default Home;
