import {IDepot} from "./depot.model";

export interface IRetrait {
  numeroCompte:                 string;
  montant:                      number;
  description:                  string;
}

export class Retrait implements IRetrait {
  constructor(
    public numeroCompte: string ,
    public montant: number,
    public description: string
  ) {
  }
}
