import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge } from "antd";

export const menu = [
  {
    key: 'panier',
    label: (
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
        }}
      >
        Panier
        <Badge
          style={{ backgroundColor: 'red', marginLeft: 8 }}
          count={5}
          size="small"
        >
          <ShoppingCartOutlined
            style={{ marginLeft: 5, fontSize: '18px', color: 'white' }}
          />
        </Badge>
      </span>
    ),
  },
];
