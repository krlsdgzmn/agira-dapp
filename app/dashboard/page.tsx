"use client";

import Container from "@/components/container";
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
import { useToast } from "@/components/ui/use-toast";
import { Farmer, FarmerData } from "@/types";
import { listDocs, setDoc, uploadFile } from "@junobuild/core-peer";
import { Loader2 } from "lucide-react";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers";
import FarmerDashboard from "./_components/farmer-dashboard";

export default function DashboardPage() {
  const [name, setName] = useState<string>("");
  const [farmName, setFarmName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [file, setFile] = useState<File | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [currentFarmer, setCurrentFarmer] = useState<Farmer | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();
  const { user } = useContext(AuthContext);
  const { toast } = useToast();

  if (!user) router.push("/");

  const getFarmerData = async () => {
    try {
      const { items } = await listDocs<FarmerData>({
        collection: "farmers",
      });

      // Find the current farmer by matching the owner with the user key
      const farmer = items.find((item) => item.owner === user?.key);
      setCurrentFarmer(farmer || null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load farmer data. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleProfileSubmit = async () => {
    if (!user) {
      return;
    }

    if (!name || !farmName || !location || !file) {
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
        collection: "farmers",
        doc: {
          key,
          data: {
            farmer_id: user.key,
            name: name,
            farm_name: farmName,
            location: location,
            image: url,
          },
        },
      });

      toast({
        title: "Success!",
        description: "You have successfully saved your profile.",
      });

      // Refresh the farmer data after submission
      await getFarmerData();
    } catch (error) {
      toast({
        title: "Failed!",
        description: "An error occurred while saving your profile.",
      });
    } finally {
      setIsSubmitting(false);
      router.refresh();
    }
  };

  useEffect(() => {
    if (user) {
      getFarmerData();
    }
  }, [user]);

  if (loading) {
    return (
      <Container className="flex min-h-[85vh] flex-col items-center justify-center">
        <Loader2 className="animate-spin" size={40} />
      </Container>
    );
  }

  if (!currentFarmer) {
    return (
      <Container className="flex min-h-[85vh] flex-col items-center justify-center">
        <main className="flex max-w-72 flex-col gap-2.5">
          <h1 className="text-xl font-bold md:text-2xl">
            It looks like you don&apos;t have a farmer account yet.
          </h1>
          <p className="mb-2 text-sm text-muted-foreground md:text-base">
            Click the button below to create one.
          </p>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-farm hover:bg-farm/90">
                Create Farmer Profile
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create farmer profile</DialogTitle>
                <DialogDescription>
                  Fill in your farmer profile details below.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    className="col-span-3"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="farmName">Farm Name</Label>
                  <Input
                    id="farmName"
                    placeholder="Agira Farm"
                    className="col-span-3"
                    value={farmName}
                    onChange={(e) => setFarmName(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="Bulacan"
                    className="col-span-3"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="farmImage">Farm Image</Label>
                  <Input
                    id="farmImage"
                    className="col-span-3"
                    type="file"
                    onChange={(e) => setFile(e.target.files?.[0])}
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  onClick={handleProfileSubmit}
                  className="flex items-center gap-2 bg-farm hover:bg-farm/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />{" "}
                      <p>Saving...</p>
                    </>
                  ) : (
                    "Save Profile"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </main>
      </Container>
    );
  } else {
    return <FarmerDashboard currentFarmer={currentFarmer} />;
  }
}
