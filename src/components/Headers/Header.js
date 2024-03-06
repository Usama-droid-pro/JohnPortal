
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

const Header = ({tables , headerCountData}) => {

  const formatCurrency = (amount)=>{
    if (typeof amount === 'string') {
      amount = parseFloat(amount);
  }
  if (!isNaN(amount) && amount) {
      return `$${amount?.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
  } else {
      return '$0';
  }
  }
  return (
    <>
      <div className="header pb-5 pt-5 pt-md-8" style={{background: 'linear-gradient(87deg, #67748e 0, #6c91dc 100%)'}}>
       
       {!tables && (
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="4">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Total Verified Leads
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {headerCountData?.totalVerifiedUsers}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      {/* <span className="text-success mr-2">
                        <i className="fa fa-arrow-up" /> 3.48%
                      </span>{" "}
                      <span className="text-nowrap">Since last month</span> */}
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="4">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Total Locked Leads
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{headerCountData?.totalLockedLeads}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-chart-pie" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      {/* <span className="text-danger mr-2">
                        <i className="fas fa-arrow-down" /> 3.48%
                      </span>{" "}
                      <span className="text-nowrap">Since last week</span> */}
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="4">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Total Unlocked Leads
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{headerCountData?.totalUnlockedLeads}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      {/* <span className="text-warning mr-2">
                        <i className="fas fa-arrow-down" /> 1.10%
                      </span>{" "}
                      <span className="text-nowrap">Since yesterday</span> */}
                    </p>
                  </CardBody>
                </Card>
              </Col>
              {/* <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Total Stripe Payment
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{formatCurrency(headerCountData?.totalStripePayment)}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fas fa-percent" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fas fa-arrow-up" /> 12%
                      </span>{" "}
                      <span className="text-nowrap">Since last month</span>
                    </p>
                  </CardBody>
                </Card>
              </Col> */}
            </Row>
          </div>
        </Container>
        )}
      </div>
    </>
  );
};

export default Header;
