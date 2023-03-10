import { NavigateBefore, NavigateNext } from '@mui/icons-material';
import { Box, IconButton, Typography, useMediaQuery } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { shades } from '../../theme';

const importAll = (r) => {
  return r.keys().reduce((acc, item) => {
    acc[item.replace('./', '')] = r(item);
    return acc;
  }, {});
};

export const heroTextureImports = importAll(
  require.context('../../assets', false, /\.(png|jpe?g|svg)$/)
);

function MainCarousel() {
  const isNonMobile = useMediaQuery('(min-width:600px)');

  return (
    <Carousel
      infiniteLoop={true}
      showIndicators={false}
      showThumbs={false}
      showStatus={false}
      renderArrowPrev={(onClickHandler, hadPrev, label) => (
        <IconButton
          onClick={onClickHandler}
          sx={{ position: 'absolute', top: '50%', left: 0, color: 'white', padding: 5, zIndex: 10 }}
        >
          <NavigateBefore sx={{ fontSize: 40 }} />
        </IconButton>
      )}
      renderArrowNext={(onClickHandler, hasNext, label) => (
        <IconButton
          onClick={onClickHandler}
          sx={{
            position: 'absolute',
            top: '50%',
            right: 0,
            color: 'white',
            padding: 5,
            zIndex: 10,
          }}
        >
          <NavigateNext sx={{ fontSize: 40 }} />
        </IconButton>
      )}
    >
      {Object.values(heroTextureImports).map((texture, index) => (
        <Box key={`carousel-image-${index}`}>
          <img
            src={texture.default}
            alt={`carousel-${index}`}
            style={{
              width: '100%',
              height: '700px',
              objectFit: 'cover',
              backgroundAttachment: 'fixed',
            }}
          />
          <Box
            position="absolute"
            top="46%"
            left={isNonMobile ? '10%' : '0'}
            right={isNonMobile ? undefined : '0'}
            maxWidth={isNonMobile ? undefined : '240px'}
            margin={isNonMobile ? undefined : '0 auto'}
            padding="20px"
            color="white"
            textAlign="left"
            borderRadius="1px"
            bgcolor="rgba(0, 0, 0, 0.4)"
          >
            <Typography color={shades.secondary[500]}>--New Items</Typography>
            <Typography variant="h1">Summer Sale</Typography>
            <Typography
              fontWeight="bold"
              color={shades.secondary[300]}
              sx={{ textDecoration: 'underline' }}
            >
              Discover More
            </Typography>
          </Box>
        </Box>
      ))}
    </Carousel>
  );
}

export default MainCarousel;
