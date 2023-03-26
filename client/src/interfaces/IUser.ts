export interface IUser {
    _id: string;
    username: string;
    email: string;
    profilePic: string;
    isAdmin: boolean;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    accessToken: string;
}

export interface IUserLogin {
    email: string;
    password: string;
}