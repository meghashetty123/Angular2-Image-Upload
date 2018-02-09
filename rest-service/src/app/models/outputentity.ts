import { Status } from "./status";
import { Model } from "./model";
import { Data } from "./data";
import { Input } from "./input";

export class OutputsEntity {
    public id: string;
    public status: Status;
    public created_at: string;
    public model: Model;
    public input: Input;
    public data: Data;
  }