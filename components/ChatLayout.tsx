'use client';

import { ReactNode, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MenuIcon, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatLayoutProps {
  children: ReactNode;
  leftSidebar: ReactNode;
  rightSidebar: ReactNode;
  className?: string;
}

export function ChatLayout({ children, leftSidebar, rightSidebar, className }: ChatLayoutProps) {
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false);

  return (
    <div className={`h-screen w-full gradient-bg flex ${className}`}>
      {/* Desktop Left Sidebar */}
      <div className="hidden lg:flex w-80 glass-card border-r border-purple-500/30 flex-col">
        {leftSidebar}
      </div>

      {/* Mobile Left Drawer Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="ghost"
          size="icon"
          className="glass-card neon-outline"
          onClick={() => setLeftDrawerOpen(true)}
        >
          <MenuIcon className="size-5 text-white" />
        </Button>
      </div>

      {/* Center Chat Container */}
      <div className="flex-1 flex flex-col relative min-w-0">
        {children}
      </div>

      {/* Desktop Right Sidebar */}
      <div className="hidden lg:flex w-80 glass-card border-l border-purple-500/30 flex-col">
        {rightSidebar}
      </div>

      {/* Mobile Right Drawer Toggle */}
      <div className="lg:hidden fixed top-4 right-4 z-50">
        <Button
          variant="ghost"
          size="icon"
          className="glass-card neon-outline"
          onClick={() => setRightDrawerOpen(true)}
        >
          <MenuIcon className="size-5 text-white" />
        </Button>
      </div>

      {/* Mobile Left Drawer */}
      <AnimatePresence>
        {leftDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setLeftDrawerOpen(false)}
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed left-0 top-0 h-full w-80 glass-card border-r border-purple-500/30 z-50 lg:hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-purple-500/20">
                <h2 className="text-white font-bold">Menu</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setLeftDrawerOpen(false)}
                >
                  <XIcon className="size-5 text-white" />
                </Button>
              </div>
              <div className="flex-1 overflow-y-auto">
                {leftSidebar}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Right Drawer */}
      <AnimatePresence>
        {rightDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setRightDrawerOpen(false)}
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 h-full w-80 glass-card border-l border-purple-500/30 z-50 lg:hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-purple-500/20">
                <h2 className="text-white font-bold">History</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setRightDrawerOpen(false)}
                >
                  <XIcon className="size-5 text-white" />
                </Button>
              </div>
              <div className="flex-1 overflow-y-auto">
                {rightSidebar}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
