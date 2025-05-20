// components/ProductCard.tsx

import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  imageUrl: string;
  title: string;
  description?: string;
  price: number;
  link: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  imageUrl,
  title,
  description,
  price,
  link,
}) => {
  return (
    <div className="relative bg-card rounded-lg p-4 w-64">
      {imageUrl && (
        <div className="w-full h-40 relative rounded-lg overflow-hidden mb-3">
          <Image src={imageUrl} alt={title} fill className="object-cover" />
        </div>
      )}
      <h3 className="text-lg font-semibold">{title}</h3>
      {description && <p className="text-sm opacity-80 mb-1">{description}</p>}
      <p className="text-xl font-bold">${price}</p>
      <Link href={link}>
        <Button
          size="icon"
          variant="secondary"
          className="absolute p-5 bottom-[-20px] right-[-20px] rounded-full bg-primary hover:bg-primary/50 text-white shadow-lg"
        >
          <ArrowUpRight />
        </Button>
      </Link>
    </div>
  );
};
