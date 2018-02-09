import { OutputInfo } from "./outputinfo";
import { ModelVersion } from "./modelVersion";

export class Model {
   public id: string;
   public name: string;
    public created_at: string;
   public app_id: string;
   public output_info: OutputInfo;
   public model_version: ModelVersion;
    public display_name: string;
  }