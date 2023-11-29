import { useEffect, useState } from 'react';

const DetailsImages = ({ images }) => {
    const [mainImage, setMainImage] = useState();

    useEffect(() => {
        if (images && images.length > 0) {
            setMainImage(images[0]);
        }
    }, [images]);

    return (
        <div>
            {images && images.length > 0 && (
                <img src={mainImage} className='h-60 w-full  object-cover lg:h-96' />
            )}
            <div className='mt-4 grid grid-cols-4 gap-4'>
                {images &&
                    images.length > 0 &&
                    images.map((image, inx) => (
                        <img
                            className='h-24 w-full cursor-pointer object-cover lg:h-36'
                            src={image}
                            key={inx}
                            onClick={() => setMainImage(image)}
                        />
                    ))}
            </div>
        </div>
    );
};

export default DetailsImages;