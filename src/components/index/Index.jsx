import Chart from "chart.js";
import { Bar } from "react-chartjs-2";

import { Card, CardHeader, CardBody, Container, Row, Col } from "reactstrap";

import Header from "../../components/Header";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample2,
} from "../../variables/charts";

function Index() {
  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col xl="12" className="pb-4">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Performance (optional)
                    </h6>
                    <h2 className="mb-0">Total Favs</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Bar
                    data={chartExample2.data}
                    options={chartExample2.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Index;
