import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const cards = [
  {
    imgUel:
      "https://img.magnific.com/free-photo/closeup-scarlet-macaw-from-side-view-scarlet-macaw-closeup-head_488145-3540.jpg",
    title: "Card 1",
  },
  {
    imgUel:
      "https://img.magnific.com/free-photo/closeup-scarlet-macaw-from-side-view-scarlet-macaw-closeup-head_488145-3540.jpg",
    title: "Card 2",
  },
  {
    imgUel:
      "https://img.magnific.com/free-photo/closeup-scarlet-macaw-from-side-view-scarlet-macaw-closeup-head_488145-3540.jpg",
    title: "Card 3",
  },
  {
    imgUel:
      "https://img.magnific.com/free-photo/closeup-scarlet-macaw-from-side-view-scarlet-macaw-closeup-head_488145-3540.jpg",
    title: "Card 4",
  },
  {
    imgUel:
      "https://img.magnific.com/free-photo/closeup-scarlet-macaw-from-side-view-scarlet-macaw-closeup-head_488145-3540.jpg",
    title: "Card 5",
  },
  {
    imgUel:
      "https://img.magnific.com/free-photo/closeup-scarlet-macaw-from-side-view-scarlet-macaw-closeup-head_488145-3540.jpg",
    title: "Card 6",
  },
];

function SliderSection() {

 

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (

    <>
      <div className="">
      
        <div className="slider-container flex justify-center" >

          <Slider className="w-[85%] md:w-[95%]" {...settings} >
            {cards.map((card, index) => (
              <div key={index} className="px-2" >
                <div

                  className=" h-[500px] rounded-xl  bg-black overflow-hidden"
                >
                  <img
                    src={card.imgUel}
                    alt={card.title}
                    className="w-full h-[85%] object-cover"
                  />

                  <div className="p-4">
                    <h2 className="text-2xl font-semibold text-white">
                      {card.title}
                    </h2>
                  </div>
                </div>
              </div>
            ))}
          </Slider>

        </div>

      </div>
    </>
  );
}

export default SliderSection;
