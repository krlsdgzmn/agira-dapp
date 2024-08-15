import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";

const methods = [
  {
    name: "Cash",
    description: "Pay directly to your provider",
    image: "/cash.svg",
  },
  {
    name: "Credit/Debit Card",
    description: "Use your card in paying",
    image: "/credit.svg",
  },
  {
    name: "GCash",
    description: "GCash balance",
    image: "/gcash.svg",
  },
  {
    name: "$GIRA",
    description: "Use $GIRA in paying",
    image: "/wallet.svg",
  },
];

export default function PaymentMethod() {
  return (
    <RadioGroup defaultValue="Cash">
      {methods.map((item) => (
        <div
          key={item.name}
          className="flex items-center justify-between space-x-2 rounded-md border p-4"
        >
          <div className="flex gap-4">
            <Image
              src={item.image}
              alt={item.name}
              className="mx-4"
              width={32}
              height={32}
            />

            <div>
              <Label htmlFor={item.name}>{item.name}</Label>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          </div>
          <RadioGroupItem
            value={item.name}
            id={item.name}
            className="text-farm"
          />
        </div>
      ))}
    </RadioGroup>
  );
}
