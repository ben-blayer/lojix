"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, PlayCircle } from 'lucide-react';
import { ROUTES } from '@/utils/constants';

export const QuickActionButtons: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.8 }}
    className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4"
  >
    <Link href={ROUTES.exercises} className="md:col-span-1">
      <Card className="card-hover border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white cursor-pointer">
        <CardContent className="p-6 text-center">
          <BookOpen className="w-8 h-8 mx-auto mb-2" />
          <h3 className="font-bold hebrew-font">תרגילים</h3>
          <p className="text-sm text-green-100 hebrew-font">תרגול מקצועי</p>
        </CardContent>
      </Card>
    </Link>

    <Link href={ROUTES.lessons} className="md:col-span-1">
      <Card className="card-hover border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white cursor-pointer">
        <CardContent className="p-6 text-center">
          <PlayCircle className="w-8 h-8 mx-auto mb-2" />
          <h3 className="font-bold hebrew-font">שיעורים</h3>
          <p className="text-sm text-purple-100 hebrew-font">הסברים ויזואליים</p>
        </CardContent>
      </Card>
    </Link>
  </motion.div>
);