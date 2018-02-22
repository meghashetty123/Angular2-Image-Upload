export interface BiglotsImages {
    totalcount: number;
    items?: (ItemsEntity)[] | null;
  }
  export interface ItemsEntity {
    id: number;
    ActiveCoupon?: null;
    AltText: string;
    Article: string;
    ArticleColor?: null;
    ArticleSize?: null;
    AssetModificationDate: string;
    AssetType: AssetTypeOrImage;
    Brand?: null;
    BuyerName?: null;
    CatalogingUser: string;
    Class?: null;
    ClassID?: null;
    CompPrice?: null;
    DeleteFromExternal?: null;
    DeleteFromCumulus?: null;
    Department?: null;
    DeptID?: null;
    Description?: null;
    Destination: string;
    DisplayOrder: number;
    DivID?: null;
    Division?: null;
    FileFormatIdentifier: string;
    HorizontalPixels: number;
    ImageStatus: AssetTypeOrImage;
    ManifestVersion: number;
    MfrPartNo?: null;
    PermPrice?: null;
    ProductTitle?: null;
    RecordName: string;
    RemoveOn?: null;
    RoboFlowSource: string;
    SAPUpdate: boolean;
    SerialNumber: string;
    SFTPHash: string;
    Subclass?: null;
    SubclassID?: null;
    SyncMessage?: null;
    SyncStep?: null;
    VendorName?: null;
    VendorNo?: null;
    VerticalPixels: number;
    View?: null;
    WebPhotographyWorkflowWorkflowState: AssetTypeOrImage;
    YouTube?: null;
    AssetDataSizeLong: AssetDataSizeLong;
    RecordModificationDate: string;
    Status?: null;
    Categories?: (CategoriesEntity)[] | null;
    ArticleInfo?: null;
    name: string;
  }
  export interface AssetTypeOrImage {
    id: number;
    displaystring: string;
  }
  export interface AssetDataSizeLong {
    value: number;
    displaystring: string;
  }
  export interface CategoriesEntity {
    id: number;
    name: string;
    path: string;
  }
  