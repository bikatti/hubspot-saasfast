'use client';

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const CallBack = () => {

    const searchParams = useSearchParams();

    const code = searchParams.get('code')

    useEffect(() => {
      console.log(code)
      if(code){
        const fetchData = async () => {
          const responseToken = await fetch(`/api/hs?code=${code}`);
          const l = await responseToken.json();
          console.log(l);
        }

        fetchData();
      }
    }, []);

    return <div>Autenticando...</div>;
}

export default CallBack;