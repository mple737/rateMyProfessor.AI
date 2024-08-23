export type MessageData = {
    role: "user" | "assistant";
    content: string;
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