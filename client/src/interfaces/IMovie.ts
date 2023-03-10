export interface IMovie {
    _id: string;
    title: string;
    desc: string;
    img: string;
    imgTitle: string;
    imgSm: string;
    trailer: string;
    video: string;
    year: string;
    limit: number;
    genre: string;
    isSeries: boolean;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}