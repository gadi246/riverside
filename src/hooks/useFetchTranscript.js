import { useEffect, useState } from 'react';
import axios from 'axios';

const transcriptUrl =
  'https://riversidefm.s3.amazonaws.com/public/assignments/gadi/composer-0j89xxpra.json';

const useFetchTranscript = () => {
  const [transcript, setTranscript] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(transcriptUrl)
      .then(({ data }) => {
        setTranscript(data);
      })
      .catch(e => {
        setError(true);
        console.error(e);
      });
  }, [setTranscript]);
  return { transcript, error };
};

export default useFetchTranscript;
