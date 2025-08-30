
import Link from "next/link"
import Logo from "./logo"
import { MenuIcon } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
export interface INavbar{
    logowidth?:number
    logoheight?:number
    px?:string
    border?:any|null
}
const  Navbar = ({logoheight=40,logowidth=40,px="primarypad",border=1}:INavbar={})=>{
console.log(border)
const links = [
    {alias:"Pricing",href:"/pricing",},{alis:"contact",href:""},{alias:"Documetation",href:""}
]

    return  <div className={`w-full  flex flex-col items-center `}>
    <div className={`w-full   px-${px}  items-center  h-[53px] flex flex-row `}>
        <div className="flex items-center gap-5 ">
            <div className="min-md:hidden">
<Sheet>
        <SheetTrigger asChild>
              <MenuIcon className=""/>
          {/* <Button variant="outline">Open Menu</Button> */}
        </SheetTrigger>
        <SheetContent side="left" className="w-1/2 h-full">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <div className="mt-4 px-5 flex flex-col gap-4">
                {
                links.map((e:any,index:number)=>{
                    return <div className="hover:text-primary" key={index}>{e.alias}</div>
                })
            }
            {/* <a href="#" className="hover:text-primary">Home</a>
            <a href="#" className="hover:text-primary">About</a>
            <a href="#" className="hover:text-primary">Services</a>
            <a href="#" className="hover:text-primary">Contact</a> */}
          </div>
        </SheetContent>
      </Sheet>
                {/* <DropdownMenu  >
      <DropdownMenuTrigger className="px-4 py-2 bg-black text-white rounded-md">
       <MenuIcon className=""/>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu> */}
            </div>

        <Logo {...{width:logowidth ,height:logoheight}} />
        <div className="max-md:hidden   flex items-center h-full gap-3">
            {
                links.map((e:any,index:number)=>{
                    return <div key={index}>{e.alias}</div>
                })
            }
        </div>
        </div>
        <div className="flex items-center gap-3 ml-auto">
<Link href="/e">
log in
</Link>
<Link className="border rounded-md p-3 py-0.5 hover:text-primary hover:border-primay" href="">
sign up
</Link>
        </div>
        



    </div>
    <hr className="text-white  w-full mt-2"/>
    </div>
}

export default Navbar