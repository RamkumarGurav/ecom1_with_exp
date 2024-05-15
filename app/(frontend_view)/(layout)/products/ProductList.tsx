"use client";
import { useAppSelector } from "@/lib/redux-store/store";
import ProductCard from "./ProductCard";
import CartItemCard from "./CartItemCard";
const products = [
  {
    _id: "1",
    name: "Product A",
    price: 19.99,
  },
  {
    _id: "2",
    name: "Product B",
    price: 24.99,
  },
  {
    _id: "3",
    name: "Product C",
    price: 14.99,
  },
  {
    _id: "4",
    name: "Product D",
    price: 29.99,
  },
  {
    _id: "5",
    name: "Product E",
    price: 9.99,
  },
];
const ProductList = () => {
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  return (
    <section>
      <h1 className="text-4xl text-center p-2 ">Products</h1>
      <div className="product-list grid lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      <h1 className="text-4xl text-center p-2 ">Cart</h1>
      <div className="product-list grid lg:grid-cols-3 gap-8">
        {cartItems.map((product: any) => (
          <CartItemCard key={product._id} cartItem={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductList;
