export class CreateManagerDto {}

export class CreateAccountDto {
  name: string;
  money: number;
}

export class CreateTransferInfoDto {
  fromId: number;
  toId: number;
  amount: number;
}
