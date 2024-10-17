import React from 'react';
import { Layout, Card, Button } from "antd"; // Import Layout, Card, and Button from Ant Design
import cardData from './static/category.json'; // Import your JSON file

const { Content } = Layout;

function MainContent() {
  // Function to truncate the description to 100 characters
  const truncateDescription = (description) => {
    return description.length > 100 ? `${description.substring(0, 100)}...` : description;
  };

  return (
    <Layout >
        <div style={{marginTop:150,marginLeft:250,marginRight:250,marginBottom:120}}>
      <Content style={{ padding: '20px', backgroundColor: '#f7f9fc' }}> {/* Light neutral background */}
        <div className="App">
          {/* Flexbox container to display all cards in a responsive layout */}
          <div className="flex-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {cardData.map((item, index) => (
              <Card
                key={index}
                style={{ 
                  backgroundColor: '#ffffff', // White background for professionalism
                  color: '#333333', // Dark gray text for easy readability
                  margin: '20px', 
                  width: '300px', 
                  textAlign: 'center',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
                  transition: 'transform 0.3s',
                }}
                hoverable
              >
                <div style={{ fontWeight: 'bold', fontSize: '22px', color: '#003366' }}> {/* Dark blue for header text */}
                  {item.category}
                </div>
                <p style={{ marginTop: '10px', color: '#666666' }}> {/* Medium gray for description text */}
                  {truncateDescription(item.description)}
                </p>
                <div>
                  {/* Ant Design button for "More" */}
                  <Button 
                    type="primary" 
                    href={item.path} 
                    style={{ 
                      backgroundColor: '#0052cc', // Professional blue for buttons
                      borderColor: '#0052cc', 
                      borderRadius: '4px',
                      transition: 'all 0.3s',
                    }}
                  >
                    More
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Content>
      </div>
    </Layout>
  );
}

export default MainContent;
    