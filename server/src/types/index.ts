export interface IProduct {
  id: string;
  name: string;
  description?: string;
  price: number;
  status: "active" | "archived";
  tags: string[];
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ICreateProduct {
  name: string;
  description?: string;
  price: number;
  status: "active" | "archived";
  tags: string[];
  imageUrl?: string;
}

export interface IUpdateProduct {
  id: string;
  name?: string;
  description?: string;
  price?: number;
  status?: "active" | "archived";
  tags?: string[];
  imageUrl?: string;
}

export interface IApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface IError {
  message: string;
  status?: number;
  code?: string;
}
