import QuantityCounter from "./QuantityCounter";

export default function ProductCard({
 _id,
  productQuantity,
  image,
  productName,
  brand,
  handleAddToQuantity,
  handleRemoveQuantity,
  handleAddToCart,
  handleOnDelete,
  handleOnEdit,
}) {

    // if the product data is available, do not render anything
  if (!productQuantity) return null; 

  return (
    <div className="ProductCard">
        {/*display product image */}
      <img src={image} alt={productName}/>
      <h3>{productName}</h3>
      <h3>{brand}</h3>
      
      <h4>Price: ${productQuantity.price.replace("$","")}</h4>
     
      {/* quantity counter section with + - buttons */}
      <div className="counter-container">

        <QuantityCounter
        quantity= {productQuantity.quantity}
        increase={() => handleAddToQuantity(productQuantity.id)}
        decrease={() => handleRemoveQuantity(productQuantity.id)} />
      </div>

       <h4>
        Total Price:  ${(productQuantity.quantity * productQuantity.currentPrice).toFixed(2)}
      </h4>
{/*button to add product to cart  */}
      <button onClick={() => handleAddToCart(productQuantity)}>Add To Cart</button>
      <button onClick={() => handleOnEdit(_id)}>Edit</button>
      <button onClick={() => handleOnDelete(_id)}>Delete</button>
    </div>
  );
}
