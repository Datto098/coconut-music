export const settingsSliderImage = {
	dots: false,
	infinite: true,
	slidesToShow: 3,
	slidesToScroll: 1,
	initialSlide: 0,
	arrows: false,
	autoplay: true,
	speed: 1000,
	autoplaySpeed: 2000,
	cssEase: 'linear',
	responsive: [
		{
			breakpoint: 1024,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2,
				infinite: true,
			},
		},
		{
			breakpoint: 600,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2,
				initialSlide: 2,
			},
		},

		{
			breakpoint: 580,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
			},
		},
	],
};

export const settingsSliderMusic = {
	dots: false,
	infinite: false,
	slidesToShow: 12,
	slidesToScroll: 12,
	initialSlide: 0,
	arrows: false,
	speed: 1000,
	cssEase: 'linear',
	responsive: [
		{
			breakpoint: 1600,
			settings: {
				slidesToShow: 10,
				slidesToScroll: 10,
				infinite: false,
				dots: false,
			},
		},
		{
			breakpoint: 1400,
			settings: {
				slidesToShow: 8,
				slidesToScroll: 8,
				infinite: false,
				dots: false,
			},
		},
		{
			breakpoint: 1100,
			settings: {
				slidesToShow: 7,
				slidesToScroll: 7,
				infinite: false,
				dots: false,
			},
		},
		{
			breakpoint: 1024,
			settings: {
				slidesToShow: 6,
				slidesToScroll: 6,
				infinite: false,
				dots: false,
			},
		},
		{
			breakpoint: 740,
			settings: {
				slidesToShow: 5,
				slidesToScroll: 5,
				initialSlide: 2,
			},
		},
		{
			breakpoint: 680,
			settings: {
				slidesToShow: 4,
				slidesToScroll: 4,
				initialSlide: 2,
			},
		},
		{
			breakpoint: 580,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 3,
				initialSlide: 2,
			},
		},
		{
			breakpoint: 480,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 3,
			},
		},
	],
};
