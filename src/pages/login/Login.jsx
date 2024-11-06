
import { useLocation, useParams } from "react-router-dom";
import { AdminLogin, CustomerLogin, DentistLogin, SelectUser } from "./components";
import { Register } from "./components/components";
import { useNavigate } from "react-router-dom";
import { auth,db } from "@/services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import useLoginContext from "@/hooks/useLoginConext";




const Login = () => {

	const { role } = useParams();
	const location=useLocation();
	const navigate=useNavigate();
	const isRegister = location.pathname.endsWith('/register');
	const {setLogInDetails}=useLoginContext();
	console.log("role",role)

	
	const signInWithUsername = async (currentRole,username, password) => {
    try {
        // Look up email by username in Firestore
        const usersRef = collection(db, currentRole); // Use the correct collection name
        const q = query(usersRef, where('username', '==', username)); // Create a query

        const querySnapshot = await getDocs(q); // Execute the query
        if (querySnapshot.empty) {
            toast.error('No user found with this username');
            return; // Exit the function if no user found
        }

        // Get the email from the matched username document
        const userDoc = querySnapshot.docs[0];
        const email = userDoc.data().email;

        // Authenticate using the email and password
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        
        // Get the user's role
        const loggedInRole = userDoc.data().role;
    

				// setLogInDetails({username:username,role:loggedInRole})
				sessionStorage.setItem('username',username);
				sessionStorage.setItem('role',loggedInRole)
        // Redirect based on role
        navigate(`/${loggedInRole}/dashboard`);

    } catch (error) {
        // Handle specific error messages
        if (error.code === 'auth/wrong-password') {
            toast.error('Incorrect password. Please try again.');
        } else if (error.code === 'auth/user-not-found') {
            toast.error('User not found. Please check your username.');
        } else {
            toast.error("Error signing in with username: " + error.message);
        }
        console.error("Error signing in with username:", error.message);
    }
	};

	const handleSubmit = (role,username, password) => {
		
		signInWithUsername(role,username,password)
	};

  return (
		<>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'column',
					rowGap: '1rem',
					height: '100%',
				}}
			>
				{!isRegister && <SelectUser />}
				{!isRegister && (
					<>
						{role === 'admin' && <AdminLogin handleSubmit={handleSubmit} />}
						{role === 'dentist' && <DentistLogin handleSubmit={handleSubmit} />}
						{role === 'customer' && (
							<CustomerLogin handleSubmit={handleSubmit} />
						)}
						
					</>
				) }
				{isRegister && role==="customer" && <Register formType="register"/>}
			</div>
		</>
	);
};

export default Login;
