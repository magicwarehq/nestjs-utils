import { InternalServerErrorException } from "@nestjs/common";
import * as uuid from "uuid";

export class EntityId {
  public readonly value: string;
  constructor(value?: string) {
    if (!value) {
      this.value = uuid.v4();
    } else {
      if (!uuid.validate(value))
        throw new InternalServerErrorException("ID inválido");
      this.value = value;
    }
  }

  equals(entityId: EntityId) {
    return this.value === entityId.value;
  }
}
