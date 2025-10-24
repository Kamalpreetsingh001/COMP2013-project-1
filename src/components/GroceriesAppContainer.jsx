import { useState } from "react";
import ProductsContainer from "./ProductsContainer";
import CartContainer from "./CartContainer";
import NavBar from "./NavBar";

export default function GroceriesAppContainer({ products }) {
  const [productQuantity, setProductQuantity] = useState(
    products.map((prod) => {
      return {
        id: prod.id,
        quantity: 0, 
        price: prod.price.replace("$", ""), 
        currentPrice: prod.price.replace("$", ""), 
      };
    })
  );

  const [cart, setCart] = useState([]);

  const handleOnChangePrice = (productId, e) => {
    const newProductQuantity = productQuantity.map((prod) => {
      if (prod.id === productId) {
        return { ...prod, currentPrice: e.target.value.replace("$","") };
      }
      return prod;
    });
    setProductQuantity(newProductQuantity);
  };

  const handleAddToQuantity = (productId) => {
    const newProductQuantity = productQuantity.map((prod) => {
      if (prod.id === productId) {
        return { ...prod, quantity: prod.quantity + 1 };
      }
      return prod;
    });
    setProductQuantity(newProductQuantity);
  };

  const handleRemoveQuantity = (productId) => {
    const newProductQuantity = productQuantity.map((prod) => {
      if (prod.id === productId && prod.quantity > 0) {
        return { ...prod, quantity: prod.quantity - 1 };
      }
      return prod;
    });
    setProductQuantity(newProductQuantity);
  };


  const handleAddToCart = (productToAdd) =>{
    const currentProduct = products.find((prod) => prod.id === productToAdd.id );

    const productInCart = cart.find((item) => item.id === productToAdd.id);

    if (productToAdd.quantity === 0) {
        alert("Please add quantity before adding to cart!");
        return;
    }
    
    if (!productInCart) {
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


// below code is used to remove product from cart 
  const handleRemoveFromCart = (cartItem) => {
   
       const filteredCart = cart.filter((item) => item.id !== cartItem.id);
        setCart(filteredCart);
   


  };


  const handleIncreaseToCart = (productId) => {
  const updatedCart = cart.map((item) => {
    if (item.id === productId) {
      return { ...item, quantity: item.quantity + 1 };
    }
    return item;
  });
  setCart(updatedCart);
};

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
        handleOnChangePrice={handleOnChangePrice}
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
