import {IRetrait} from "./retrait.model";

export interface IVirement {
  numeroCompteSource:           string;
  numeroCompteDestination:      string;
  montant:                      number;
  description:                  string;
}

export class Virement implements IVirement {
  constructor(
    public numeroCompteSource: string ,
    public numeroCompteDestination: string ,
    public montant: number,
    public description: string
  ) {
  }
}
