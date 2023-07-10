import React, { useEffect, useState } from "react";

function Pegination() {
  const [products, setProducts] = useState([]);
  const [pages, setPages] = useState(1);
  const productResponse = async () => {
    const response = await fetch("https://dummyjson.com/products?limit=100");
    const data = await response.json();
    setProducts(data.products);
  };
  console.log(products);
  useEffect(() => {
    productResponse();
  }, []);
  const selectPageHandler = (pageNo) => {
    if (pageNo >= 1 && pageNo <= products.length / 10 && pageNo != pages)
      setPages(pageNo);
  };
  return (
    <>
      <div>
        <div className="products">
          {products.length > 0 &&
            products.slice(pages * 10 - 10, pages * 10).map((product) => {
              return (
                <div className="product__content" key={product.id}>
                  <img src={product.thumbnail} alt={product.title} />
                  <span>{product.title}</span>
                </div>
              );
            })}
        </div>
        {products.length > 0 && (
          <div className="pegination">
            <span
              onClick={() => selectPageHandler(pages - 1)}
              className={pages > 1 ? "" : "pegination__disabled"}
            >
              previous
            </span>
            {[...Array(products.length / 10)].map((_, i) => {
              return (
                <>
                  <span
                    key={i + 1}
                    onClick={() => selectPageHandler(i + 1)}
                    className={pages === i + 1 ? "pegination__selected" : ""}
                  >
                    {i + 1}
                  </span>
                </>
              );
            })}
            <span
              onClick={() => selectPageHandler(pages + 1)}
              className={
                pages < products.length / 10 ? "" : "pegination__disabled"
              }
            >
              next
            </span>
          </div>
        )}
      </div>
    </>
  );
}
export default Pegination;
