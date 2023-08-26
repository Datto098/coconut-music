import '../../styles/custome.css';
export default function Skeleton(params: any) {
	const {className} = params;
	return <div className={`${className} skeleton`}></div>;
}
