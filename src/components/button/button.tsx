import {ButtonProps} from '@/src/props/button-props';
import {LoadingOutlined} from '@ant-design/icons';
import React from 'react';
import '../../styles/button.css';

function Button(params: ButtonProps) {
	const {children, primary, outline, rounded, onClick, className, active, disabled, isHandling, link, id} = params;
	return (
		<button
			id={id}
			onClick={onClick}
			className={`btn-style ${outline ? 'btn-outline' : ''}  ${primary ? 'btn-primary' : ''}  ${
				rounded ? 'btn-rounded' : ''
			} ${active ? 'active' : ''}  ${link ? 'btn-link' : ''} ${disabled ? 'disabled' : ''} ${className}`}
		>
			{children}
			{isHandling && (
				<div className='flex items-center justify-center ml-2'>
					<LoadingOutlined />
				</div>
			)}
		</button>
	);
}

export default React.memo(Button);
