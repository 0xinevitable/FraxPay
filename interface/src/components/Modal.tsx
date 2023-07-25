import styled from '@emotion/styled';
import { AnimatePresence, MotionProps, motion } from 'framer-motion';
import { X } from 'lucide-react';

import { Portal } from './Portal';
import { Button } from './ui/button';

const backgroundMotion: MotionProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 },
};
const containerMotion: MotionProps = {
  initial: { opacity: 0, transform: 'translate3d(-50%, 50%, 0)' },
  animate: { opacity: 1, transform: 'translate3d(-50%, -50%, 0)' },
  exit: { opacity: 0, transform: 'translate3d(-50%, 50%, 0)' },
  transition: { duration: 0.2 },
};

export type ModalProps = {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};
export const Modal: React.FC<ModalProps> = ({
  title,
  isOpen,
  onClose,
  children,
}) => {
  return (
    <Portal>
      <AnimatePresence initial={false}>
        {isOpen && <Background {...backgroundMotion} key="modal-background" />}
        {isOpen && (
          <Container
            className="w-full max-w-md p-5 pb-8 bg-zinc-900 rounded-3xl"
            key="modal"
            {...containerMotion}
          >
            <div className="flex flex-col w-full gap-3">
              <div className="flex items-center justify-between w-full">
                {title && (
                  <h3 className="text-2xl truncate text-slate-100">{title}</h3>
                )}
                <Button
                  onClick={() => onClose()}
                  className="flex items-center justify-center w-12 h-12 p-0 ml-auto"
                  variant="outline"
                >
                  <X className="text-slate-200" />
                </Button>
              </div>
              {children}
            </div>
          </Container>
        )}
      </AnimatePresence>
    </Portal>
  );
};

const Background = styled(motion.div)`
  width: 100%;
  height: 100%;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;

  background-color: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(12px);
`;
const Container = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, 100%, 0);
  z-index: 200;

  overflow: hidden;
  display: flex;
  flex-direction: column;
`;
