import { useState, useEffect } from "react";
import axios from "axios";
import ProductsContainer from "./ProductsContainer";
import CartContainer from "./CartContainer";
import NavBar from "./NavBar";
import Productform from "./productform";
export default function GroceriesAppContainer() {

 
  const [productQuantity, setProductQuantity] = useState([]); // usestate to track each product quantity and price 
    const[formData,setFormData] = useState({

      name: "",
      brand:"",
      image: "",
      price: "$",
    });

    const [postresponse, setPostResponse] = useState("");
    const [isEditing, setIsEditing] = useState(false);
useEffect(() => {
  handleProductsDB();
}, [postresponse]);


 const handleProductsDB = async () => {
  try {
    const response = await axios.get("http://localhost:3000/products");
    setProductQuantity(response.data);
    const updatedProducts = response.data.map((prod) => ({
      ...prod,
      quantity: 0,
      currentPrice: prod.price.replace("$", ""),
    }));

    setProductQuantity(updatedProducts);
  } catch (error) {
    console.log(error.message);
  }
};


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
    const currentProduct = productQuantity.find((prod) => prod.id === productToAdd.id );

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


// handle to reste the form 

const handleResetForm = () => {
setFormData({

      name: "",
      brand: "",
      image: "",
      price: "",
    });
}
// handle th"e submission of data 

const handleonSubmit = async(e) => {
  e.preventDefault();
  try{
    if(isEditing){
      handleOnUpdate(formData._id);
      handleResetForm();
      setIsEditing(false);

    }else{


    await axios.post("http://localhost:3000/products", formData).then((response) => {setPostResponse(response.data.message);
      console.log(response);
    })
    .then(() =>
       handleResetForm()
    );
  }
  }catch(error) {
    console.log(error.message);
  }
};

// handle the onChange event for the form

const handleonChange = (e) => {
  setFormData((prevData) => {
    return { ...prevData, [e.target.name]: e.target.value};
  })

};


// handle to delete on product by id

const handleOnDelete = async(id) => {
  try{
    const response = await axios.delete(`http://localhost:3000/products/${id}`);
   setPostResponse(response.data.message);
   console.log(response);
  }catch(error){
    console.log(error.message);
  }
}

// handle the edition of one product by its id
const handleOnEdit = async (id) => {
  try{
    const productToEdit = await axios.get(`http://localhost:3000/products/${id}`);

    setFormData({
     name: productToEdit.data.productName,
      brand: productToEdit.data.brand,
      image: productToEdit.data.image,
      price: productToEdit.data.price.replace("$", ""),
      _id: productToEdit.data._id,
    });

    setIsEditing(true);


  }catch(error) {console.log(error);

}

};


// handle updating the api patch route

const handleOnUpdate = async (id) => {

  try{
const result = await axios.patch(`http://localhost:3000/products/${id}`,
  formData
);
setPostResponse({message: result.data.message, date: result.data.date })

  }catch(error){
    console.log(error);
  }



}

  return (
    <div id="root">
      
        <NavBar TotalcartCount= {cart.length} />
    <div className="GroceriesApp-Container">
      <div className= "productform">
       <Productform 
      name={formData.name}
      brand={formData.brand}
      image={formData.image}
      price={formData.price}
      handleonSubmit={handleonSubmit}
      handleonChange={handleonChange}
      isEditing={isEditing}
       />
       <p style={{ color: "green"}}> {postresponse.message}</p>
       </div>


        <div className="ProductsContainer">
         
      <ProductsContainer
      
        data={productQuantity} 
        productQuantity={productQuantity}
        
        handleAddToQuantity={handleAddToQuantity}
        handleRemoveQuantity={handleRemoveQuantity}
        handleAddToCart={handleAddToCart}
        handleOnDelete={handleOnDelete}
        handleOnEdit={handleOnEdit}
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
