export default function Productform({
    name,
    brand,
    image,
    price,
    handleonSubmit,
    handleonChange,
    isEditing
}) {
    return (
        <div>
            <h2>Product form</h2>

            <form onSubmit={handleonSubmit}>
<label htmlFor="name">Product Name </label>
<input type="text" name="name" id="name" value={name}
onChange={handleonChange} placeholder="Product name"/>


<label htmlFor="brand">Brand: </label>
<input type="text" name="brand" id="brand" value= {brand} 
onChange = {handleonChange} placeholder="Product Brand"/>
<br />

<label htmlFor="image">image link: </label>
<input type="text" name="image" id="image" value= {image} 
onChange = {handleonChange} placeholder="Product image link"/>


<br /><label htmlFor="price">Price: </label>
<input type="number" name="price" id="price" value= {price} 
onChange = {handleonChange} placeholder="Product price "/>
<br />
            <button>{isEditing? "Editing" : "submit"}</button>

            </form>
        </div>
    );
}