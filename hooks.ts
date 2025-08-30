import toast from "react-hot-toast";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { authState, IUser } from "@/states";
export const useFetch = () => {
 const router = useRouter();
  let apifetch = async ({
    url,
    options,
    auth = false,
    authToast,
    reqdata,
  }: {
    url: string;
    options?: any;
    auth?: boolean;
    authToast?: string | undefined | null;
    reqdata?: boolean;
  }) => {
    let token = localStorage.getItem("findtech_user_token") || "";

    let response: any = await fetch(url, {
      credentials: "include",
      ...options,
      headers: {
        "Content-Type": "application/json",

        authorization: `Bearer ${token}`,

        ...(options?.headers || {}),
      },
    });
    let data: any = {};
    try {
      data = await response.json();
    } catch (e) {}
    if (reqdata) {
      response.responseData = data;
      return response;
    }
    if (data?.auth && auth) {
      toast(authToast || "Please login to continue", {
        icon: "⚠️",
      });
    }
    if (data?.auth && auth) {
      router.push("/login");
    }
    return data;
  };

  return { apifetch };
};

export const  useMediawQuery = (useMediaQuery:any)=>( {
     isMobileMicroDevice: useMediaQuery({
        query: "(max-device-width: 250px)",
      }),
     isMobileMicroPlusDevice: useMediaQuery({
        query: "(max-device-width: 290px)",
      }),
     isMobileMiniDevice: useMediaQuery({
        query: "(max-device-width: 350px)",
      }),
     isMobileMiniPlusDevice: useMediaQuery({
        query: "(max-device-width: 390px)",
      }),
     isMobileDevice: useMediaQuery({
        query: "(max-device-width: 480px)",
      }),
    
     isMobileDevicePlus: useMediaQuery({
        query: "(max-device-width: 550px)",
      }),
    
       isTabletDevice: useMediaQuery({
        query: "(max-device-width: 768px)",
      }),
       isTabletPlusDevice: useMediaQuery({
        query: "(max-device-width: 900px)",
      }),
  
       isLaptop : useMediaQuery({
        query: "(max-device-width: 1024px)",
    }),
    
     isDesktop :useMediaQuery({
        query: "(max-device-width: 1200px)",
      })
    
      , isBigScreen: useMediaQuery({
        query: "(max-device-width: 1201px )",
      })
})

export const useAuth=()=>{

  const [session, setSession] = useAtom(authState);

const login =({user,token}:{user:IUser,token:string})=>{

  setSession({user,token})

}
const updateUser =({user}:{user:IUser})=>{

  setSession((prev :any)=>{

    return {...prev,user:{...(prev||{}).user,...user}}


  })

}
const logout =()=>{

  setSession(null)

}


return {logout,updateUser,login,session,isAuthenticated:session?.user && session?.token}

}


