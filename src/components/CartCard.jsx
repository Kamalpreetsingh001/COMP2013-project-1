import QuantityCounter from "./QuantityCounter";

// CartCard component displays each item inside the cart
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
        // Main container for each cart item
        <div className="CartCard">
            {/* Product image */}
            <img src={image} alt={productName}  />

            {/* Product information section */}
            <div classname="CartCardInfo">
                {/* Display product name and brand */}
                <h2>{productName}</h2>
                <h2>{brand}</h2>

                {/* Display quantity of the product in the cart */}
                <p>Quantity: {quantity}</p>

                {/* Display total price for this product based on quantity and current price */}
                <p>Total Price: ${(quantity * currentPrice).toFixed(2)}</p>
            
                {/* QuantityCounter component allows increasing or decreasing quantity */}
                <QuantityCounter 
                    quantity={quantity}
                    increase={handleIncreaseToCart}
                    decrease={handleDecreaseTocart}
                />

                {/* Buttons section for removing an item from the cart */}
                <div className="CartListBtns">

                    {/* Remove Item button calls handleRemoveFromCart with item details */}
                    <button 
                        className="RemoveButton"
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
