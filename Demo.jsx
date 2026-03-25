
function Product({name, price, inStock}){

  return (
    <div className="product">
      <h2>{name}</h2>
      <p>Price: ₹{price}</p>

      {inStock ? 
        <p style={{color:"green"}}>Available</p> 
        :
        <p style={{color:"red"}}>Out of Stock</p>
      }

    </div>
  );
}

export default Product