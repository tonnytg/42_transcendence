

// creatting a button component
export default function Button({ children, onClick }) {
	return (
		<button onClick={onClick} className="btn btn-lg btn-light fw-bold border-white bg-white mt-16">
			{children}
		</button>
	);
}

