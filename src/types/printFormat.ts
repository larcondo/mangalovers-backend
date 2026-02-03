export type PrintFormat = {
  id: string;
  name: string;
  description?: string;
};

export interface CreatePrintFormat {
  name: string;
  description?: string;
}
