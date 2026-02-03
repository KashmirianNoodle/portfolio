// WhatsAppWidget.jsx
import React, { useState } from 'react';
import { FaWhatsapp, FaTimes, FaPaperPlane } from 'react-icons/fa';

const WhatsAppWidget = ({ phoneNumber, companyName = "Support" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!message.trim()) return;
    
    const formattedNumber = phoneNumber.replace(/\D/g, '');
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${formattedNumber}?text=${encodedMessage}`;
    
    window.open(url, '_blank');
    setMessage('');
    setIsOpen(false);
  };

  return (
    <div className="whatsapp-widget">
      {/* Chat Box */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '80px',
          right: '20px',
          width: '300px',
          backgroundColor: 'white',
          borderRadius: '10px',
          boxShadow: '0 5px 20px rgba(0,0,0,0.2)',
          zIndex: 1001
        }}>
          {/* Header */}
          <div style={{
            backgroundColor: '#25D366',
            color: 'white',
            padding: '15px',
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <FaWhatsapp size={24} />
            <div>
              <h4 style={{ margin: 0 }}>{companyName}</h4>
              <small style={{ opacity: 0.9 }}>Typically replies within an hour</small>
            </div>
          </div>
          
          {/* Body */}
          <div style={{ padding: '15px' }}>
            <p>Hello! 👋 How can we help you?</p>
            
            <div style={{ marginTop: '20px' }}>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  minHeight: '80px',
                  resize: 'vertical'
                }}
              />
              
              <button
                onClick={handleSend}
                style={{
                  backgroundColor: '#25D366',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  marginTop: '10px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                <FaPaperPlane /> Send
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#25D366',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          zIndex: 1000
        }}
      >
        {isOpen ? <FaTimes size={24} /> : <FaWhatsapp size={30} />}
      </button>
    </div>
  );
};

export default WhatsAppWidget;