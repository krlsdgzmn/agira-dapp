"use client";

import { AuthContext } from "@/app/providers";
import { Button } from "@/components/ui/button";
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
import { useToast } from "@/components/ui/use-toast";
import { setDoc, uploadFile } from "@junobuild/core-peer";
import { Loader2 } from "lucide-react";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

export default function ProductButton({
  getProductsData,
}: {
  getProductsData: () => Promise<void>;
}) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [unit, setUnit] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [file, setFile] = useState<File | undefined>(undefined);

  const { toast } = useToast();
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const handleProductSubmit = async () => {
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

    setIsSubmitting(true);

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

      const key = nanoid();

      await setDoc({
        collection: "products",
        doc: {
          key,
          data: {
            product_id: key,
            farmer_id: user.key,
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
        description: "You have successfully saved your product.",
      });

      await getProductsData();
    } catch (error) {
      toast({
        title: "Failed!",
        description: "An error occurred while saving your product.",
      });
    } finally {
      setIsSubmitting(false);
      setName("");
      setCategory("");
      setUnit("");
      setPrice(0);
      setFile(undefined);
      router.refresh();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-farm hover:bg-farm/90" size="sm">
          + Add Products
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new products</DialogTitle>
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
            onClick={handleProductSubmit}
            className="flex items-center gap-2 bg-farm hover:bg-farm/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" size={18} /> <p>Saving...</p>
              </>
            ) : (
              "Save Product"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
