import Container from './container'
import { EXAMPLE_PATH } from '@/lib/constants'
import { useIntl } from 'react-intl';
export default function Footer() {
  const intl = useIntl();
  return (
    <footer className="bg-accent-1 border-accent-2">
      <Container>
        <div className="py-28 flex flex-col lg:flex-row items-center">
          <h3 className="text-4xl lg:text-5xl font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
          {intl.formatMessage({ id: "footer.title"})}
          </h3>
          <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/2">
            <a
              href="https://nextjs.org/docs/basic-features/pages"
              className="mx-3 bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0"
            >
             {intl.formatMessage({ id: "footer.button"})}
            </a>
            <a
              href={`https://github.com/vercel/next.js/tree/canary/examples/${EXAMPLE_PATH}`}
              className="mx-3 font-bold hover:underline"
            >
              {intl.formatMessage({ id: "footer.link"})}
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}
