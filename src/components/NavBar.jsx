import cartEmptyPng from "../assets/cart-empty.png";
import cartFullPng from "../assets/cart-full.png"

export default function  NavBar({ TotalcartCount })  {
  
  const cartImage = TotalcartCount > 0
    ? cartFullPng
    : cartEmptyPng;

  return (
    <div
      className="NavBar " 
    >

        <div className="NavDiv NavUser">
<h1>Hello, Kamal</h1>

        </div>

        <div className="NavDiv NavTitle ">
      <h1> Grocery App 🍎</h1>
      </div>

      <div className="NavDiv NavCart">


      <img src = {cartImage} />

      </div>
     
    </div>
  );
};

