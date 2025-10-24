import ProductCard from "./ProductCard";

export default function ProductsContainer({
  data,
  productQuantity,
  
  handleAddToQuantity,
  handleRemoveQuantity,
  handleAddToCart,
}) {
  return (
    <div className="ProductsContainer">
      {data.map((product) => ( 
        <ProductCard
          key={product.id}
          {...product}

          // find the corresponding product quantity object based on matching id
          productQuantity={productQuantity.find((prod) => prod.id === product.id)}
           
          handleAddToQuantity={handleAddToQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
}
