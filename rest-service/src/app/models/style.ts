import { OutputsEntity } from "./outputentity";
import { Status } from "./status";



export class Style {
  public   status: Status;
  public   outputs?: (OutputsEntity)[] | null;
    constructor() {}
  }