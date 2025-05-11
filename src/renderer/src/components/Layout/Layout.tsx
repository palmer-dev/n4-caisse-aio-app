import { FC, ReactNode } from 'react'

type LayoutProps = {
  children: ReactNode
}

type LayoutSubComponentProps = {
  children: ReactNode
}

// Sous-composants
const Sidebar: FC<LayoutSubComponentProps> = ({ children }) => {
  return <aside className="flex-1">{children}</aside>
}

const Content: FC<LayoutSubComponentProps> = ({ children }) => {
  return <main className="flex-[2]">{children}</main>
}

// Interface avec sous-composants attachés
interface LayoutComponent extends FC<LayoutProps> {
  Sidebar: FC<LayoutSubComponentProps>
  Content: FC<LayoutSubComponentProps>
}

// Définir la fonction Layout
const LayoutBase: FC<LayoutProps> = ({ children }) => {
  return <div className="flex w-full h-full">{children}</div>
}

// Attacher les sous-composants
const Layout = LayoutBase as LayoutComponent
Layout.Sidebar = Sidebar
Layout.Content = Content

export default Layout
