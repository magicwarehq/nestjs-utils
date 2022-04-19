import { Field, InputType } from "@nestjs/graphql";

import { OrdenacaoInput } from "./ordenacao.input";

@InputType()
export class PaginacaoOffsetInput {
  @Field({ nullable: true })
  busca: string;

  @Field({ nullable: false })
  itensPorPagina: number;

  @Field({ nullable: false })
  paginaAtual: number;

  @Field(() => OrdenacaoInput, { nullable: true })
  ordenacao: OrdenacaoInput;
}
