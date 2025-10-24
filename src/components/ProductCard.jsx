import QuantityCounter from "./QuantityCounter";

export default function ProductCard({
  productQuantity,
  image,
  productName,
  brand,
  handleAddToQuantity,
  handleRemoveQuantity,
  handleAddToCart,
}) {
  if (!productQuantity) return null; 

  return (
    <div className="ProductCard">
      <img src={image} alt={productName}/>
      <h3>{productName}</h3>
      <h3>{brand}</h3>
      
      <h4>Price: ${productQuantity.price.replace("$","")}</h4>
     
      
      <div className="counter-container">

        <QuantityCounter
        quantity= {productQuantity.quantity}
        increase={() => handleAddToQuantity(productQuantity.id)}
        decrease={() => handleRemoveQuantity(productQuantity.id)} />
      </div>

       <h4>
        Total Price: $
        {(productQuantity.quantity * productQuantity.price).toFixed(2)}
      </h4>

      <button onClick={() => handleAddToCart(productQuantity)}>Add To Cart</button>
    </div>
  );
}
