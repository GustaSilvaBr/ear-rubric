export interface IRubric{
    categories:ICategory[]
    criterias:ICriteria[]
    items: IRubricItem[]
}
export interface ICategory{
    name: String
}
export interface ICriteria{
    name: String,
    score: number
}
export interface IRubricItem{
    description:String,
    categoryIndex:number,
    criteriaIndex:number
}