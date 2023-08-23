import InputProps from '@/props/input-props';
import '../../styles/input.css';
import React from 'react';
function Input(props: InputProps) {
	const {id, className, value, onChange, placeholder, labelContent, type} = props;

	return (
		<label
			htmlFor={id}
			className={`${className} label-wrapper`}
		>
			<span className={`${labelContent ? 'mb-2 ml-2' : ''} block text-[var(--text-primary)]`}>{labelContent}</span>
			<div className='box'>
				<input
					id={id}
					type={type}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
					className='field-style'
				/>
			</div>
		</label>
	);
}
export default React.memo(Input);
