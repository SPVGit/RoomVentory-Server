
export function isInteger(input:string){

    return input?.match(/^\d+$/) ?? false; //Only if input string is an integer, return true, else return false

}