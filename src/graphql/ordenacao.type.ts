import { Field, ObjectType } from "@nestjs/graphql";

import { DirecaoOrdenacao } from "../enums";
import { Ordenacao } from "../interfaces";

@ObjectType()
export class OrdenacaoType {
  constructor(ordenacao: Ordenacao) {
    this.direcao = ordenacao.direcao;
    this.campo = ordenacao.campo;
  }
  @Field(() => DirecaoOrdenacao, { nullable: false })
  direcao: DirecaoOrdenacao;

  @Field({ nullable: false })
  campo: string;
}
