import Alert from './alert'
import Footer from './footer'
import Meta from './meta'
import Navbar from './navbar'

export default function Layout({ preview, children, activeNav }) {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        {/* <Alert preview={preview} /> */}
        <Navbar activeNav={activeNav}/>
        <main className="pt-20">{children}</main>
      </div>
      <Footer />
    </>
  )
}
