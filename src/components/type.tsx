export interface cardvalue {
    id: number;
    name: string;
    totalPrice: string;
    entryFee: number;
    image: string;
    category_id: number;
    live: number;
}

export interface category {
    id: number;
    name: string;
    image: string;
  }


 export interface Question {
    _id: string;
    question: string;
    answer: string[];
    correct: string;
    coins: string;
    quiz?: object;
    chooseanswer?: string;
    audience?: string[]
}