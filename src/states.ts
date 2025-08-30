// atoms/counterAtom.ts
// import { atom } from "recoil"
import { atom } from "jotai";;

import { atomWithStorage } from 'jotai/utils';
interface IEnv{
    title:string,
    id?:string|number
    value:string
    edit?:boolean
    view?:boolean
 
}
interface IEnvProject{
    title:string,
    id:string
    key:string
    createdAt:string
}
interface ITeam{
    permission:string,
    id:string
    email:string
    name:string
    createdAt:string
}
export interface IUser{


    email:string
    name:string
    createdAt:string
}
export const envsstate = atom<IEnv[]>([{
  

    title:"secret",id:"",value:"qwersdgtfhgggfxdzsxczxczxczxczxczxczxczxc"
   ,
}]);
export const envsProjectstate = atom<IEnvProject[]>([{
  

    title:"secret",id:"",key:"qwersdgtfhgggfxdzsxczxczxczxczxczxczxczxc",createdAt:new Date().toISOString()
   ,
}]);
export const teamsState = atom<ITeam[]>([{
  

    name:"john",email:"princewillasotibe123@gmail.com",id:"",createdAt:new Date().toISOString(),permission:"edit"
   ,
}]);
export const authState = atomWithStorage<{user:IUser|null,token:string|null}|null>("auth",{
    user:
    null,
token:null
  

   ,
});
