import React, { useState } from 'react';
import { Image, Video, Send, MoreHorizontal, Heart, MessageCircle, Share2, Bookmark } from 'lucide-react';
import { feedPosts } from '../data/mockData';

export const Feed = () => {
    const [posts] = useState(feedPosts);

    return (
        <div className="dashboard-feed">
            {/* Create Post Widget */}
            <div className="create-post-card glass-card">
                <div className="create-post-header">
                    <img src="https://i.pravatar.cc/150?img=11" alt="User" className="post-avatar" />
                    <input type="text" placeholder="Start a post, share your thoughts..." className="create-post-input" />
                </div>
                <div className="create-post-actions">
                    <button className="post-action-btn">
                        <Image size={20} className="text-blue" />
                        <span>Photo</span>
                    </button>
                    <button className="post-action-btn">
                        <Video size={20} className="text-green" />
                        <span>Video</span>
                    </button>
                    <button className="post-action-btn">
                        <MoreHorizontal size={20} />
                        <span>More</span>
                    </button>
                    <button className="btn-primary post-submit-btn">
                        <Send size={16} />
                        <span>Post</span>
                    </button>
                </div>
            </div>

            {/* Feed Posts */}
            <div className="feed-posts">
                {posts.map((post) => (
                    <article key={post.id} className="feed-post-card glass-card">
                        {/* Post Header */}
                        <div className="post-header">
                            <img src={post.image} alt={post.name} className="post-avatar" />
                            <div className="post-meta">
                                <h4 className="post-author-name">{post.name}</h4>
                                <p className="post-author-role">{post.role}</p>
                                <p className="post-timestamp">{post.time}</p>
                            </div>
                            <button className="post-options-btn">
                                <MoreHorizontal size={20} />
                            </button>
                        </div>

                        {/* Post Content */}
                        <div className="post-content">
                            <p>{post.post}</p>
                        </div>

                        {/* Post Image */}
                        {post.postImage && (
                            <div className="post-image-container">
                                <img src={post.postImage} alt="Post content" className="post-image" />
                            </div>
                        )}

                        {/* Post Hashtags */}
                        {post.hashtags && post.hashtags.length > 0 && (
                            <div className="post-hashtags">
                                {post.hashtags.map((tag, index) => (
                                    <span key={index} className="post-hashtag">#{tag}</span>
                                ))}
                            </div>
                        )}

                        {/* Engagement Stats */}
                        <div className="post-stats">
                            <span className="post-stat-text">{post.likes} likes</span>
                            <div className="post-stat-divider">•</div>
                            <span className="post-stat-text">{post.comments} comments</span>
                        </div>

                        {/* Post Actions */}
                        <div className="post-actions">
                            <button className="action-btn">
                                <Heart size={20} />
                                <span className="action-text">Like</span>
                            </button>
                            <button className="action-btn">
                                <MessageCircle size={20} />
                                <span className="action-text">Comment</span>
                            </button>
                            <button className="action-btn">
                                <Share2 size={20} />
                                <span className="action-text">Share</span>
                            </button>
                            <button className="action-btn">
                                <Bookmark size={20} />
                                <span className="action-text">Save</span>
                            </button>
                        </div>

                        {/* Comment Input */}
                        <div className="post-comment-section">
                            <img src="https://i.pravatar.cc/150?img=11" alt="Your avatar" className="comment-avatar" />
                            <input
                                type="text"
                                placeholder="Write a comment..."
                                className="comment-input"
                            />
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
};
