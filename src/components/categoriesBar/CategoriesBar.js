import {useState} from "react";
import "./_categoriesBar.scss";
import { useDispatch } from "react-redux";
import { getPopularVideos, getVideosByCategory } from "../../redux/actions/videos.action";

const keywords = [
  "All",
  "React.js",
  "Angular.js",
  "Css tricks",
  "Java script New feature",
  "React Native",
  "use of API",
  "Redux",
  "Coding",
  "English Songs 2021",
  "Lazer Angelov workout",
  "GatsBy",
  "React Native",
  "cricket",
  "Friends",
  "Why don't we songs",
  "AJ Mitchell",
];

const CategoriesBar = () => {
  const [activeElement, setActiveElement] = useState("All");

  const dispatch = useDispatch()

const handleClick = (value) => {
  setActiveElement(value);
  if(value=== 'All') {
    dispatch(getPopularVideos())
  }else{
    dispatch(getVideosByCategory(value))
  }
} 

  return (
    <div className="categoriesBar">
      {keywords.map((value, i) => (
        <span
          key={i}
          onClick={handleClick.bind(null, value)}
          className={activeElement === value ? "active" : ""}
        >
          {value}
        </span>
      ))}
    </div>
  );
};

export default CategoriesBar;
