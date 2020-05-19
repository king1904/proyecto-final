import { ImageI } from './models/image';

export interface Product{
  id?:number;
  nombre:string;
  descripcion:string;
  imgs:ImageI[];
  categoria:string;
  precio:number;
  stock:number;
}
