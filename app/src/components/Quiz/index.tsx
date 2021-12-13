import { useState, useEffect } from 'react';
import DataFetcher from '../DataFetcher';

interface Props {
    quiz?: any;
}

const QuizComponent = (props: Props) => {
    useEffect(() => {
        
    });
    return (
        <>
            <p>QuizCompo</p>
            <p>{JSON.stringify(props.quiz)}</p>
        </>
    );
}

export default function Quiz () {
    const resourceUrl = '/quiz-schedule?quizSetItemId=18';
    const resourceParams = '';
    const resourceName = 'quiz';

    return (
        <DataFetcher resourceUrl={resourceUrl} resourceName={resourceName} resourceParams={resourceParams}>
            <QuizComponent />
        </DataFetcher>
    )
}