import Alert from './alert'
import Footer from './footer'
import Meta from './meta'
import Navbar from './navbar'

export default function Layout({ preview, children, activeNav }) {
  return (
    <>
      <Meta />
      <Navbar activeNav={activeNav}/>
      <div className="min-h-screen px-3 md:px-8 bg-gray-200">
        {/* <Alert preview={preview} /> */}
        <main className="pt-20">{children}</main>
      </div>
      <Footer />
    </>
  )
}
