import { Button, Card, List, InputNumber } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPanier } from '../../redux/panieSlice';
import './ProduitItem.css';
import { data } from './../../helpers/produit';

function ProduitItem({ produit }) {
  const [quantities, setQuantities] = useState({});
  const dispatch = useDispatch();

  const handleQuantityChange = (value, itemId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: value,
    }));
  };

  const handleAddPanier = (item) => {
    const quantity = quantities[item.id] || 1;
    dispatch(addPanier({ item, quantity }));
  };

  return (
    <List
      grid={{
        gutter: 16,
        column: 4,
      }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <Card title={item.nom}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                {item.prix} <span className="produit-devise">DT</span>
              </div>
              <InputNumber
                min={1}
                defaultValue={1}
                onChange={(value) => handleQuantityChange(value, item.id)}
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