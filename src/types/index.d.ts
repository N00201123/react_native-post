export interface MyAuthContext {
    signIn: (token: string) => void;
    signOut: () => void;
    session?: string | null
    isLoading: boolean;

}

export interface LoginFormType {
    email?: string,
    password?: string;
}

export interface PlatformType {
    name: string;
    description: string;
}

export interface PostType {
    title: string;
    description: string;
    platform: string;
    user: string;
    likes: string;
    date: date;
    tags: string;
}