import CartCard from "./CartCard";

// CartContainer component handles displaying all items inside the shopping cart
export default function CartContainer({ 
    cart, 
    handleIncreaseToCart, 
    handleDecreaseTocart, 
    handleRemoveFromCart, 
    handleEmptyCart, 
    Checkout 
}) {

    return (
        <div>
            {/* Display total number of cart items */}
            <h1>Cart Items: {cart.length}</h1>

            {/* Show message if there are no items in the cart */}
            <p>{cart.length === 0 && "No items in the Cart"}</p>

            
            {cart.map((item) => (
                <CartCard
                    key={item.id}
                    {...item} 
                    handleRemoveFromCart={handleRemoveFromCart}
                    handleIncreaseToCart={() => handleIncreaseToCart(item.id)} 
                    handleDecreaseTocart={() => handleDecreaseTocart(item.id)} 
                />
            ))}

            {/* If cart has at least one item, show Empty Cart and Checkout buttons */}
            {cart.length > 0 && (
                <div className="CartCard">
                    {/* Button to empty the entire cart */}
                    <button 
                        className="RemoveButton" 
                        onClick={handleEmptyCart}
                    >
                        Empty Cart
                    </button>

                    {/* Button to proceed to checkout showing total amount */}
                    <button id="BuyButton">
                        Checkout ${Checkout.toFixed(2)}
                    </button>
                </div>
            )}
        </div>
    );
}
