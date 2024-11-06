import "@/pages/login/components/components/register/selectGender.css"


const SelectGender=({gender,handleGenderChange})=>{
  return (
		<>
			<div style={{ width: 'calc(50% - 1rem)',display: 'flex', flexDirection:'column' ,rowGap:'0.5rem'}}>
				<label className="text-field-label">Gender:</label>
				<div style={{ display: 'flex', alignItems: 'center',columnGap:'3rem' }} >
					<label>
						<input
							type="radio"
							value="male"
							checked={gender === 'male'}
							onChange={e => handleGenderChange(e.target.value)}
							style={{ marginRight: '0.5rem', transform: 'scale(1.3)' }}
							required={true}
						/>
						Male
					</label>
					<label>
						<input
							type="radio"
							value="female"
							checked={gender === 'female'}
							onChange={e => handleGenderChange(e.target.value)}
							style={{ marginRight: '0.5rem', transform: 'scale(1.3)' }}
						/>
						Female
					</label>
				</div>
			</div>
		</>
	);
}

export default SelectGender;