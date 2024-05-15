import {
  addSingleItemToCart,
  removeSingleItemFromCart,
} from "@/lib/redux-store/features/cart/cartSlice";
import { useAppDispatch } from "@/lib/redux-store/store";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
const CartItemCard = ({ cartItem }: { cartItem: any }) => {
  const dispatch = useAppDispatch();

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{cartItem.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <h1 className="text-2xl ">Price : {cartItem.price}</h1>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          onClick={() => dispatch(removeSingleItemFromCart(cartItem._id))}
        >
          Remove From Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CartItemCard;
