export type MessageData = {
    role: "user" | "assistant";
    content: string;
    loading?: boolean; // Optional loading property
  };
  
  export interface IResponse {
    id: string;
    model: string;
    object: string;
    created: string;
    choices: IResponseChoice[];
  }
  
  export interface IResponseChoice {
    index: number;
    delta: MessageData;
  }