/* ho installato una libreria per generare gli id univoci passando la funzione direttamente nel modello 
*Vantaggi:

Il modello è auto-sufficiente e garantisce sempre un ID valido
Meno codice duplicato (non devi ricordarti di generare l'ID in ogni servizio/repository)
Più coerente con il concetto di "entità completa"

!Svantaggi:
Meno flessibile se in alcuni casi vuoi generare ID in modo diverso
Potrebbe violare leggermente il principio di singola responsabilità
*/
import { v4 as uuidv4 } from 'uuid';


export type ItemType = 'WISH' | 'GIFT' | 'IMPOSSIBLE';

export interface IItem {
  id: string;
  itemName: string;
  description: string;
  targetPrice: number;
  quantity: number;
  imageUrl: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
  moneySaved: number;
  purchased: boolean;
  deleted: boolean;
  type: ItemType;
  externalUrl?: string;
}

export class Item implements IItem {
  id: string;
  itemName: string;
  description: string;
  targetPrice: number;
  quantity: number;
  imageUrl: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
  moneySaved: number;
  purchased: boolean;
  deleted: boolean;
  type: ItemType;
  externalUrl?: string;

  constructor(data: Partial<IItem> = {}) {
    this.id = data.id || uuidv4();
    this.itemName = data.itemName || '';
    this.description = data.description || '';
    this.targetPrice = data.targetPrice || 0;
    this.quantity = data.quantity || 1;
    this.imageUrl = data.imageUrl || 'assets/default-item.png';
    this.category = data.category || 'other';
    this.createdAt = data.createdAt ? new Date(data.createdAt) : new Date();
    this.updatedAt = data.updatedAt ? new Date(data.updatedAt) : new Date();
    this.moneySaved = data.moneySaved || 0;
    this.purchased = data.purchased || false;
    this.deleted = data.deleted || false;
    this.type = data.type || 'WISH';
    this.externalUrl = data.externalUrl || undefined;
  }
}