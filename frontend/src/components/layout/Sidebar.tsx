'use client';

import Link from 'next/link';
import { Bookmark, Heart, Bell, Settings } from 'lucide-react';

const Sidebar = () => {
  const sidebarItems = [
    { icon: Bookmark, label: 'Saved Stories', href: '/saved' },
    { icon: Heart, label: 'Likes', href: '/likes' },
    { icon: Bell, label: 'Notifications', href: '/notifications' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ];

  return (
    <aside className="hidden lg:block w-64 bg-dark-900 border-r border-dark-800 p-4 h-screen sticky top-16">
      <div className="space-y-2">
        <h3 className="px-4 py-2 text-xs font-semibold text-dark-500 uppercase tracking-wider">
          Menu
        </h3>
        {sidebarItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-dark-800 transition-colors text-dark-300 hover:text-white"
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>

      {/* Topics */}
      <div className="mt-8">
        <h3 className="px-4 py-2 text-xs font-semibold text-dark-500 uppercase tracking-wider">
          Topics
        </h3>
        <div className="space-y-2">
          {['Technology', 'Sports', 'Finance', 'Entertainment', 'Science'].map((topic) => (
            <Link
              key={topic}
              href={`/topic/${topic.toLowerCase()}`}
              className="block px-4 py-2 rounded-lg hover:bg-dark-800 transition-colors text-dark-400 hover:text-white text-sm"
            >
              {topic}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
