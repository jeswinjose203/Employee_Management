import React, { useState } from 'react';
import { Layout, Menu, message } from 'antd';

const { Sider } = Layout;
const { SubMenu } = Menu;

// Sample menu data
const menuData = [
  {
    key: 'sub1',
    title: 'Option 1',
    items: [
      { key: '1-1', title: 'Plumbing' },
      { key: '1-2', title: 'Electric work' },
      { key: '1-3', title: 'House Cleaning' },
    ],
  },
  {
    key: 'sub2',
    title: 'Option 2',
    items: [
      { key: '2-1', title: 'Car' },
      { key: '2-2', title: 'Bike' },
      { key: '2-3', title: 'Appliance' },
    ],
  },
  {
    key: 'sub3',
    title: 'Option 3',
    items: [
      { key: '3-1', title: 'Event' },
      { key: '3-2', title: 'Wedding' }, // Corrected the spelling from "Weedding" to "Wedding"
      { key: '3-3', title: 'Party' }, // Corrected the spelling from "party" to "Party"
    ],
  },
];

const LeftSider = () => {
  const [collapsed, setCollapsed] = useState(false);

  // Handler for menu item click
  const handleMenuClick = (key, title) => {
    message.info(`Clicked: ${title} (Key: ${key})`);
    console.log(`${title} + ${key}`); // Use backticks for template literals
    
  };

  return (
    <Sider
      width={200}
      className="site-layout-background"
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        style={{ height: '100%', borderRight: 0 }}
      >
        {menuData.map((subMenu) => (
          <SubMenu key={subMenu.key} title={subMenu.title}>
            {subMenu.items.map((item) => ({
              key: item.key,
              label: item.title, // Use `label` instead of `children`
              onClick: () => handleMenuClick(item.key, item.title),
            })).map((item) => (
              <Menu.Item key={item.key} onClick={item.onClick}>
                {item.label}
              </Menu.Item>
            ))}
          </SubMenu>
        ))}
      </Menu>
    </Sider>
  );
};

export default LeftSider;
