import { useState, useEffect } from 'react';
import DataFetcher from '../DataFetcher';
import useQueryParams from '../../hooks/useQueryParams';
import QuizComponent from './QuizContainer';

export default function Quiz() {
  const query = useQueryParams();

  const resourceUrl = '';
  const resourceParams = {
    category: query.get('category'),
    amount: query.get('amount'),
    difficulty: query.get('difficulty'),
    type: query.get('type')
  };
  const resourceName = 'quiz';

  return (
    <DataFetcher resourceUrl={resourceUrl} resourceName={resourceName} resourceParams={resourceParams} httpClient="quiz">
      <QuizComponent />
    </DataFetcher>
  );
}
