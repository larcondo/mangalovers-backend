export type PrintFormat = {
  id: string;
  name: string;
  description?: string;
};

export interface AllPrintFormatsArgs {
  page?: number;
}

export interface CreatePrintFormat {
  name: string;
  description?: string;
}

export interface UpdatePrintFormatInput {
  name?: string;
  description?: string;
}

export interface UpdatePrintFormatArgs {
  id: string;
  input: UpdatePrintFormatInput;
}
