import ProductCard from "./ProductCard";

export default function ProductsContainer({
  data,
  productQuantity,
  handleOnDelete,
  handleAddToQuantity,
  handleRemoveQuantity,
  handleAddToCart,
  handleOnEdit,
}) {
  return (
    <div className="ProductsContainer">
      {data.map((product) => ( 
        <ProductCard
          key={product._id}
          {...product}

          // find the corresponding product quantity object based on matching id
          productQuantity={productQuantity.find((prod) => prod.id === product.id)}
           
          handleAddToQuantity={handleAddToQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleAddToCart={handleAddToCart}
          handleOnDelete={handleOnDelete}
          handleOnEdit={handleOnEdit}
        />
      ))}
    </div>
  );
}
