import { useEffect,useState,useContext,createContext } from "react";
const AuthContext=createContext(null);
export const AuthProvider=(props)=>{
    const [user,setUser]=useState(null);
    const [token,setToken]=useState(null);
    const [isLoading,setIsLoading]=useState(true);
    const [isAuthenticated,setIsAuthenticated]=useState(false);
    useEffect(()=>{
         const storedToken=localStorage.getItem('authToken');
         const storedUser=localStorage.getItem('user')
         if(storedToken && storedUser){
            setToken(storedToken);
            setIsAuthenticated(true)
            try {
             setUser(JSON.parse(storedUser));
             } catch {
            setUser(null);
             }
         }
         setIsLoading(false);
    
        },[])
const login=async(email,password)=>{
   
    try{
        setIsLoading(true);
        const response=await fetch('/api/auth/login',{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({email,password})
        })
        // const data=await response.json();
        if (!response.ok) {
  throw new Error("Server error"); 
}

const data = await response.json();


        if(!data.success){
            throw new Error(data.message||'Login failed')
        }
        setToken(data.token);
        setUser(data.user);
        setIsAuthenticated(true);

        localStorage.setItem('authToken',data.token);
        localStorage.setItem('user',JSON.stringify(data.user))
        return data;


    }catch(error){
        setIsAuthenticated(false);
        throw error
    }finally{
        setIsLoading(false)
    }

}
const logout=()=>{
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    console.log("User logout successfully")
}

const checkAuth=()=>{
    return isAuthenticated && !!token;

}

const value={
    user,
    token,
    isLoading,
    isAuthenticated,
    checkAuth,
    login,
    logout
}

return (
    <AuthContext.Provider value={value}>
        {props.children}
    </AuthContext.Provider>
)


}

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  
  return context;
};