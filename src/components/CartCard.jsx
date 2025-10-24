import QuantityCounter from "./QuantityCounter";

export default function CartCard({
    id,
    image,
    productName,
    brand,
    quantity,
    currentPrice,
    handleRemoveFromCart,
    handleIncreaseToCart,
    handleDecreaseTocart,
}){

    return (
        <div className="CartCard">
            <img src={image} alt={productName}  />
            <div classname="CartCardInfo">
            <h2>{productName}</h2>
            <h2>{brand}</h2>
            <p>Quantity: {quantity}</p>



            
            <p>Total Price: ${(quantity * currentPrice).toFixed(2)}</p>
            
            <QuantityCounter 
            quantity={quantity}
             increase ={handleIncreaseToCart}
            decrease={handleDecreaseTocart}
          


/>


            <div className="CartListBtns">

            <button className="RemoveButton"
            onClick={() => {
                handleRemoveFromCart({id, productName, brand, quantity, currentPrice});
            }}
            >
                Remove Item
            </button>
            </div>
</div>
        </div>
    )
}