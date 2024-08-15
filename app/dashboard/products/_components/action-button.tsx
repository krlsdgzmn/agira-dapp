"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Product } from "@/types";
import { deleteDoc, setDoc, uploadFile } from "@junobuild/core-peer";
import { Loader2, Pencil, Trash2 } from "lucide-react";
import { useContext, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AuthContext } from "@/app/providers";

export default function ActionButton({
  doc,
  getProductsData,
}: {
  doc: Product;
  getProductsData: () => Promise<void>;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>(doc.data.product_name);
  const [category, setCategory] = useState<string>(doc.data.category);
  const [unit, setUnit] = useState<string>(doc.data.unit);
  const [price, setPrice] = useState<number>(doc.data.price);
  const [file, setFile] = useState<File | undefined>(undefined);
  const { toast } = useToast();
  const { user } = useContext(AuthContext);

  const handleUpdate = async (doc: Product) => {
    if (!user) {
      return;
    }

    if (!name || !category || !unit || !price || !file) {
      toast({
        title: "Incomplete fields",
        description: "Please fill all the required fields.",
      });
      return;
    }

    setIsLoading(true);

    try {
      let url = "";

      if (file) {
        const filename = `${user.key}_${file.name}`;
        const { downloadUrl } = await uploadFile({
          collection: "images",
          data: file,
          filename,
        });
        url = downloadUrl;
      }

      await setDoc({
        collection: "products",
        doc: {
          ...doc,
          data: {
            ...doc.data,
            product_name: name,
            category: category,
            unit: unit,
            price: price,
            image: url,
          },
        },
      });

      toast({
        title: "Success!",
        description: `Product ${doc.data.product_id} has been successfully updated.`,
      });

      await getProductsData();
    } catch (error) {
      console.error(error);

      toast({
        title: "Failed to update.",
        description: "Please try again.",
      });
    } finally {
      setName("");
      setCategory("");
      setUnit("");
      setPrice(0);
      setFile(undefined);
      setIsLoading(false);
    }
  };

  const handleDelete = async (doc: Product) => {
    setIsLoading(true);

    try {
      await deleteDoc({
        collection: "products",
        doc,
      });

      toast({
        title: "Success!",
        description: `Product ${doc.data.product_name} has been successfully deleted from your products.`,
      });

      await getProductsData();
    } catch (error) {
      console.error(error);

      toast({
        title: "Failed to delete.",
        description: "Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-fit rounded border">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            disabled={isLoading}
            size="icon"
            variant="ghost"
            className="h-8 overflow-hidden rounded-none border-r text-blue-500 hover:bg-farm/10 hover:text-blue-500"
          >
            <Pencil size={12} />
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update your product</DialogTitle>
            <DialogDescription>
              Fill in your product details below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Apple"
                className="col-span-3"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Fruits">Fruits</SelectItem>
                  <SelectItem value="Vegetables">Vegetables</SelectItem>
                  <SelectItem value="Meat">Meat</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="unit">Unit</Label>
              <Select value={unit} onValueChange={setUnit}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kg">kg</SelectItem>
                  <SelectItem value="lbs">lbs</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                placeholder="0"
                className="col-span-3"
                min={0}
                value={price}
                onChange={(e) => setPrice(parseInt(e.target.value))}
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="productImage">Product Image</Label>
              <Input
                id="productImage"
                className="col-span-3"
                type="file"
                onChange={(e) => setFile(e.target.files?.[0])}
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              onClick={async () => await handleUpdate(doc)}
              className="flex items-center gap-2 bg-farm hover:bg-farm/90"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />{" "}
                  <p>Updating...</p>
                </>
              ) : (
                "Update Product"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Button
        onClick={async () => await handleDelete(doc)}
        disabled={isLoading}
        size="icon"
        variant="ghost"
        className="h-8 overflow-hidden rounded-none text-red-500 hover:bg-farm/10 hover:text-red-500"
      >
        <Trash2 size={12} />
      </Button>
    </div>
  );
}
