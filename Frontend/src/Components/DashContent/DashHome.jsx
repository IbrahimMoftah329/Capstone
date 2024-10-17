import React from 'react';
import './DashContent.css'; // Ensure the CSS file path is correct

const DashHome = () => {
    return (
        <div className="content">
            <h1>Welcome Back, Steve Jobs!</h1>
            <h2>Your Dashboard Overview</h2>
            <div className="dashboard-overview">
                <div className="recent-activity">
                    <h3>Recent Activity</h3>
                    <div className="activity-item">
                        <h4>CS 150 Sequences</h4>
                        <p>Progress: 92%</p>
                    </div>
                    <div className="activity-item">
                        <h4>CS 260 Pipelining</h4>
                        <p>Progress: 92%</p>
                    </div>
                    <div className="activity-item">
                        <h4>CS 265 NFAs</h4>
                        <p>Progress: 92%</p>
                    </div>
                </div>
                <div className="card-progress">
                    <h3>Your Card Progress</h3>
                    <div className="card-item">
                        <h4>CS 150 Sequences</h4>
                        <p>Progress: 12%</p>
                    </div>
                    <div className="card-item">
                        <h4>CS 260 Pipelining</h4>
                        <p>Progress: 12%</p>
                    </div>
                    <div className="card-item">
                        <h4>CS 265 NFAs</h4>
                        <p>Progress: 12%</p>
                    </div>
                </div>
                <div className="quiz-progress">
                    <h3>Your Quiz Progress</h3>
                    <div className="quiz-graph">
                        {/* Placeholder for a line chart component */}
                        <p>Graph Placeholder</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashHome;
