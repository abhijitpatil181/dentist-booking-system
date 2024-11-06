import "@/components/button/button.css";

export default function Button({ children, onClick=()=>{}, style, className,buttonType}) {
	return (
		<>
			<button
				className={`reusable-button ${className}`}
				onClick={onClick}
				style={style}
				type={buttonType}
				disabled={false}
			>
				{children}
			</button>
		</>
	);
}


