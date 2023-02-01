import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]); // for storing the api data
  const [pageNo, setpageNo] = useState(2);

  // another type varition for adding the limit functionality
  const [totalPages, setTotalPages] = useState(0);

  const fetchProducts = async () => {
    const res = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${pageNo * 10 - 10}`
    );
    const data = await res.json(); // Nnow conver it to json

    console.log(data);
    // Now put all the api data into 1 variable for this we use useState

    if (data && data.products) {
      setProducts(data.products);
      setTotalPages(data.total / 10); // for limit functionality
      // means total toh 100 hi rhege and 10 hi dikhane h each page pr
      // so jidr jidr product.length use krre the udr udr hum total Page use krege
    }
  };

  // console.log(products);
  useEffect(() => {
    fetchProducts();
  }, [pageNo]); // jb dependncy array bhi dalege toh sirf 1st time hi fetch krege products ko

  const selectedPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= totalPages
      // &&
      // selectedPage !== pageNo
    )
      setpageNo(selectedPage);
  };
  return (
    <div>
      {products.length > 0 && (
        <div className="products">
          {/* {products.slice(pageNo * 10 - 10, pageNo * 10).map((prod) => { */}
          {products.map((prod) => {
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
          {[...Array(totalPages)].map((_, index) => {
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
