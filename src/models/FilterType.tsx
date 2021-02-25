import { firstLetterToUpperCase } from "./../utils/Helper";

export enum FilterType {
    All = "all", 
    Active = "active", 
    Done = "done"
}

export const FilterTypeBtns = [
    getFilterTypeBtnItem(FilterType.All),
    getFilterTypeBtnItem(FilterType.Active),
    getFilterTypeBtnItem(FilterType.Done)
]

function getFilterTypeBtnItem(filterType: string) {
    return {
        name: filterType, 
        label: firstLetterToUpperCase(filterType) 
    }
}