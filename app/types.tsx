export interface Product {
  _id: string;
  product_id?: string;
  title: string;
  message?: string; // Some data might have this
  designer: {
    name: string;
    slug?: string;
    tag?: string;
  };
  category: {
    name: string;
    slug?: string;
  };
  price: number;
  originalPrice?: number;
  images: string[];
  displayImages?: string[];
  description?: string;
  sizes: string[];
  inStock?: boolean;
  trending?: boolean;
  new?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
}
