export interface CartI {
  id: number;
  products: ProductI[];
}

export interface ImageI {
  id?: number;
  name: string;
  originalName: string;
  date?: Date;
}

export interface JwtResponseI {
  id: string;
  username: string;
  email: string;
  accessToken: string;
  expiresIn: string;
}

export interface Post {
  id: number;
  user: UserI;
  text: string;
  likes: number;
  date: string;
}

export interface ProductI {
  id?: number;
  nombre: string;
  descripcion: string;
  categoria: string;
  imgs: ImageI[];
  precio: number;
  stock: number;
}

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  // password:string;
  active: boolean;
  roles?: string;
  firstname?: string;

  lastname?: string;

  website?: string;

  info?: string;

  img?: string;
}

export interface UserI {
  id: number;
  username: string;
  email: string;
  password: string;
  active: boolean;
  roles?: string;
  userDetails: {
    firstname?: string;

    lastname?: string;

    website?: string;

    info?: string;

    img?: ImageI;
  };
  cart: {
    id: number;
    products: ProductI[];
  };
}
