import React from 'react';

const LearnMore = () => {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <h1 className="text-center mb-4">About MoodiGo</h1>
          <div className="row g-4">
            <div className="col-12 col-md-6">
              <div className="card h-100 shadow-sm">
                <div className="card-body p-4">
                  <h3 className="card-title">Our Story</h3>
                  <p className="card-text">
                    MoodiGo is your premier destination for fashion-forward clothing and accessories. 
                    We curate the latest trends and timeless classics to help you express your unique style.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="card h-100 shadow-sm">
                <div className="card-body p-4">
                  <h3 className="card-title">Quality Promise</h3>
                  <p className="card-text">
                    We're committed to providing high-quality products at competitive prices. 
                    Every item in our collection is carefully selected to meet our quality standards.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="card h-100 shadow-sm">
                <div className="card-body p-4">
                  <h3 className="card-title">Customer Service</h3>
                  <p className="card-text">
                    Our dedicated customer service team is here to help you with any questions 
                    or concerns. We strive to provide the best shopping experience possible.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="card h-100 shadow-sm">
                <div className="card-body p-4">
                  <h3 className="card-title">Sustainability</h3>
                  <p className="card-text">
                    We're working towards more sustainable practices in our business operations 
                    and product selection to reduce our environmental impact.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnMore; 