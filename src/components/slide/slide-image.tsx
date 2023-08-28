import {SlideImageProps} from '@/src/props/slide-props';
import Image from 'next/image';
import '../../styles/slider-custome.css';
import Skeleton from '../loading/loadingSkeleton';

function Slide(params: SlideImageProps) {
	const {banner_title, image_src} = params;
	return (
		<div className='slide'>
			<Image
				src={image_src}
				alt={banner_title ? banner_title : ''}
				width={400}
				height={360}
				className='w-full h-auto object-cover'
			/>
		</div>
	);
}

const loading = () => {
	return (
		<div className='slide'>
			<Skeleton className='w-full h-full rounded-lg object-cover' />
		</div>
	);
};

Slide.loading = loading;

export default Slide;
