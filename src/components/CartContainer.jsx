import CartCard from "./CartCard";

export default function CartContainer({ cart, handleIncreaseToCart,handleDecreaseTocart,handleRemoveFromCart, handleEmptyCart, Checkout}) {

    
    return (

        
        <div >
            
             <h1>cart Items: {cart.length}</h1>
             <p>{cart.length === 0 && "No items in the Cart"}</p>
                {cart.map((item) => (
                <CartCard
                key={item.id}
                {...item}
                handleRemoveFromCart={handleRemoveFromCart}
                handleIncreaseToCart ={() =>handleIncreaseToCart(item.id)}
                handleDecreaseTocart={() => handleDecreaseTocart(item.id)}

                
                />
                
            ))}

            {cart.length > 0 && (
             <div className = "CartCard" >

               
                <button className= "RemoveButton" onClick={handleEmptyCart}>Empty Cart</button>
                <button id="BuyButton" > Checkout ${Checkout.toFixed(2)}</button> 
            </div>
            )}
        </div>
      
    );


}