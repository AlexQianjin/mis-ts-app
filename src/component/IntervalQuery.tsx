import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

import LinearProgressWithLabel from './LinearProgressWithLabel';

interface Uuid {
  uuid: string;
}

const IntervalQuery = () => {
  const [isStop, setIsStop] = useState(false);
  const { isLoading, isError, data, error } = useQuery<Uuid, Error>(
    'intervalQuery',
    async () => {
      const { data } = await axios.get('https://httpbin.org/uuid');
      console.log(data, 13);

      return data;
    },
    {
      refetchInterval: isStop ? false : 5 * 1000,
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        if (Number(data.uuid[0]) > 5) {
          console.log('stop interval', 22);
          setIsStop(true);
        }
      }
    }
  );

  if (isLoading) {
    const loadingProps = { label: 'Loading...', progress: 5 };

    return <LinearProgressWithLabel {...loadingProps} />;
  }

  if (isError) {
    return <div>{error && error.message}</div>;
  }

  const loadingProps = { label: data?.uuid || 'Loading...', progress: 5 };

  return <LinearProgressWithLabel {...loadingProps} />;
};

export default IntervalQuery;
