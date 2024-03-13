'use client'
import { StoreContext } from "./Store";
import { useState } from "react";



const ProviderWrapper = ({children}: {children: React.ReactNode}) => {

    const [profileMenuBar, setProfileMenuBar] = useState<boolean>(false);
    const [profileMenuBarAnim, setProfileMenuBarAnim] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);


    return (
       <StoreContext.Provider value={{success, setSuccess, profileMenuBar, setProfileMenuBar, profileMenuBarAnim, setProfileMenuBarAnim}}>
            {children}
       </StoreContext.Provider>
    )
}

export default ProviderWrapper;