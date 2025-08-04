"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Trophy, Target } from 'lucide-react';
import { ChildData } from '@/types';

interface ChildSelectorProps {
  childrenData: ChildData[];
  selectedChild: ChildData;
  onChildSelect: (child: ChildData) => void;
}

export const ChildSelector: React.FC<ChildSelectorProps> = ({
  childrenData,
  selectedChild,
  onChildSelect
}) => {
  if (childrenData.length <= 1) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      {childrenData.map((child) => (
        <Card
          key={child.id}
          className={`cursor-pointer transition-all duration-200 ${
            selectedChild.id === child.id
              ? "ring-2 ring-blue-500 shadow-lg"
              : "hover:shadow-md"
          }`}
          onClick={() => onChildSelect(child)}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-2xl">
                {child.avatar}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg hebrew-font">{child.name}</h3>
                <p className="text-gray-600 text-sm hebrew-font">כיתה {child.grade}</p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium">{child.total_points}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium">{child.streak_days} ימים</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Target className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium">רמה {child.current_level}</span>
                  </div>
                </div>
              </div>
              {selectedChild.id === child.id && (
                <Badge variant="default" className="bg-blue-500">
                  נבחר
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};