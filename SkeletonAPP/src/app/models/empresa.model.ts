import { Estado } from "./estados.model";
export interface Empresa {
  id: string;
  nombreEmpresa: string;
  logo: string;
  estado: Estado;
}
