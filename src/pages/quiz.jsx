import { useState, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import useCountStore from '../store/CountStore';
import useSettingStore from '../store/SettingStore';
import config from '../config';
import EmojiSelector from '../components/emoji-selector';
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
  const navigate = useNavigate();
  const emojiCount = useCountStore((state) => state.emojiCount);
  const flipLimit = useSettingStore((state) => state.flipLimit);
  const emojiArray = useCountStore((state) => state.emojiArray);
  const reset = useCountStore((state) => state.reset);

  const [activeStep, setActiveStep] = useState(0);
  const [randomNumbers, setRandomNumbers] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleRestart = useCallback(() => {
    const genNumbers = (count, limit) => {
      const uniqueNumbers = new Set();
      while (uniqueNumbers.size < count) {
        uniqueNumbers.add(Math.floor(Math.random() * limit) + 1);
      }
      return Array.from(uniqueNumbers);
    };

    setRandomNumbers(genNumbers(config.questionCount, flipLimit));
    setAnswers(Array(config.questionCount).fill(null));
    setActiveStep(0);
    setScore(0);
  }, [flipLimit]);

  const handleRestartGame = () => {
    reset();
    navigate('/play');
  };

  const handleNextLevel = () => {
    reset();
    navigate('/play');
  };

  const handleEmojiSelect = (flipIndex, emoji) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[flipIndex] = emoji;
      return updatedAnswers;
    });
  };

  useEffect(() => {
    handleRestart();
  }, [handleRestart]);

  useEffect(() => {
    if (activeStep === randomNumbers.length) {
      answers.map((answer, index) => {
        if (emojiArray[randomNumbers[index] - 1] === answer) {
          setScore((prevScore) => prevScore + 1);
        }
      });
    }
  }, [activeStep, answers, emojiArray, randomNumbers]);

  return (
    <Box className='w-full'>
      <h1 className='text-3xl text-white'>Questions</h1>
      {activeStep !== randomNumbers.length && (
        <Stepper
          sx={{
            marginTop: '20px',
            padding: '20px',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            borderRadius: '10px',
          }}
          activeStep={activeStep}
          orientation='vertical'
        >
          {randomNumbers.map((number, index) => (
            <Step key={number + '_' + index}>
              <StepLabel>Question {index + 1}</StepLabel>
              <StepContent>
                <Typography sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                  When the dice has flipped{' '}
                  <span className='text-red-500'>{number}</span> of times, which
                  emoji did it land on?
                </Typography>
                <EmojiSelector
                  emojiCount={emojiCount}
                  selectedEmoji={answers[index]}
                  onEmojiSelect={(emoji) => handleEmojiSelect(index, emoji)}
                />
                <Box sx={{ mb: 2 }}>
                  <Button
                    variant='contained'
                    disabled={answers[index] === null}
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === randomNumbers.length - 1 ? 'Finish' : 'Continue'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      )}
      {activeStep === randomNumbers.length && (
        <Paper
          square
          elevation={0}
          sx={{
            marginTop: '20px',
            padding: '20px',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            borderRadius: '10px',
          }}
        >
          <Typography>
            All questions are answered - you&apos;re finished
          </Typography>
          <Typography>
            You matched <span className='text-red-500 font-bold'>{score}</span> of{' '}
            <span className='text-red-500'>{randomNumbers.length}</span> emojis
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Button
              variant='contained'
              onClick={handleRestart}
              sx={{ mt: 1, mr: 1 }}
            >
              Restart Quiz
            </Button>
            <Button
              variant='contained'
              onClick={handleRestartGame}
              sx={{ mt: 1, mr: 1 }}
            >
              Restart Game
            </Button>
            <Button
              disabled={score !== randomNumbers.length}
              variant='contained'
              onClick={handleNextLevel}
              sx={{ mt: 1, mr: 1 }}
            >
              Next Level
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default Quiz;
