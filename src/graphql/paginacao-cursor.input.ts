import { Field, ID, InputType } from "@nestjs/graphql";

import { OrdenacaoInput } from "./ordenacao.input";

@InputType()
export class PaginacaoCursorInput {
  @Field({ nullable: true })
  busca?: string;

  @Field({ nullable: false })
  itensPorPagina: number;

  @Field(() => ID, { nullable: true })
  cursor?: string;

  @Field(() => OrdenacaoInput, { nullable: false })
  ordenacao: OrdenacaoInput;
}
