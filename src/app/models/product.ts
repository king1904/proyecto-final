import { ImageI } from './image';

export interface ProductI{
  id:number;
  nombre:string;
  descripcion:string;
  categoria:string;
  imgs:ImageI[];
  precio:number;
  stock:number;
}
