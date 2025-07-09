import { useEffect, useState } from "react";

interface MosqueData {
	images?: {
		filename: string;
		path: string;
		uploadedAt: string;
		_id: string;
		url?: string;
	}[];
}

interface ImageCarouselProps {
	mosqueData: MosqueData | null;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ mosqueData }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	// Debug logging
	// useEffect(() => {
	//   console.log('ImageCarousel - mosqueData:', mosqueData);
	//   console.log('ImageCarousel - images:', mosqueData?.images);
	//   console.log('ImageCarousel - images length:', mosqueData?.images?.length);
	// }, [mosqueData]);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((prevIndex) => {
				if (
					!mosqueData ||
					!mosqueData.images ||
					mosqueData.images.length === 0
				) {
					return 0;
				}
				return (prevIndex + 1) % mosqueData.images.length;
			});
		}, 10000);

		return () => clearInterval(interval);
	}, [mosqueData]);

	// If no images, show a placeholder or return null
	if (!mosqueData || !mosqueData.images || mosqueData.images.length === 0) {
		return (
			<div className="relative h-[567px] mb-2 overflow-hidden rounded-xl shadow-2xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
				<div className="text-center">
					<div className="text-gray-400 text-6xl mb-4">🕌</div>
					<p className="text-gray-600 text-lg font-medium">
						No images available
					</p>
					<p className="text-gray-500 text-sm">
						Upload some images to display them here
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="relative h-[725px] mb-2 overflow-hidden rounded-xl shadow-2xl group">
			{mosqueData.images.map((img, index) => (
				<div
					key={img._id}
					className={`absolute w-full h-full transition-all duration-1000 ease-in-out ${
						index === currentIndex
							? "opacity-100 scale-100"
							: "opacity-0 scale-105"
					}`}
				>
					<img
						src={img.url || `http://localhost:5000${encodeURI(img.path)}`}
						alt={`Mosque ${img.filename}`}
						className="w-full h-full object-cover"
						onError={(e) => {
							console.error("Failed to load image:", img.path);
							console.error(
								"Attempted URL:",
								img.url || `http://localhost:5000${encodeURI(img.path)}`,
							);
							// Hide broken image
							e.currentTarget.style.display = "none";
						}}
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
				</div>
			))}

			{/* Navigation dots */}
			<div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3">
				{mosqueData.images.map((img, index) => (
					<button
						type="button"
						key={img._id}
						className={`w-3 h-3 rounded-full transition-all duration-300 ${
							index === currentIndex
								? "bg-white scale-125"
								: "bg-white/40 hover:bg-white/60"
						}`}
						onClick={() => setCurrentIndex(index)}
					/>
				))}
			</div>

			{/* Navigation arrows */}
			{/* <button
        onClick={() =>
          setCurrentIndex((prev) =>
            prev === 0 ? mosqueData.images!.length - 1 : prev - 1
          )
        }
        className='absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100'
      >
        ←
      </button>
      <button
        onClick={() =>
          setCurrentIndex((prev) => (prev + 1) % mosqueData.images!.length)
        }
        className='absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100'
      >
        →
      </button> */}
		</div>
	);
};

export default ImageCarousel;
