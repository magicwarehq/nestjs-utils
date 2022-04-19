import { Ordenacao } from "./ordenacao";

export interface PaginacaoOffset<T> extends PaginationOffsetParams {
  qtdTotal: number;
  itens: T[];
}

export interface PaginationOffsetParams {
  busca?: string;
  itensPorPagina: number;
  paginaAtual: number;
  ordenacao: Ordenacao;
}
