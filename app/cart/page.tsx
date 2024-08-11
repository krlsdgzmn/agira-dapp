"use client";

import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Cart,
  CartData,
  Farmer,
  FarmerData,
  OrderData,
  Product,
  ProductData,
} from "@/types";
import {
  deleteDoc,
  deleteManyDocs,
  listDocs,
  setDoc,
} from "@junobuild/core-peer";
import { Loader2, Trash2 } from "lucide-react";
import { nanoid } from "nanoid";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers";

export default function CartPage() {
  const [cart, setCart] = useState<Cart[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const { toast } = useToast();

  if (!user) router.push("/");

  const getCartItems = async () => {
    if (!user) return;

    try {
      const { items } = await listDocs<CartData>({
        collection: "cart",
      });
      setCart(items);
    } catch (error) {
      toast({
        title: "Failed to fetch cart items",
        description: "Please refresh.",
      });
    }
  };

  const handleDelete = async (doc: Cart) => {
    try {
      await deleteDoc({
        collection: "cart",
        doc,
      });
      toast({
        title: "Success!",
        description: `Product ${doc.data.product_id} has been successfully deleted from your cart.`,
      });
      // Update the cart after deletion
      await getCartItems();
    } catch (error) {
      toast({
        title: "Failed to delete.",
        description: "Please try again.",
      });
    }
  };

  const updateQuantity = async (doc: Cart, newQuantity: number) => {
    if (newQuantity <= 0) return;
    try {
      await setDoc({
        collection: "cart",
        doc: {
          ...doc,
          data: {
            ...doc.data,
            quantity: newQuantity,
          },
        },
      });
      await getCartItems();
    } catch (error) {
      toast({
        title: "Failed to update quantity.",
        description: "Please try again.",
      });
    }
  };

  const getProductsData = async () => {
    try {
      const { items } = await listDocs<ProductData>({
        collection: "products",
      });

      setProducts(items);
    } catch (error) {
      console.error(error);
    }
  };

  const getFarmersData = async () => {
    try {
      const { items } = await listDocs<FarmerData>({
        collection: "farmers",
      });

      setFarmers(items);
    } catch (error) {
      console.error(error);
    }
  };

  const cartProducts = cart
    .map((cartItem) => {
      const product = products.find(
        (product) => product.data.product_id === cartItem.data.product_id,
      );
      if (!product) return null; // Filter out if the product is not found
      return {
        ...product,
        quantity: cartItem.data.quantity,
        doc: cartItem,
      };
    })
    .filter((product) => product !== null); // Remove null values

  const subtotal = cartProducts.reduce(
    (total, item) => total + item.data.price * item.quantity,
    0,
  );

  const deliveryFee = cartProducts.length > 0 ? 150 : 0;

  const total = subtotal + deliveryFee;

  useEffect(() => {
    if (!user) {
      setCart([]);

      return;
    }
    (async () => await getCartItems())();
    (async () => await getProductsData())();
    (async () => await getFarmersData())();
  }, [user]);

  const handleOnPlaceOrder = async () => {
    if (!user || !cartProducts.length) return;

    setIsSubmitting(true);

    try {
      // Group products by farmer_id
      const ordersByFarmer = cartProducts.reduce(
        (acc, product) => {
          const farmerId = product.data.farmer_id; // Assuming `farmer_id` is part of the product data
          if (!acc[farmerId]) {
            acc[farmerId] = [];
          }
          acc[farmerId].push(product);
          return acc;
        },
        {} as Record<string, typeof cartProducts>,
      );

      // Create separate orders for each farmer
      for (const farmerId in ordersByFarmer) {
        const orderProducts = ordersByFarmer[farmerId];
        const orderTotal = orderProducts.reduce(
          (sum, product) => sum + product.data.price * product.quantity,
          0,
        );

        const key = nanoid();
        const orderData: OrderData = {
          order_id: key,
          consumer_id: user.key, // Assuming user object contains `id`
          farmer_id: farmerId,
          products: orderProducts.map((product) => ({
            product_id: product.data.product_id,
            quantity: product.quantity,
          })),
          amount: orderTotal,
          status: "To Pack",
        };

        await setDoc({
          collection: "orders",
          doc: {
            key,
            data: orderData,
          },
        });
      }

      // Delete all cart items after placing orders
      await deleteManyDocs({
        docs: cart.map((cartItem) => ({
          collection: "cart",
          doc: cartItem,
        })),
      });

      toast({
        title: "Success!",
        description: "Your order has been placed successfully.",
      });

      setCart([]);
      router.push("/cart/order-placed");
    } catch (error) {
      toast({
        title: "Failed to place an order.",
        description: "Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="flex min-h-[85vh] flex-col py-8">
      <main className="flex h-full w-full flex-col gap-4 sm:flex-row">
        <section className="h-full w-full sm:w-3/5">
          <h1 className="text-xl font-bold sm:text-2xl">Shopping Cart</h1>
          <p className="pb-4 text-muted-foreground">
            You have {cart.length} items in your cart
          </p>

          <div className="flex flex-col gap-4">
            {cartProducts.map((product) => (
              <div
                key={product.data.product_id}
                className="flex h-[110px] justify-between rounded-md border p-4 shadow"
              >
                <Link
                  className="flex max-h-[100px] w-[300px] items-center gap-2"
                  href={`/marketplace/products/${product.data.product_id}`}
                >
                  <div className="w-[75px]">
                    <Image
                      src={product.data.image}
                      alt={product.data.product_name}
                      className="object-contain"
                      width={200}
                      height={200}
                    />
                  </div>

                  <div className="flex h-full flex-col justify-between">
                    <div>
                      <h1 className="font-bold">{product.data.product_name}</h1>
                      <h2 className="text-sm text-muted-foreground">
                        {
                          farmers.find(
                            (item) =>
                              item.data.farmer_id === product.data.farmer_id,
                          )?.data.farm_name
                        }
                      </h2>
                    </div>

                    <p className="text-sm font-medium">
                      ₱{product.data.price.toFixed(2)}/{product.data.unit}
                    </p>
                  </div>
                </Link>

                <div className="flex flex-col items-end justify-between text-sm font-medium">
                  <Button
                    onClick={async () => await handleDelete(product.doc)}
                    className="h-4 w-4 text-destructive hover:text-destructive/80"
                    size="icon"
                    variant="ghost"
                  >
                    <Trash2 />
                  </Button>

                  <div className="flex items-center gap-2">
                    <span className="font-light">Quantity</span>
                    <Button
                      onClick={() =>
                        updateQuantity(product.doc, product.quantity - 1)
                      }
                      size="icon"
                      className="h-4 w-4"
                      variant="outline"
                    >
                      -
                    </Button>
                    <span>{product.quantity}</span>
                    <Button
                      onClick={() =>
                        updateQuantity(product.doc, product.quantity + 1)
                      }
                      size="icon"
                      className="h-4 w-4"
                      variant="outline"
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="h-full w-full sm:w-2/5">
          <h1 className="text-xl font-bold sm:text-2xl">Order Summary</h1>
          <p className="pb-4 text-muted-foreground">
            Check Your Order Details Below
          </p>

          <div className="rounded-lg border p-4">
            <h1 className="font-bold">Products</h1>
            {cartProducts.map((product) => (
              <div key={product.data.product_id}>
                <div className="flex justify-between pt-2 text-sm">
                  <div className="font-medium">{product.data.product_name}</div>
                  <div>
                    {product.quantity} {product.data.unit}
                  </div>
                </div>

                <div className="flex justify-between border-b py-2 text-sm text-muted-foreground">
                  <p>
                    {product.quantity} x ₱{product.data.price.toFixed(2)}
                  </p>
                  <p className="font-medium">
                    ₱{(product.quantity * product.data.price).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
            <div className="flex justify-between py-2 text-sm font-medium">
              <h2>Subtotal</h2>
              <p>₱{subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between pb-2 text-sm font-medium">
              <h2>Delivery Fee</h2>
              <p>₱{deliveryFee.toFixed(2)}</p>
            </div>

            <div className="flex items-center justify-between border-t pt-4 text-xl md:text-2xl">
              <h2 className="font-bold">₱{total.toFixed(2)}</h2>
              <Button
                size="sm"
                className="flex items-center gap-2 bg-farm hover:bg-farm/90"
                disabled={!cartProducts.length || isSubmitting}
                onClick={async () => {
                  await handleOnPlaceOrder();
                }}
              >
                {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                Place Order
              </Button>
            </div>
          </div>
        </section>
      </main>
    </Container>
  );
}
