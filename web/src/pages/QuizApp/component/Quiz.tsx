import { useQuiz } from "../context/QuizContext";
import { questions } from "../data/questions";
import { Button, Box, Typography, Card, CardContent, Stack, Container} from "@mui/material";

export default function Quiz() {
  const { state, dispatch } = useQuiz();
  const question = questions[state.currentQuestion];

  const handleSelect = (option: string) => {
    if (!state.showAnswer) {
      dispatch({ type: "SELECT_OPTION", payload: option });
    }
  };

  const getOptionColor = (option: string): string => {
    if (!state.showAnswer) {
      return option === state.selectedOption ? "lightblue" : "white";
    }
    if (option === question.answer) return "lightgreen";
    if (option === state.selectedOption) return "salmon";
    return "white";
  };

  return (
    <Container>
      {state.isFinished ? (
        <Box textAlign="center" mt={5}>
          <Card>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                Kết quả
              </Typography>
              <Typography variant="h6" gutterBottom>
                Bạn đạt {state.score} / {questions.length} điểm
              </Typography>
              <Button variant="contained" onClick={() => dispatch({ type: "RESTART" })}>
                Làm lại
              </Button>
            </CardContent>
          </Card>
        </Box>
      ) : (
        <Card sx={{ mt: 5 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Câu {state.currentQuestion + 1}: {question.question}
            </Typography>
            <Stack spacing={1} mt={2}>
              {question.options.map((option) => (
                <Button
                  key={option}
                  variant="outlined"
                  fullWidth
                  sx={{ backgroundColor: getOptionColor(option) }}
                  onClick={() => handleSelect(option)}
                  disabled={state.showAnswer}
                >
                  {option}
                </Button>
              ))}
            </Stack>
            {state.showAnswer && (
              <Box mt={2} textAlign="right">
                <Button variant="contained" onClick={() => dispatch({ type: "NEXT_QUESTION" })}>
                  Câu tiếp theo
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
      )}
    </Container>
  );
};
