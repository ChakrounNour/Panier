import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  List,
  Button,
  Typography,
  Divider,
  InputNumber,
  Input,
  message,
  Row,
  Col,
} from "antd";
import {
  clearPanier,
  removeItem,
  updateQuantity,
  applyPromoCode,
} from "../../redux/panierSlice";
import { selectDiscountedTotal } from "../../redux/panierSlice";
import { DeleteColumnOutlined, DeleteOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

const Panier = () => {
  const dispatch = useDispatch();
  const { items, totalQuantity } = useSelector((state) => state.panier);
  const { total, totalWithDiscount, totalWithPromoDiscount } = useSelector(
    selectDiscountedTotal
  );
  const [promoCode, setPromoCode] = useState("");

  const handleQuantityChange = (value, itemKey) => {
    if (value <= 0) return;
    dispatch(updateQuantity({ key: itemKey, quantity: value }));
  };

  const handlePromoCode = () => {
    if (promoCode.trim() === "") {
      message.warning("enter a promo code.");
      return;
    }
    dispatch(applyPromoCode({ code: promoCode }));
  };

  return (
    <div style={{ padding: "16px" }}>
      <Title level={2}>Panier</Title>
      {items.length === 0 ? (
        <Text>Panier vide</Text>
      ) : (
        <div>
          <List
            itemLayout="horizontal"
            dataSource={items}
            renderItem={(item) => (
              <List.Item
                style={{
                  marginBottom: "16px",
                  padding: "16px",
                  border: "1px solid #e8e8e8",
                  borderRadius: "4px",
                }}
                actions={[
                  <DeleteOutlined
                    type="primary"
                    danger
                    onClick={() => dispatch(removeItem(item.key))}
                  >
                    Remove
                  </DeleteOutlined>,
                ]}
              >
                <List.Item.Meta
                  title={item.nom}
                  description={
                    <>
                      <div>
                        Quantity:
                        <InputNumber
                          min={1}
                          value={item.quantity}
                          onChange={(value) =>
                            handleQuantityChange(value, item.key)
                          }
                          style={{ marginRight: "8px" }}
                        />
                      </div>
                      <div>
                        Prix: {item.prix} x {item.quantity} = {item.totalPrix}{" "}
                        DT
                      </div>
                    </>
                  }
                />
              </List.Item>
            )}
          />
          <Divider />
          <div style={{ marginTop: "16px" }}>
            <Row gutter={16}>
              <Col span={24}>
                <Text strong>Total Quantity:</Text>
                <Text style={{ marginLeft: "8px" }}>{totalQuantity}</Text>
              </Col>
              <Col span={24}>
                <Text strong>Total prix (sans remise):</Text>
                <Text style={{ marginLeft: "8px" }}>{total} DT</Text>
              </Col>
              <Col span={24}>
                <Text strong>Total prix (avec remise):</Text>
                <Text style={{ marginLeft: "8px" }}>
                  {totalWithDiscount} DT
                </Text>
              </Col>
              <Col span={24}>
                <Text strong>Total prix (avec promo code):</Text>
                <Text style={{ marginLeft: "8px" }}>
                  {totalWithPromoDiscount} DT
                </Text>
              </Col>
            </Row>
          </div>
          <Divider />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "16px",
            }}
          >
            <Input
              placeholder="Enter promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              style={{ marginRight: "8px", flex: 1 }}
            />
            <Button
              type="primary"
              onClick={handlePromoCode}
              style={{ width: "auto" }}
            >
              Promo Code
            </Button>
          </div>
          <Divider />
          <Button
            type="primary"
            danger
            onClick={() => dispatch(clearPanier())}
            style={{ marginTop: "16px" }}
            block
          >
            Clear Cart
          </Button>
        </div>
      )}
    </div>
  );
};

export default Panier;
