export interface IProduct {
  id: string;
  name: string;
  description?: string;
  price: number;
  status: "active" | "archived";
  tags: string[];
  imageUrl?: string;
}

export interface IError {
  message: string;
  status?: number;
  code?: string;
}
