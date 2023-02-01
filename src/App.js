import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]); // for storing the api data
  const [pageNo, setpageNo] = useState(2);

  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json(); // Nnow conver it to json

    // console.log(data);
    // Now put all the api data into 1 variable for this we use useState

    if (data && data.products) {
      setProducts(data.products);
    }
  };

  // console.log(products);
  useEffect(() => {
    fetchProducts();
  }, []); // jb dependncy array bhi dalege toh sirf 1st time hi fetch krege products ko

  const selectedPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= products.length / 10
      // &&
      // selectedPage !== pageNo
    )
      setpageNo(selectedPage);
  };
  return (
    <div>
      {products.length > 0 && (
        <div className="products">
          {products.slice(pageNo * 10 - 10, pageNo * 10).map((prod) => {
            return (
              <span className="products__single" key={prod.id}>
                <img src={prod.thumbnail} alt={prod.title} />
                <span>{prod.title}</span>
              </span>
            );
          })}
        </div>
      )}

      {/*  ADD PAGINATION -> BOTTOM BAR */}
      {products.length > 0 && (
        <div className="pagination">
          {/* hello, so idr button honge 3 prev, pages, next, so 3 span 
          press window key + semicolon - toh open emojis*/}
          <span onClick={() => selectedPageHandler(pageNo - 1)}>◀</span>
          {/* printing middle no how many number we have, suppose 100 products /10
          = 10 pages]*/}
          {[...Array(products.length / 10)].map((_, index) => {
            return (
              <span
                className={pageNo === index + 1 ? "pagination__selected" : ""}
                onClick={() => selectedPageHandler(index + 1)}
                key={index}
              >
                {index + 1}
              </span>
            );
          })}
          <span onClick={() => selectedPageHandler(pageNo + 1)}>▶</span>
        </div>
      )}
    </div>
  );
}

export default App;
