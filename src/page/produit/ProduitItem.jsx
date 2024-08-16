import { Button, Card, List, InputNumber } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/panierSlice";
import "./ProduitItem.css";

function ProduitItem({ produit }) {
  const [quantities, setQuantities] = useState({});
  const dispatch = useDispatch();

  const handleQuantityChange = (value, itemKey) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemKey]: value,
    }));
  };

  const handleAddPanier = (item) => {
    const quantity = quantities[item.key] || 1;
    dispatch(addItem({ ...item, quantity }));
  };

  return (
    <List
      grid={{
        gutter: 16,
        xs: 1, 
        sm: 2, 
        md: 3, 
        lg: 4, 
      }}
      dataSource={produit}
      renderItem={(item) => (
        <List.Item>
          <Card title={item.nom}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                {item.prix} <span className="produit-devise">DT</span>
              </div>
              <InputNumber
                min={1}
                defaultValue={1}
                onChange={(value) => handleQuantityChange(value, item.key)}
                style={{ marginBottom: 10 }}
              />
              <Button
                className="add-button"
                type="primary"
                onClick={() => handleAddPanier(item)}
              >
                Ajouter au Panier
              </Button>
            </div>
          </Card>
        </List.Item>
      )}
    />
  );
}

export default ProduitItem;
