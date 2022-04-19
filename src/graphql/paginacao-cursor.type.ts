import { Field, ID, ObjectType } from "@nestjs/graphql";

import { PaginacaoCursor } from "../interfaces";
import { OrdenacaoType } from "./ordenacao.type";

@ObjectType()
export class PaginacaoCursorType {
  constructor(paginacaoCursor: PaginacaoCursor<unknown>) {
    this.cursor = paginacaoCursor.cursor;
    this.existemMaisItens = paginacaoCursor.existemMaisItens;
    this.itensPorPagina = paginacaoCursor.itensPorPagina;
    this.ordenacao = paginacaoCursor.ordenacao;
    this.busca = paginacaoCursor.busca;
  }

  @Field({ nullable: true })
  busca?: string;

  @Field({ nullable: false })
  itensPorPagina: number;

  @Field({ nullable: false })
  existemMaisItens: boolean;

  @Field(() => ID, { nullable: true })
  cursor?: string;

  @Field(() => OrdenacaoType, { nullable: false })
  ordenacao: OrdenacaoType;
}
