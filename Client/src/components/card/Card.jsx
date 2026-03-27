import { Link } from "react-router-dom";
import "./card.scss";
import { MessageCircleCode, SaveIcon } from "lucide-react";

function Card({ item }) {
//   console.log( "items---------------", item);
//   console.log( "items._id---------------", item._id);
  if (!item) return console.log("No item data available for Card component");

  return (
    <div className="card">
      <Link to={`/posts/${item._id}`} className="imageContainer">
<img src={item.images?.[0] || "/noimage.png"} alt="" />      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/posts/${item._id}`}>{item.title}</Link>
        </h2>
        <p className="address">
          <img src="/pin.png" alt="" />
          <span>{item.address}</span>
        </p>
        <p className="price">${item.price}</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="/bed.png" alt="" />
              <span>{item.bedrooms} bedroom</span>
            </div>
            <div className="feature">
              <img src="/bath.png" alt="" />
              <span>{item.bathrooms} bathroom</span>
            </div>
          </div>
          <div className="icons">
            <div className="icon">
              <SaveIcon size={18} />  
            </div>
            <div className="icon">
              <MessageCircleCode size={18} />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
