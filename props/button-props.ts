export interface ButtonProps {
	children: any;
	primary?: boolean;
	outline?: boolean;
	rounded?: boolean;
	active?: boolean;
	className?: string;
	disabled?: boolean;
	isHandling?: boolean;
	link?: boolean;
	id?: string;
	onClick?: () => void;
}
