export interface IPintrest {
    data?: (IPintrestDataEntity)[] | null;
  }
  export interface IPintrestDataEntity {
    image: IPintrestImage;
    id: string;
  }
  export interface IPintrestImage {
    original: IPintrestOriginal;
  }
  export interface IPintrestOriginal {
    url: string;
    width: number;
    height: number;
  }
  