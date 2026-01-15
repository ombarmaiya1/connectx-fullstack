import React, { useState } from 'react';
import {
    Search,
    MoreVertical,
    Phone,
    Video,
    Info,
    Image as ImageIcon,
    Paperclip,
    Smile,
    Send
} from 'lucide-react';
import { conversations } from '../data/mockData';

export const Messages = () => {
    const [selectedChat, setSelectedChat] = useState(conversations[0]);
    const [message, setMessage] = useState('');

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        // Simulation: Clear input and show it was "sent"
        // In a real app, this would update state and hit an API
        setMessage('');
    };

    return (
        <div className="messages-page">
            <div className="messages-container glass-card">
                {/* Conversations Sidebar */}
                <div className="messages-sidebar">
                    <div className="sidebar-header">
                        <h2 className="sidebar-title">Messages</h2>
                        <button className="icon-btn-subtle">
                            <MoreVertical size={20} />
                        </button>
                    </div>

                    <div className="sidebar-search">
                        <Search size={18} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search messages..."
                            className="search-input-subtle"
                        />
                    </div>

                    <div className="conversations-list custom-scrollbar">
                        {conversations.map((chat) => (
                            <div
                                key={chat.id}
                                className={`conversation-item ${selectedChat.id === chat.id ? 'active' : ''}`}
                                onClick={() => setSelectedChat(chat)}
                            >
                                <div className="conversation-avatar-container">
                                    <img src={chat.user.avatar} alt={chat.user.name} className="conversation-avatar" />
                                    <span className={`status-dot ${chat.user.status}`}></span>
                                </div>
                                <div className="conversation-info">
                                    <div className="conversation-header">
                                        <h4 className="conversation-name">{chat.user.name}</h4>
                                        <span className="conversation-time">{chat.time}</span>
                                    </div>
                                    <div className="conversation-snippet">
                                        <p className="last-message">{chat.lastMessage}</p>
                                        {chat.unread > 0 && (
                                            <span className="unread-badge">{chat.unread}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chat Area */}
                <div className="chat-area">
                    {/* Chat Header */}
                    <div className="chat-header">
                        <div className="chat-user-info">
                            <div className="chat-avatar-container">
                                <img src={selectedChat.user.avatar} alt={selectedChat.user.name} className="chat-avatar" />
                                <span className={`status-dot ${selectedChat.user.status}`}></span>
                            </div>
                            <div>
                                <h3 className="chat-current-name">{selectedChat.user.name}</h3>
                                <p className="chat-status-text">{selectedChat.user.status === 'online' ? 'Active now' : 'Away'}</p>
                            </div>
                        </div>
                        <div className="chat-actions">
                            <button className="chat-action-btn"><Phone size={20} /></button>
                            <button className="chat-action-btn"><Video size={20} /></button>
                            <button className="chat-action-btn"><Info size={20} /></button>
                        </div>
                    </div>

                    {/* Message Feed */}
                    <div className="message-feed custom-scrollbar">
                        <div className="message-date-separator">
                            <span>Today</span>
                        </div>

                        {selectedChat.messages.map((msg) => (
                            <div key={msg.id} className={`message-bubble-wrapper ${msg.isSelf ? 'self' : 'other'}`}>
                                {!msg.isSelf && (
                                    <img src={selectedChat.user.avatar} alt={msg.sender} className="message-mini-avatar" />
                                )}
                                <div className="message-bubble-content">
                                    <div className="message-bubble">
                                        <p>{msg.text}</p>
                                    </div>
                                    <span className="message-time">{msg.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Chat Input */}
                    <form className="chat-input-area" onSubmit={handleSendMessage}>
                        <div className="input-actions-left">
                            <button type="button" className="input-action-btn"><ImageIcon size={20} /></button>
                            <button type="button" className="input-action-btn"><Paperclip size={20} /></button>
                        </div>
                        <div className="input-wrapper">
                            <input
                                type="text"
                                placeholder="Type a message..."
                                className="message-input"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            <button type="button" className="emoji-btn"><Smile size={20} /></button>
                        </div>
                        <button type="submit" className="send-btn" disabled={!message.trim()}>
                            <Send size={20} fill={message.trim() ? "currentColor" : "none"} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
