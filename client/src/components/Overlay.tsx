import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface OverlayProps {
  handleClick: () => void;
  children: ReactNode;
}

function Overlay({ handleClick, children }: OverlayProps) {
  const overlay = (
    <div
      className="fixed top-0 z-30 grid h-screen w-screen place-items-center bg-black bg-opacity-70 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClick();
        }
      }}
    >
      {children}
    </div>
  );

  return createPortal(overlay, document.getElementById('root')!);
}

export default Overlay;
