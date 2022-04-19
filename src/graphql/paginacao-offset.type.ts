import { Field, ObjectType } from "@nestjs/graphql";

import { PaginacaoOffset } from "../interfaces";
import { OrdenacaoType } from "./ordenacao.type";

@ObjectType()
export class PaginacaoOffsetType {
  constructor(paginacaoOffset: PaginacaoOffset<any>) {
    this.qtdTotal = paginacaoOffset.qtdTotal;
    this.busca = paginacaoOffset.busca;
    this.itensPorPagina = paginacaoOffset.itensPorPagina;
    this.orderBy = new OrdenacaoType(paginacaoOffset.ordenacao);
    this.paginaAtual = paginacaoOffset.paginaAtual;
  }
  @Field({ nullable: false })
  qtdTotal: number;
  @Field({ nullable: true })
  busca?: string;
  @Field({ nullable: false })
  itensPorPagina: number;
  @Field({ nullable: false })
  paginaAtual: number;
  @Field(() => OrdenacaoType, { nullable: false })
  orderBy: OrdenacaoType;
}
