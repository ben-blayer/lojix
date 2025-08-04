"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlayCircle } from 'lucide-react';
import { RecommendedActivity } from '@/types';
import { generateUniqueKey } from '@/utils/helpers';

interface RecommendedActivitiesCardProps {
  activities: RecommendedActivity[];
}

export const RecommendedActivitiesCard: React.FC<RecommendedActivitiesCardProps> = ({ activities }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.7 }}
  >
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 hebrew-font">
          <PlayCircle className="w-5 h-5 text-purple-500" />
          מומלץ עבורך
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <Link
              href={`/${activity.type === "exercise" ? "excercise-runner" : "lessons"}?id=${activity.id}`}
              key={generateUniqueKey(activity.type, activity.id, index)}
            >
              <div className="p-4 bg-gray-50 rounded-lg card-hover cursor-pointer">
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 ${activity.color} rounded-lg flex items-center justify-center text-white text-xl`}>
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium hebrew-font">{activity.title}</h3>
                    <p className="text-sm text-gray-600 hebrew-font mt-1">{activity.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">{activity.difficulty}</Badge>
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 text-xs">
                        {activity.points} נקודות
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  </motion.div>
);