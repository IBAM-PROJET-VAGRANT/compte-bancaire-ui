export interface IDepot {
  numeroCompte:                 string;
  montant:                      number;
  description:                  string;
}
export class Depot implements IDepot {
  constructor(
    public numeroCompte: string ,
    public montant: number,
    public description: string
  ) {
  }
}
