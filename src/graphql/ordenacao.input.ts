import { Field, InputType } from "@nestjs/graphql";

import { DirecaoOrdenacao } from "../enums";

@InputType()
export class OrdenacaoInput {
  @Field({ nullable: true, defaultValue: "createdAt" })
  campo: string;

  @Field(() => DirecaoOrdenacao, {
    nullable: true,
    defaultValue: DirecaoOrdenacao.ASC,
  })
  direcao: DirecaoOrdenacao;
}
