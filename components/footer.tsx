import { APPNAME } from "../const"
import Logo from "./logo"

export const Footer = ()=>{
    return <div className="bg-black text-white p-primarypad min-h-[400px]">
    <div className="flex  gap-5 max-md:flex-col  ">

        <div className="mr-20">
            <div className="flex items-center gap-2">

            <Logo width={20} height={20}/>
            <h1>{APPNAME}</h1>
            </div>
            <p className="text-[12px]">Subscribe to our developer newsletter</p>
            <p className="text-[12px]">Get tips, technical guides, and best practices. Twice a month.</p>
        </div>
{
    [
        [
            {title:"Resources",head:true,href:"",action:""},
            {title:"Pricing",href:"",action:""},
         
            {title:"Docs",href:"",action:""},
          
            {title:"Security",href:"",action:""},
          
            {title:"privacy policy",href:"",action:""},

            {title:"Terms of use",href:"",action:""},
           
        
        ],[
            {title:"Company",head:true,action:""},
            {title:"About",href:"",action:""},
            {title:"contact",href:"",action:""},

        ]
    ].map((e,index)=>{
        return <div key={index}>
{
    e.map((ee,indexx)=>{
        return <div key={indexx}>
{ee?.head?<h1 className="mb-5">

{ee.title}

</h1>:<p className="text-white/40">{ee.title}</p>}
            
        </div>
    })
}

        </div>
    })

}
    </div>
    <div>
        <p className="text-[10px]">
            © 2025 GitHub, Inc.
        </p>
    </div>
    </div>
}