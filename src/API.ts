import { stringify } from "querystring";
import QuestionCard from "./components/QuestionCard";
import {shuffleArray}  from './utils'

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}

export type QuestionState = Question & { answers: string[] }; // this uses the types from question and add the answer.

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export const fetchQuizQuestions = async (amount: number, difficulty: Difficulty) => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`
  const data = await (await fetch(endpoint)).json() // same as doing in two lines
  console.log(data)
  return data.results.map((question: Question) => (
    {
      ...question,
      answer: shuffleArray([...question.incorrect_answers, question.correct_answer]),
    }
  ))
} 