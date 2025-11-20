export default function QuantityCounter({ quantity, increase, decrease }) {
  return (
    <div className="ProductQuantityDiv">
        {/*button to decrease the quantity */}
      <button className="QuantityBtn" onClick={decrease}>
        −
      </button>
      {/*Display current quantity */}
     <p>{quantity}</p>

     {/* button to increase the quantity */}
      <button className="QuantityBtn" onClick={increase}>
        +
      </button>
    </div>
  );
}
