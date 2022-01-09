import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardContent, Button } from "@mui/material";
import TableSimple from "../TableSimple";
import { quizHttp } from "../../utils/axios";
import { Column } from "../../@types/table";

interface Quiz {
  id: number;
  category: string;
  correctAnswer: string;
}

interface Query {
  qId?: number;
  title?: string;
  category: number;
  amount: number;
  difficulty: string;
  type: string;
}

const amount = 10;
const difficulty = "medium";
const type = "multiple";

export default function QuizList() {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [queries, setQueries] = useState<Query[]>([]);

  const memoizedQuizzes = useMemo(() => {
    const responses = queries.map(async (query) => {
      const params = { ...query };
      delete params.qId;
      delete params.title;
      const response = await quizHttp.get("", { params });
      if (!response.data) {
        return;
      }

      if (response.data < 0) {
        return;
      }

      return response.data.results;
    });

    return Promise.all(responses);
  }, [queries]);

  useEffect(() => {
    setQueries([
      {
        qId: 0,
        title: "General Knowledge",
        category: 9,
        amount,
        difficulty,
        type,
      },
      {
        qId: 1,
        title: "Entertainment: Books",
        category: 10,
        amount,
        difficulty,
        type,
      },
      {
        qId: 2,
        title: "Entertainment: Films",
        category: 11,
        amount,
        difficulty,
        type,
      },
      {
        qId: 3,
        title: "Entertainment: Music & Theater",
        category: 12,
        amount,
        difficulty,
        type,
      },
      {
        qId: 4,
        title: "Entertainment: Television",
        category: 13,
        amount,
        difficulty,
        type,
      },
      {
        qId: 5,
        title: "Science: Computers",
        category: 18,
        amount,
        difficulty,
        type,
      },
      {
        qId: 6,
        title: "Animals",
        category: 27,
        amount,
        difficulty,
        type,
      },
    ]);
  }, []);

  useEffect(() => {
    memoizedQuizzes.then((val: any) => {
      setQuizzes(val);
    });
  }, [memoizedQuizzes]);

  const headColumns: Column[] = [
    { data: "Title", align: "left" },
    { data: "Items", align: "right" },
    { data: "", align: "right" },
  ];

  const columns: Column[] = [
    { data: "title", align: "left" },
    { data: "amount", align: "right" },
    {
      data: (row: any) => (
        <Button size="small" variant="contained" onClick={openQuiz(row)}>
          Open
        </Button>
      ),
      align: "right",
    },
  ];

  const openQuiz =
    ({ category, amount, difficulty, type }: Query) =>
    () => {
      navigate(
        `/app/quiz?category=${category}&amount=${amount}&difficulty=${difficulty}&type=${type}`
      );
    };

  return (
    <Card>
      <CardHeader title="Quiz List" />
      <CardContent>
        <TableSimple
          headColumns={headColumns}
          columns={columns}
          rows={queries}
          rowId="qId"
        />
      </CardContent>
    </Card>
  );
}
