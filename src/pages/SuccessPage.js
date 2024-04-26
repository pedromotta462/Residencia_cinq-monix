import { createClient} from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useNavigate } from 'react-router-dom';
import React, { useEffect,useState } from 'react';

const supabase = createClient(
    "https://qdhftjyozijsqitjbhio.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkaGZ0anlvemlqc3FpdGpiaGlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE3NzA4ODUsImV4cCI6MjAyNzM0Njg4NX0.fsRF_RDiV8WOusVhPsNhxxAe1hO-jYs3kVyYA1dqMsU"
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