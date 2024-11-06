import "@/components/textfield/textField.css"

export default function TextField({
	label,
	type = 'text',
	value,
	onChange,
	placeholder = '',
	style={},
	className = '',
	required=false,
	...props
}) {
	return (
		<>
			<div className={`text-field-container ${className}`} style={style}>
				{label && <label className="text-field-label">{label}</label>}
				<input
					type={type}
					value={value}
					onChange={onChange}
					placeholder={placeholder}
					className="text-field-input"
					required={required}
					{...props}
				/>
			</div>
		</>
	);
}