import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Button,
  Grid,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  styled,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/CheckCircleOutline';
import WrongIcon from '@mui/icons-material/HighlightOff';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TableSimple from '../../TableSimple';

import { Question } from '../../../@types/quiz';
import { Column } from '../../../@types/table';

interface Props {
  questions: Question[];
  children?: React.ReactNode;
}

const ResultItemStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  marginBottom: 10,
}));

export default function ResultBreakdown(props: Props) {
  const navigate = useNavigate();
  const { questions, children } = props;

  const RenderBreakdown = () => {
    const headColumns: Column[] = [
      { data: 'Correct Answer', align: 'left' },
      { data: 'Your Answer', align: 'left' },
      { data: '', align: 'left' },
    ];
    const columns: Column[] = [
      { data: 'correctAnswer', align: 'left' },
      { data: 'userAnswer', align: 'left' },
      {
        data: (data) =>
          data.isCorrect ? (
            <Chip label="Correct" color="success" icon={<CheckIcon />} />
          ) : (
            <Chip label="Wrong" color="error" icon={<WrongIcon />} />
          ),
        align: 'left',
      },
    ];

    return <TableSimple headColumns={headColumns} columns={columns} rows={questions} />;
  };
  return (
    <Accordion sx={{ mb: 4 }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="h6" align="center">
          See correct/wrong answers.
        </Typography>
      </AccordionSummary>
      <AccordionDetails>{RenderBreakdown()}</AccordionDetails>
    </Accordion>
  );
}
