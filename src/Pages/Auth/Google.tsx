import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const Google = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const state = searchParams.get('state');
    const code = searchParams.get('code');

    if (!state || !code) {
      return;
    }

    const verifyAccount = async () => {
      try {
        const response = await axios.post(
          import.meta.env.VITE_API_URL + '/api/v1/auth/google',
          { state, code }
        );
        console.log(response.data);
        if (response.data.status_code == 200) {
          localStorage.setItem('token', response.data.payload.token);
          navigate('/');
        }
      } catch (error) {
        console.error(error);
      }
    };

    verifyAccount();
  }, [navigate, searchParams]);

  return <div></div>;
};

export default Google;
