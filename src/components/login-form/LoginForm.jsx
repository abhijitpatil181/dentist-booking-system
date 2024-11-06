import "@/components/login-form/loginForm.css"
import Button from "../button/Button";
import TextField from "../textfield/TextField";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";


const LoginForm=({handleSubmit})=>{	
	const [username, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const {role:selectedRole}=useParams();


	const onChangeHandler = (label, value) => {
		switch (label) {
			case 'username':
				setUserName(value);
				break;

			case 'password':
				setPassword(value);
				break;

			default:
				console.log('no matched');
		}
	};

	const onSubmitHandler=(e)=>{
		e.preventDefault();
		handleSubmit(selectedRole,username, password);

	}

  return (
		<>
			<form
				onSubmit={onSubmitHandler}
				style={{
					borderRadius: '0.5rem',
					border: '1px solid black',
					width: '20vw',
					minHeight: '35vh',
					padding: '1.5rem',
				}}
			>
				<div className="form-container">
					<h3 style={{ fontWeight: 400, textAlign: 'center' }}>Logo</h3>
					<TextField
						label="Username"
						value={username}
						onChange={e => onChangeHandler('username', e.target.value)}
						required={true}
					/>
					<TextField
						label="Password"
						value={password}
						onChange={e => onChangeHandler('password', e.target.value)}
						required={true}
					/>
					<Button
						style={{
							width: '100%',
							fontSize: '1rem',
							border: 'none',
							borderRadius: '0.5rem',
							padding: '0.5rem 1rem',
						}}
						className="custom-class"
						buttonType={'submit'}
					>
						Login
					</Button>
					{
						<div style={{display:'flex', justifyContent:'space-between'}}>
							<Link to={''}>Forgot Password</Link>

							{selectedRole ==="customer" &&<Link to={`${selectedRole}/register`}>sign up</Link>}
						</div>
					}
				</div>
			</form>
		</>
	);
}

export default LoginForm;