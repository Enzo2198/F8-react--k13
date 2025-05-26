import { QuizProvider } from "./context/QuizContext.tsx";
import Quiz from "./component/Quiz.tsx";
import {CssBaseline, Container, Paper, Box} from "@mui/material";

export default function QuizApp() {
  return (
    <QuizProvider>
      <CssBaseline />
      <Box sx={{background: '#B8E2FA', minHeight: '100vh', width: '100vw', overflow: 'hidden'}}>
        <Container maxWidth="md">
          <Box mt={4}>
            <Paper elevation={3} sx={{ padding: 4, background: '#6687C7' }}>
              <Quiz />
            </Paper>
          </Box>
        </Container>
      </Box>

    </QuizProvider>
  )
}