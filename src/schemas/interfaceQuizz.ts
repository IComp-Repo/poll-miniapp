export interface Quiz {
    question: string;
    options: string[];
    correctOption: number;
}

export interface QuizGenerationInput {
    prompt: string;
}
