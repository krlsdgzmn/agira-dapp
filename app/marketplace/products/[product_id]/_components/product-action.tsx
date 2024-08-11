"use client";

import { AuthContext } from "@/app/providers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { CartData, Product } from "@/types";
import { listDocs, setDoc } from "@junobuild/core-peer";
import { Loader2, ShoppingCart } from "lucide-react";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function ProductAction({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { user } = useContext(AuthContext);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    setIsSubmitting(!user);
  }, [user]);

  const reload = () => {
    const event = new CustomEvent("reload");
    window.dispatchEvent(event);
  };

  const handleAddToCart = async () => {
    if (!user) {
      toast({
        title: "You need to sign in first.",
        description: "Please sign in to add items to your cart.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { items } = await listDocs<CartData>({
        collection: "cart",
      });

      const existingItem = items.find(
        (item) => item.data.product_id === product.data.product_id,
      );

      if (existingItem) {
        await setDoc({
          collection: "cart",
          doc: {
            ...existingItem,
            data: {
              ...existingItem.data,
              quantity: existingItem.data.quantity + quantity,
            },
          },
        });

        toast({
          title: "Success!",
          description: `${product.data.product_name} quantity has been updated in your cart.`,
        });
      } else {
        const key = nanoid();

        await setDoc({
          collection: "cart",
          doc: {
            key,
            data: {
              quantity: quantity,
              product_id: product.data.product_id,
            },
          },
        });

        toast({
          title: "Success!",
          description: `${product.data.product_name} has been added to your cart.`,
        });
      }

      reload();
    } catch (error) {
      toast({
        title: "An error has occurred.",
        description: "Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCheckout = async () => {
    await handleAddToCart();
    router.push("/cart");
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0 && value <= 30) {
      setQuantity(value);
    }
  };

  return (
    <>
      <div className="flex items-center gap-2 pt-4 text-sm text-muted-foreground">
        <Input
          type="number"
          min={1}
          max={30}
          className="w-fit max-w-16 text-center focus-visible:ring-farm"
          value={quantity}
          onChange={handleQuantityChange}
          disabled={isSubmitting}
          required
          aria-label="Quantity"
        />

        <p>Quantity / {product.data.unit.toUpperCase()}</p>
      </div>

      <div className="flex items-center gap-2 py-4">
        <Button
          className="flex items-center gap-2"
          onClick={handleAddToCart}
          disabled={isSubmitting}
          aria-label="Add to Cart"
        >
          {!isSubmitting && user && <ShoppingCart size={14} />}
          {!user && <ShoppingCart size={14} />}
          {isSubmitting && user && <Loader2 className="h-4 w-4 animate-spin" />}
          Add to Cart
        </Button>

        <Button
          className="flex items-center gap-2 bg-farm hover:bg-farm/90"
          onClick={handleCheckout}
          disabled={isSubmitting}
          aria-label="Proceed to Checkout"
        >
          {isSubmitting && user && <Loader2 className="h-4 w-4 animate-spin" />}
          Proceed to Checkout
        </Button>
      </div>
    </>
  );
}
