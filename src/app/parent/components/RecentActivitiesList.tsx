"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RecentActivity } from '@/types';
import { getActivityColor, getActivityIcon } from '@/utils/helpers';

interface RecentActivitiesListProps {
  activities: RecentActivity[];
}

export const RecentActivitiesList: React.FC<RecentActivitiesListProps> = ({ activities }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.9 }}
    className="lg:col-span-2"
  >
    <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="hebrew-font">פעילות אחרונה</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getActivityColor(activity.type)}`}>
                  <span className="text-lg">{getActivityIcon(activity.type)}</span>
                </div>
                <div>
                  <p className="font-medium hebrew-font">{activity.title}</p>
                  <p className="text-sm text-gray-500 hebrew-font">
                    {activity.date} • {activity.duration} דקות
                  </p>
                </div>
              </div>
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800"
              >
                {activity.score}%
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </motion.div>
);