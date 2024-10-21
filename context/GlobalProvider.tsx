import { getCurrentUser } from "@/lib/appwrite";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  PropsWithChildren,
} from "react";

const GlobalContext = createContext<GlobalProps>({
  isLoggedIn: false,
  user: null,
  isLoading: false
});

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }: PropsWithChildren) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    getCurrentUser()
      .then((res: any) => {
        if (res) {
          setIsLoggedIn(true);
          setUser(res);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        isLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};


export default GlobalProvider;