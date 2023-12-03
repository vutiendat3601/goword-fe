import './reset.css';
import '../../assets/font/font.css';
import './GlobalStyle.css';
import { ReactNode } from 'react';

interface GlobalStyleProps {
  children: ReactNode;
}

function GlobalStyle({ children }: GlobalStyleProps) {
  return <>{children}</>;
}

export default GlobalStyle;
