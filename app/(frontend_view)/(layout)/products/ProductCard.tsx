import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { addSingleItemToCart } from "@/lib/redux-store/features/cart/cartSlice";
import { useAppDispatch } from "@/lib/redux-store/store";
import React from "react";
import { useDispatch } from "react-redux";

const ProductCard = ({ product }: { product: any }) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    // Dispatch action to add item to cart
    dispatch(
      addSingleItemToCart({
        _id: product._id,
        name: product.name,
        price: product.price,
      })
    );
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <h1 className="text-2xl ">Price : {product.price}</h1>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={handleAddToCart}>Add to Cart</Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
