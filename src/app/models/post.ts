import { UserI } from './user';

export interface Post{
  id:number;
user:UserI;
text:string;
likes:number;
date:string;
}

