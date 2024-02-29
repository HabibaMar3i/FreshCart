import slide1 from '../../Assets/slider-image-1.jpeg'
import slide2 from '../../Assets/slider-image-2.jpeg'
import slide3 from '../../Assets/slider-image-3.jpeg'
import blog1 from '../../Assets/grocery-banner.png'
import blog2 from '../../Assets/grocery-banner-2.jpeg'
import Slider from "react-slick";
function MainSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false
    };
    return <>
        <div className='row mb-3 gx-0'>
            <div className='col-md-9'>
                <Slider {...settings}>
                    <img height={350} src={slide1} alt='slide1' />
                    <img height={350} src={slide2} alt='slide2' />
                    <img height={350} src={slide3} alt='slide3' />
                </Slider>
            </div>
            <div className='col-md-3'>
                <img src={blog1} alt='blog1' className='w-100' height={175}/>
                <img src={blog2} alt='blog2' className='w-100' height={175}/>
            </div>
        </div>
    </>;
}
export default MainSlider;