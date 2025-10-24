export default function QuantityCounter({ quantity, increase, decrease }) {
  return (
    <div className="ProductQuantityDiv">
      <button className="QuantityBtn" onClick={decrease}>
        −
      </button>
     <p>{quantity}</p>
      <button className="QuantityBtn" onClick={increase}>
        +
      </button>
    </div>
  );
}
