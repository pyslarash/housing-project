import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Typography } from '@mui/material';

const CityImages = ({ data }) => {
    console.log(data)
    return (
        <>
            {data.length > 0 ? (
                <Carousel showThumbs={false} style={{ height: '100%', width: '100%' }}>
                    {data.map((item) => (
                        <div key={item} style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img src={item} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                        </div>
                    ))}
                </Carousel>
            ) : (
                <div style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant="h3">Sorry, no photos</Typography>
                </div>
            )}
        </>
    )
}

export default CityImages;