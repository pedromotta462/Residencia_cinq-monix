 import { createClient} from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useNavigate } from 'react-router-dom';

const supabase = createClient(
    "https://qdhftjyozijsqitjbhio.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkaGZ0anlvemlqc3FpdGpiaGlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE3NzA4ODUsImV4cCI6MjAyNzM0Njg4NX0.fsRF_RDiV8WOusVhPsNhxxAe1hO-jYs3kVyYA1dqMsU"
);

function Login() {
    const navigate = useNavigate();

        supabase.auth.onAuthStateChange(async (event) => {
        if (event !== "SIGNED_OUT") {
            // forward to sucess URL
            navigate("/");
        } else {
            // forward to localhost:3000
            navigate("/sucess");
        }
    });

    return (
      <div className="App">
        <header className="App-header">
            <Auth
                supabaseClient={supabase}
                appearance={{ theme: ThemeSupa }}
                theme="Blue"
                providers={["google"]}
            />
        </header>
      </div>
    );
  }
  
  export default Login;