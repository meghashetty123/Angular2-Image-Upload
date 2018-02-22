export interface DBResponse {
    ATG_ArticleLookup_Response: ATGArticleLookupResponse;
  }
  export interface ATGArticleLookupResponse {
    root?: (RootEntity)[] | null;
  }
  export interface RootEntity {
    MERCHCAT_SUBCLASS: string;
    SKU_ID: string;
    OVERRIDE_PRODUCT_TITLE: string;
    TRUE_COLOR_DESC: string;
  }
  