import {ConceptsEntity} from '../models/conceptsEntity';
import { ColorsEntity } from './colorsentity';
export class Data  {
    
   public  colors?: (ColorsEntity)[] | null;
   concepts?: (ConceptsEntity)[] | null;

   constructor(){}
       
  }