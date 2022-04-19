import { registerEnumType } from "@nestjs/graphql";

export enum DirecaoOrdenacao {
  ASC = "asc",
  DESC = "desc",
}

registerEnumType(DirecaoOrdenacao, { name: "DirecaoOrdenacao" });
