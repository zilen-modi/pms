import { IProduct } from "@/types";

const now = new Date().toISOString();

export const mockProducts: IProduct[] = [
  {
    id: "4",
    name: "MacBook Air M2",
    description:
      "Supercharged by the M2 chip, featuring a 13.6-inch Liquid Retina display and all-day battery life.",
    price: 1199.99,
    status: "active",
    tags: ["electronics", "laptop", "apple", "productivity"],
    imageUrl: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "5",
    name: "Dell XPS 13",
    description:
      "Ultra-thin laptop with InfinityEdge display, premium build quality, and exceptional performance.",
    price: 1299.99,
    status: "active",
    tags: ["electronics", "laptop", "dell", "productivity"],
    imageUrl: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "6",
    name: "Lenovo ThinkPad X1 Carbon",
    description:
      "Business-class laptop with legendary durability, security features, and impressive performance.",
    price: 1499.99,
    status: "active",
    tags: ["electronics", "laptop", "lenovo", "business"],
    imageUrl: "https://images.unsplash.com/photo-1603302576837-37561b2e2302",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "7",
    name: "AirPods Pro",
    description:
      "Active Noise Cancellation, Adaptive Transparency, and spatial audio for an immersive listening experience.",
    price: 249.99,
    status: "active",
    tags: ["electronics", "audio", "apple", "wireless"],
    imageUrl: "https://images.unsplash.com/photo-1603351154351-5e2d0600bb77",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "8",
    name: "Sony WH-1000XM5",
    description:
      "Industry-leading noise cancellation headphones with exceptional sound quality and long battery life.",
    price: 349.99,
    status: "active",
    tags: ["electronics", "audio", "sony", "headphones"],
    imageUrl: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "9",
    name: "Bose QuietComfort Earbuds",
    description:
      "True wireless noise cancelling earbuds with immersive sound and comfortable fit.",
    price: 279.99,
    status: "active",
    tags: ["electronics", "audio", "bose", "wireless"],
    imageUrl: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "29",
    name: "Premium Down Jacket",
    description:
      "Ultralight, packable down jacket with 800-fill power and durable water-repellent finish.",
    price: 229.99,
    status: "active",
    tags: ["apparel", "outerwear", "winter", "lightweight"],
    imageUrl: "https://images.unsplash.com/photo-1604644401890-0bd678c83788",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "30",
    name: "Performance Running Shoes",
    description:
      "Responsive running shoes with adaptive cushioning and breathable mesh upper for long-distance comfort.",
    price: 149.99,
    status: "active",
    tags: ["apparel", "footwear", "running", "athletic"],
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    createdAt: now,
    updatedAt: now,
  },
];
