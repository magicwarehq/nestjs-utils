import { Ordenacao } from "./ordenacao";

export interface PaginacaoCursor<T> extends PaginacaoCursorParams {
  existemMaisItens: boolean;
  itens: T[];
}

export interface PaginacaoCursorParams {
  busca?: string;
  itensPorPagina: number;
  cursor?: string;
  ordenacao: Ordenacao;
}
