import Image from 'next/image';

export default function NotFoundPage() {
	return (
		<div className='w-full h-[100vh] flex items-center justify-center'>
			<Image
				className='w-[400px] h-[400px]'
				width={100}
				height={100}
				src='/coconut-mp3-404-white.svg'
				alt='404 Not Found'
			/>
		</div>
	);
}
