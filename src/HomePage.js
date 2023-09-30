import { Button } from "react-bootstrap";
import "./css/HomePage.css";

function HomePage() {
  return (
    <div class="margin">
      <div class="container mb-5">
        <div class="row position-relative">
          <div class="col-12 col-lg-8 mx-auto text-center mb-5">
            <h2 class="display-4 fw-bold mb-5">
              Finish what you started today before you forget to do it.
            </h2>
            <p class="lead text-muted mb-5">
              Correct annotation helps your customers find their way around new
              features. Getting familiar with the project is the first step
              towards development.
            </p>
            <div>
              <Button variant="primary me-5" size="lg" href="/new-report">
                New Report
              </Button>
              <Button variant="primary" size="lg" href="/list-reports">
                Search Reports
              </Button>
            </div>
          </div>
          <div class="container margin">
            <div class="d-flex flex-row mb-3">
                <div class="me-5">
                  Latest Reports
                </div>
                <div >
                  Favourite Reports
                </div>
            </div>
            <div class="row">
              <div class="col-12 col-md-6 col-lg-4 mb-4">
                <div class="d-flex justify-content-center align-items-center py-5 bg-light rounded">
                  <div class="text-center">
                    <img
                      class="mx-auto mb-5 img-fluid"
                      src="bootstrap5-plain-assets/images/blue-400-avatar.png"
                      alt=""
                      
                    ></img>
                    <h4 class="fw-bold">Danny Bailey</h4>
                    <p class="text-muted">CEO &amp; Founder</p>
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-6 col-lg-4 mb-4">
                <div class="d-flex justify-content-center align-items-center py-5 bg-light rounded">
                  <div class="text-center">
                    <img
                      class="mx-auto mb-5 img-fluid"
                      src="bootstrap5-plain-assets/images/blue-400-avatar.png"
                      alt=""
                      
                    ></img>
                    <h4 class="fw-bold">Danny Bailey</h4>
                    <p class="text-muted">CEO &amp; Founder</p>
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-6 col-lg-4 mb-4">
                <div class="d-flex justify-content-center align-items-center py-5 bg-light rounded">
                  <div class="text-center">
                    <img
                      class="mx-auto mb-5 img-fluid"
                      src="bootstrap5-plain-assets/images/blue-400-avatar.png"
                      alt=""
                      
                    ></img>
                    <h4 class="fw-bold">Danny Bailey</h4>
                    <p class="text-muted">CEO &amp; Founder</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
