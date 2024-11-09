import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const { loading, login } = useLogin();
	const [showDialog, setShowDialog] = useState(false); // Control the dialog visibility

	const handleSubmit = async (e) => {
		e.preventDefault();
		await login(username, password); // Trigger the login process
	};

	// Function to show the dialog and auto-fill the form for guest login
	const handleGuestLogin = () => {
		setUsername("guest01"); // Auto-fill the username field
		setPassword("123456"); // Auto-fill the password field
		login("guest01", "123456"); // Automatically log in as guest (this submits the form)
	};

	// Function to close the dialog box
	const closeDialog = () => {
		setShowDialog(false); // Close the dialog box
	};

	// Toggle the guest info dialog box
	const openDialog = () => {
		setShowDialog(true); // Open the dialog box
	};

	return (
		<div className="flex flex-col items-center justify-center min-w-96 mx-auto">
			<div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
				<h1 className="text-3xl font-semibold text-center text-gray-300">
					Login
					<span className="text-blue-500"> Talk-A-Little</span>
				</h1>

				<form onSubmit={handleSubmit}>
					<div>
						<label className="label p-2">
							<span className="text-base label-text">Username</span>
						</label>
						<input
							type="text"
							placeholder="Enter username"
							className="w-full input input-bordered h-10"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>

					<div>
						<label className="label">
							<span className="text-base label-text">Password</span>
						</label>
						<input
							type="password"
							placeholder="Enter Password"
							className="w-full input input-bordered h-10"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>

					<Link to="/signup" className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">
						{"Don't"} have an account?
					</Link>

					<div>
						<button className="btn btn-block btn-sm mt-2" disabled={loading}>
							{loading ? <span className="loading loading-spinner"></span> : "Login"}
						</button>
					</div>
				</form>

				{/* Button for guest login */}
				<div className="mt-4">
					<button
						className="btn btn-block btn-sm mt-2 bg-gray-600 text-white"
						onClick={handleGuestLogin} // Trigger auto-login for guest
					>
						Login as Guest
					</button>
				</div>

				{/* Dialog Box */}
				{/* <div className="mt-4">
					<button
						className="btn btn-sm text-blue-500"
						onClick={openDialog} // Show guest login info
					>
						Show Guest Info
					</button>
				</div> */}
			</div>

			{/* Dialog Box for guest credentials */}
			{showDialog && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
					<div className="bg-white p-6 rounded-lg w-96">
						<h2 className="text-xl font-semibold text-center">Guest Login Information</h2>
						<div className="mt-4">
							<p><strong>Username:</strong> guest01</p>
							<p><strong>Password:</strong> 123456</p>
						</div>
						<div className="mt-4 flex justify-center">
							<button
								className="btn btn-sm btn-secondary"
								onClick={closeDialog} // Close the dialog box
							>
								Close
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Login;
