import { useEffect, useState } from 'react';
import { Bars } from 'react-loader-spinner';

function Loading() {
  const [seconds, setSeconds] = useState<number | null>(null);

  useEffect(() => {
    const lastApiResponseMs = localStorage.getItem('lastApiResponseMs');

    if (!lastApiResponseMs) {
      setSeconds(null);
      return;
    }

    const currentMs = Date.now();

    const diff = currentMs - Number(lastApiResponseMs);
    const diffSeconds = Math.round(diff / 1000);

    setSeconds(diffSeconds);
  }, []);

  const FIVE_MINUTES = 60 * 5;
  const fiveMinutesPassed = !!seconds && seconds > FIVE_MINUTES;

  const apiSleepSuspected = !seconds || fiveMinutesPassed;

  return (
    <div className="my-auto flex flex-col items-center gap-5">
      <Bars color="#0681b4" />
      {apiSleepSuspected && (
        <div className="mt-6 text-center">
          <p className="text-xl">
            Please give our backend a few seconds to wake up...
          </p>
          <p className="mt-4 text-lg italic">
            {seconds
              ? 'It looks like you have not visited MERN Blog in a while.'
              : 'It looks like it might be your first time visiting MERN Blog.'}
          </p>
        </div>
      )}
    </div>
  );
}

export default Loading;
