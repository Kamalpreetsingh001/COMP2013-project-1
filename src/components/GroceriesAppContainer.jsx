import { useState } from "react";
import ProductsContainer from "./ProductsContainer";
import CartContainer from "./CartContainer";
import NavBar from "./NavBar";

export default function GroceriesAppContainer({ products }) {
  const [productQuantity, setProductQuantity] = useState(   // usestate to track each product quantity and price 
    products.map((prod) => {
      return {
        id: prod.id,
        quantity: 0, 
        price: prod.price.replace("$", ""),  // use to remove $ from price 
        currentPrice: prod.price.replace("$", ""), 
      };
    })
  );

  // usestate to manage all items added to the cart
  const [cart, setCart] = useState([]);

  
// increase the quantity for a product before adding to cart
  const handleAddToQuantity = (productId) => {
    const newProductQuantity = productQuantity.map((prod) => {
      if (prod.id === productId) {
        return { ...prod, quantity: prod.quantity + 1 };
      }
      return prod;
    });
    setProductQuantity(newProductQuantity);
  };


  // decrease the quantity for a product before adding to cart
  const handleRemoveQuantity = (productId) => {
    const newProductQuantity = productQuantity.map((prod) => {
      if (prod.id === productId && prod.quantity > 0) {
        return { ...prod, quantity: prod.quantity - 1 };
      }
      return prod;
    });
    setProductQuantity(newProductQuantity);
  };

// add selected product to cart 
  const handleAddToCart = (productToAdd) =>{
    const currentProduct = products.find((prod) => prod.id === productToAdd.id );

    const productInCart = cart.find((item) => item.id === productToAdd.id);

    if (productToAdd.quantity === 0) {
        alert("Please add quantity before adding to cart!");
        return;
    }
    
    if (!productInCart) {

        // add new item to cart if not already present
        setCart((prevCart) => {
            return [
                ...prevCart,
                {
                    ...currentProduct,
                    quantity: productToAdd.quantity,
                    currentPrice: productToAdd.currentPrice,
                },
            ];
        });
    }else {
   // if item already exists, update its quantity and price
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productToAdd.id
          ? {
              ...item,
              quantity: item.quantity + productToAdd.quantity,
              currentPrice: productToAdd.currentPrice,
            }
          : item
      )
    );
  }
  };


// below code is used to remove specific product from cart 
  const handleRemoveFromCart = (cartItem) => {
   
       const filteredCart = cart.filter((item) => item.id !== cartItem.id);
        setCart(filteredCart);
   


  };


  // increse quantity of an item already in the cart
  const handleIncreaseToCart = (productId) => {
  const updatedCart = cart.map((item) => {
    if (item.id === productId) {
      return { ...item, quantity: item.quantity + 1 };
    }
    return item;
  });
  setCart(updatedCart);
};


// decrease quantity of an item already in the cart
  const handleDecreaseTocart = (productId) => {
  const updatedCart = cart.map((item) => {
    if (item.id === productId && item.quantity > 1) {
      return { ...item, quantity: item.quantity - 1 };
    }
    return item;
  });
  setCart(updatedCart);
};


  // below code helps to make cart empty after click on empty cart button

  const handleEmptyCart = () => setCart([]);

 

// below code handle to get total for checkout by adding all prices of items

let checkout = 0;

for (let i = 0; i < cart.length; i++) {
  checkout += cart[i].currentPrice.replace("$","") * cart[i].quantity;
}




  return (
    <div id="root">
        <NavBar TotalcartCount= {cart.length} />
    <div className="GroceriesApp-Container">

        <div className="ProductsContainer">
      <ProductsContainer
        data={products} 
        productQuantity={productQuantity}
        
        handleAddToQuantity={handleAddToQuantity}
        handleRemoveQuantity={handleRemoveQuantity}
        handleAddToCart={handleAddToCart}
      />
    </div>
    <div className="CartContainer">
        
        <CartContainer cart={cart}
        handleRemoveFromCart={handleRemoveFromCart}
        handleIncreaseToCart={handleIncreaseToCart}
        handleDecreaseTocart={handleDecreaseTocart}
        handleEmptyCart={handleEmptyCart}
        Checkout = {checkout}
        
        />
        </div>
        </div>
    </div>
  );
}
