import React, { useState, useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
const App = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New message from Sarah Parker',
      content: 'Updated the project timeline for Q2 2025',
      time: '2 minutes ago',
      isRead: false,
      type: 'message'
    },
    {
      id: 2,
      title: 'Document update',
      content: 'Marketing strategy document has been modified',
      time: '15 minutes ago',
      isRead: false,
      type: 'update'
    },
    {
      id: 3,
      title: 'Meeting reminder',
      content: 'Team sync in 30 minutes',
      time: '25 minutes ago',
      isRead: true,
      type: 'system'
    }
  ]);

  const [threads, setThreads] = useState([
    {
      id: 1,
      author: 'Emily Thompson',
      avatar: 'https://public.readdy.ai/ai/img_res/05218ad61a1b639e328b80b60a6aba85.jpg',
      content: 'Just finished reviewing the latest design mockups. The new dashboard layout looks fantastic!',
      timestamp: '10:30 AM',
      replyCount: 3,
      replies: [
        {
          id: 1,
          author: 'Michael Chen',
          avatar: 'https://public.readdy.ai/ai/img_res/4fb1fd4066b2872f63f9083b3abb4593.jpg',
          content: 'Great work! The client will love this.',
          timestamp: '10:35 AM'
        }
      ]
    },
    {
      id: 2,
      author: 'James Wilson',
      avatar: 'https://public.readdy.ai/ai/img_res/415dc64b3bcfab7019aff4bca7c664e8.jpg',
      content: 'Team, please review the updated project timeline for the new feature rollout.',
      timestamp: '09:15 AM',
      replyCount: 2,
      replies: []
    }
  ]);

  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const timelineChartRef = useRef(null);

  useEffect(() => {
    if (timelineChartRef.current) {
      const chart = echarts.init(timelineChartRef.current);
      const option = {
        animation: false,
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Team Activity',
            type: 'line',
            data: [15, 25, 18, 30, 22],
            smooth: true,
            lineStyle: {
              color: '#4F46E5'
            }
          }
        ]
      };
      chart.setOption(option);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src="https://public.readdy.ai/ai/img_res/20cc55e026ed88ab41c9b911eef6d6e3.jpg" 
                 alt="Company Logo" 
                 className="h-8" />
          </div>
          
          <div className="flex-1 max-w-2xl mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search knowledge base..."
                className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button 
              className="relative !rounded-button"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <i className="fas fa-bell text-gray-600"></i>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </button>
            
            <div className="flex items-center space-x-2">
              <img
                src="https://public.readdy.ai/ai/img_res/0b3272edbe718d393aa82a8aedc8a6f1.jpg"
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm font-medium text-gray-700">Alexandra Davis</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Discussion Panel */}
          <div className="col-span-3 bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-semibold mb-4">Discussions</h2>
            <div className="space-y-4">
              {threads.map(thread => (
                <div key={thread.id} className="border-b pb-4">
                  <div className="flex items-start space-x-3">
                    <img src={thread.avatar} alt={thread.author} className="w-10 h-10 rounded-full" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{thread.author}</h3>
                        <span className="text-sm text-gray-500">{thread.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{thread.content}</p>
                      <div className="flex items-center mt-2 space-x-4">
                        <button className="text-sm text-indigo-600 hover:text-indigo-700 !rounded-button whitespace-nowrap">
                          <i className="fas fa-reply mr-1"></i> Reply
                        </button>
                        <span className="text-sm text-gray-500">
                          <i className="fas fa-comment-alt mr-1"></i> {thread.replyCount} replies
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Knowledge Base */}
          <div className="col-span-6 bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-semibold mb-4">Knowledge Base</h2>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium">Getting Started Guide</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Complete guide to help new team members get started with our collaboration tools and workflows.
                </p>
                <div className="flex items-center mt-2">
                  <span className="text-sm text-gray-500">Last updated: March 1, 2025</span>
                </div>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-medium">Best Practices for Remote Collaboration</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Learn about the most effective ways to collaborate with your team remotely.
                </p>
                <div className="flex items-center mt-2">
                  <span className="text-sm text-gray-500">Last updated: March 2, 2025</span>
                </div>
              </div>
            </div>
          </div>

          {/* Client Portal Preview */}
          <div className="col-span-3 bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-semibold mb-4">Client Portal Preview</h2>
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Project Dashboard</h3>
                <button className="text-sm text-indigo-600 hover:text-indigo-700 !rounded-button whitespace-nowrap">
                  <i className="fas fa-edit mr-1"></i> Edit
                </button>
              </div>
              <img
                src="https://public.readdy.ai/ai/img_res/493d9fbf9ee5cb63346999192044ec5a.jpg"
                alt="Dashboard Preview"
                className="w-full rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Team Activity Timeline */}
        <div className="mt-6 bg-white rounded-lg shadow-sm p-4">
          <h2 className="text-lg font-semibold mb-4">Team Activity</h2>
          <div ref={timelineChartRef} style={{ height: '300px' }}></div>
        </div>
      </div>

      {/* Notification Dropdown */}
      {showNotifications && (
        <div className="absolute top-16 right-4 w-80 bg-white rounded-lg shadow-lg border">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Notifications</h3>
              <button 
                className="text-sm text-indigo-600 hover:text-indigo-700 !rounded-button whitespace-nowrap"
                onClick={() => {
                  setNotifications(notifications.map(n => ({ ...n, isRead: true })));
                }}
              >
                Mark all as read
              </button>
            </div>
            <div className="space-y-3">
              {notifications.map(notification => (
                <div 
                  key={notification.id} 
                  className={`p-3 rounded-lg ${notification.isRead ? 'bg-gray-50' : 'bg-indigo-50'}`}
                >
                  <div className="flex items-start">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">{notification.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{notification.content}</p>
                      <span className="text-xs text-gray-500 mt-1 block">{notification.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

