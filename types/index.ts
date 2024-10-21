declare interface SignUpProps {
    username: string;
    email: string;
    password: string;
  }
declare interface SignInProps {
    email: string;
    password: string;
  }

declare interface UserProps {
    $id: string;
    username: string;
    email: string;
    accountId: string;
    avatar: string
  }
declare interface GlobalProps {
    isLoggedIn: boolean;
    setIsLoggedIn?: React.Dispatch<React.SetStateAction<boolean>>;
    user: UserProps | null;
    setUser?: React.Dispatch<React.SetStateAction<null>>;
    isLoading: boolean
  }

  declare interface EmptyStateProps {
    title: string;
    subtitle: string;
    btnName: string;
    handlePress: () => void;
  }
  declare interface VideoCardProps {
    title: string 
    thumbnail: string 
    video: string
    creator: {
      username: string;
      email: string;
      accountId: string;
      avatar: string
    }
  }
  declare interface InfoBoxProps {
    title?: string | number
    subtitle?: string 
    containerStyles?: string
    titleStyles?: string
  }