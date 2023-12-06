export interface BooksDTO {
    items: Book[];
    totalBooks: number;
}

export interface Book {
    volumeInfo: VolumeInfo
}

export interface VolumeInfo {
    title: string;
    authors: string[];
    publisher: string;
    publishedDate: string;
    description: string;
    pageCount: number;
    printType: string;
    mainCategory: string;
    categories: any[];
    averageRating: number;
    ratingsCount:  number;
    contentVersion:  string;
    imageLinks: ImageLinks;
    language:  string;
    infoLink: string;
    canonicalVolumeLink: string;
}

export interface ImageLinks {
    smallThumbnail: string;
    thumbnail: string;
    small: string;
    medium: string;
    large: string;
    extraLarge: string;
}