import { Carousel, Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const slides = [
    {
      img: "https://www.adanirealty.com/-/media/project/realty/blogs/blogs-12-dec-24/why-mumbai-has-become-top-choice-for-real-estate-developers-whats-the-buzz.ashx",
      title: "Your Dream Land Awaits",
      desc: "Premium land plots available for residential, commercial, and agricultural purposes.",
    },
    {
      img: "https://is1-2.housingcdn.com/01c16c28/0a80b7b1fa4e6b776c50d5e8d5b5facc/v0/fs/residential_plot-for-sale-padampura_1-Jaipur-plot_view.jpg",
      title: "Invest in Your Future",
      desc: "Secure land assets that grow in value with time. Explore top locations now.",
    },
    {
      img: "https://assets-news.housing.com/news/wp-content/uploads/2024/09/23192714/How-to-sell-a-plot-F.jpg",
      title: "Land for Every Need",
      desc: "From farmland to plots in gated communities, find the right option for you.",
    },
  ];

  return (
    <Carousel
      fade
      controls={false}
      indicators={false}
      interval={1000}
      className="vh-100"
    >
      {slides.map((slide, idx) => (
        <Carousel.Item key={idx}>
          {/* Wrapper to force full screen size */}
          <div className="position-relative w-100 p-6" style={{ height: "100vh" }}>
            {/* Background Image */}
            <div
              className="position-absolute mt-3 start-0 w-100 h-100"
              style={{
                backgroundImage: `url(${slide.img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "brightness(0.4)",
                zIndex: 1,
              }}
            ></div>

            {/* Overlayed Content */}
            <div className="position-relative z-2 d-flex align-items-center justify-content-start h-100">
              <Container>
                <Row>
                  <Col lg={8}>
                    <h1 className="display-3 fw-bold text-white mb-4">
                      {slide.title}
                    </h1>
                    <p className="lead text-white mb-4 fs-4">{slide.desc}</p>
                    <div className="d-flex gap-3 flex-wrap">
                      <Button variant="primary" size="lg" className="px-4 py-2" onClick={()=>navigate("/flat")}>
                        View Available Flats
                      </Button>
                      {/* <Button
                        variant="outline-light"
                        size="lg"
                        className="px-4 py-2"
                      >
                        Check Prices
                      </Button> */}
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Hero;
