import { ProductI } from './product';
import { ImageI } from './image';

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
    id:number;
    products:ProductI[];
  }
}
