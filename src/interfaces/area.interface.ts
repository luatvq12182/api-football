export interface Area {
    id: number;
    name: string;
    code: string;
    flag: string;
    parentAreaId: number;
    parentArea: string;
    childAreas: ChildArea[];
}

export interface ChildArea {
    id: number;
    name: string;
    countryCode: string;
    flag?: string;
    parentAreaId: number;
    parentArea: string;
}
