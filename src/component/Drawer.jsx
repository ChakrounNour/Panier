import React from "react";
import Panier from "../page/panier/Paniers";
import { Drawer } from "antd";

function CustomDrawer({ onClose, open }) {
  return (
    <Drawer title="Panier" onClose={onClose} open={open} width={400}>
      <Panier />
    </Drawer>
  );
}

export default CustomDrawer;
