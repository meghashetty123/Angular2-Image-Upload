export interface Istyle {
    status: Status;
    outputs?: (OutputsEntity)[] | null;
  }
  export interface Status {
    code: number;
    description: string;
  }
  export interface OutputsEntity {
    id: string;
    status: Status;
    created_at: string;
    model: Model;
    input: Input;
    data: Data;
  }
  export interface Model {
    id: string;
    name: string;
    created_at: string;
    app_id: string;
    output_info: OutputInfo;
    model_version: ModelVersion;
    display_name: string;
  }
  export interface OutputInfo {
    message: string;
    type: string;
    type_ext: string;
  }
  export interface ModelVersion {
    id: string;
    created_at: string;
    status: Status;
  }
  export interface Input {
    id: string;
    data: Data1;
  }
  export interface Data1 {
    image: Image;
  }
  export interface Image {
    url: string;
  }
  export interface Data {
    concepts?: (ConceptsEntity)[] | null;
  }
  export interface ConceptsEntity {
    id: string;
    name: string;
    value: number;
    app_id: string;
  }
  export interface ColorsEntity {
    raw_hex: string;
    w3c: W3c;
    value: number;
  }
  export interface W3c {
    hex: string;
    name: string;
  }
  
  
  
