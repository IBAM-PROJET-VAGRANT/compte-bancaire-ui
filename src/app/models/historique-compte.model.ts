import { IOperation } from "./operation.model";

export interface IHistorique {
  numeroCompte:                   string;
  solde:                          number;
  pageCourant:                    number;
  taillePage:                     number;
  totalPages:                     number;
  operationCompteDTO:             IOperation[];
}
