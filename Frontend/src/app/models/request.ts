export class Request {
  _id: string;
  paciente: string;
  encaminhado: boolean;
  pessoaRisco: boolean;
  trabalhoRisco: boolean;
  estadoPedido: string;
  dataExame: Date;
  resultado: string;
  prioridade: number;

  constructor(
    paciente: string,
    encaminhado: boolean,
    pessoaRisco: boolean,
    trabalhoRisco: boolean
  ) {
    this.paciente = paciente;
    this.encaminhado = encaminhado;
    this.pessoaRisco = pessoaRisco;
    this.trabalhoRisco = trabalhoRisco;
  }
}
