import { createClient} from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useNavigate } from 'react-router-dom';
import React, { useEffect,useState } from 'react';

const supabase = createClient(
  "https://nbabichutvzptjaozrkl.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5iYWJpY2h1dHZ6cHRqYW96cmtsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIxODYwMDQsImV4cCI6MjAyNzc2MjAwNH0.O6-ogr3wfgwJ_rJXt27O9fYPD95ISLmUsrPgRDNUtzM"
);

function Success() {
  const { user, setUser} = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function getUserData() {
      await supabase.auth.getUser().then((value) => {
        
        // value.data.user
        if(value.data?.user){
          console.log(value.data.user);
          setUser(value.data.user);
        }
      }) 
    }
    getUserData();
  }, []);

  async function signOutUser(){
      const { error } = await supabase.auth.signOut();
      navigate("/");
  }

    return (
      <div className="App">
        <header className="App-header">
          {Object.keys(user).length !== 0 ?
            <>
                <h1>Sucess</h1>
                <button onClick={() => signOutUser()}> Sign Out </button>
            </>
            :
            <>
              <h1>User is not logged in</h1>
              <button onClick={() => { navigate("/") }}> Go back home!</button>
            </>
          }
        </header>
      </div>
    );
  }
  
  export default Success;