import React, { createContext, useReducer, useContext, ReactNode } from "react";
import { questions } from "../data/questions";
import { QuizState, QuizContextProps, QuizAction } from "../../../utils";

const QuizContext = createContext<QuizContextProps | undefined>(undefined);

const initialState: QuizState = {
  currentQuestion: 0,
  score: 0,
  selectedOption: null,
  showAnswer: false,
  isFinished: false,
};

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "SELECT_OPTION": {
      const isCorrect = action.payload === questions[state.currentQuestion].answer;
      return {
        ...state,
        selectedOption: action.payload,
        showAnswer: true,
        score: isCorrect ? state.score + 1 : state.score,
      };
    }
    case "NEXT_QUESTION": {
      const nextIndex = state.currentQuestion + 1;
      if (nextIndex >= questions.length) {
        return { ...state, isFinished: true };
      }
      return {
        ...state,
        currentQuestion: nextIndex,
        selectedOption: null,
        showAnswer: false,
      };
    }
    case "RESTART":
      return initialState;
    default:
      return state;
  }
}

interface QuizProviderProps {
  children: ReactNode;
}

export const QuizProvider: React.FC<QuizProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = (): QuizContextProps => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
};
