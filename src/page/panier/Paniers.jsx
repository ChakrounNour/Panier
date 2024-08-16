// src/components/Panier.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { List, InputNumber, Button, Skeleton } from 'antd';
import { removeFromCart, updateQuantity } from '../../redux/panieSlice';

function Panier() {
  const panier = useSelector((state) => state.panier);
  const dispatch = useDispatch();

  const handleQuantityChange = (value, itemId) => {
    if (value && value > 0) {
      dispatch(updateQuantity({ itemId, quantity: value }));
    }
  };

  const handleRemove = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  return (
    <div>
      <h2>Panier</h2>
      <List
        itemLayout="horizontal"
        grid={{ gutter: 16, column: 1 }}
        dataSource={panier}
        renderItem={(item) => (
          <List.Item>
            <Skeleton loading={false} title={false} active>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <div style={{ flex: 1 }}>
                  <h3>{item.nom}</h3>
                </div>
                <div style={{ flex: 1 }}>
                  <p>Prix: {item.prix} DT</p>
                </div>
                <div style={{ flex: 1 }}>
                  <InputNumber
                    min={1}
                    value={item.quantity}
                    onChange={(value) => handleQuantityChange(value, item.id)}
                    style={{ marginLeft: 20, marginRight: 20 }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <p>Total: {item.prix * item.quantity} DT</p>
                </div>
                <div style={{ flex: 1 }}>
                  <Button type="danger" onClick={() => handleRemove(item.id)}>
                    Supprimer
                  </Button>
                </div>
              </div>
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  );
}

export default Panier;
