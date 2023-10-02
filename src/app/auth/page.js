'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthPage = () => {

  const router = useRouter();


  //When the process is ready, it should be passed to the server side and not to the client side.
  useEffect(()=> {
    const p = 'https://app.hubspot.com/oauth/authorize';
    const clientID = '3eb02606-9b83-478a-9b55-a32c2e10ef58'; //.env
    const redirectPage = 'http://localhost:3000/redirect'; //.env
    const url = `${p}?client_id=${clientID}&scope=oauth&redirect_uri=${redirectPage}`;

    router.push(url);
  }, [])

  return null;
};

export default AuthPage;