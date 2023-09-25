import { Col, Row } from "react-bootstrap"
import { StoreItem } from "../components/StoreItem"
import storeItems from "../data/items.json"

export default function Store() {
  return (
    <>
      <h1 className="mb-4">Featured Products</h1>
      <Row md={2} xs={1} lg={4} className="g-3">
        {storeItems.map(item => (
          <Col key={item.id}>
            <StoreItem {...item} />
          </Col>
        ))}
      </Row>
    </>
  )
}