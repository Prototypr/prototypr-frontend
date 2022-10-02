import Container from "./container";
import Link from "next/link";
import { useIntl } from "react-intl";
import dynamic from "next/dynamic";
const SignupHorizontal = dynamic(
  () => import("@/components/newsletter/SignupHorizontal"),
  { ssr: true }
);

export default function Footer() {
  const intl = useIntl();
  return (
    <footer className="bg-accent-1 border-accent-2">
      <Container>
        <div className="w-full max-w-screen-xl relative mx-auto py-16 px-6">
          <div className="flex flex-wrap">
            <div className="w-full md:w-6/12">
              <p className="text-xl font-semibold">
                {intl.formatMessage({ id: "footer.title" })}
              </p>
              <input className="hidden" defaultValue={"hello@prototypr.io"} />

              <p className="text-base mt-0 text-gray-700">
                {intl.formatMessage({ id: "footer.subtitle" })} 💌
              </p>

              <SignupHorizontal className="sm:flex w-11/12 mt-5" />
              {/* <HookForm onSubmit={onSubmit} buttonText={buttonText} /> */}
              <p className="text-sm mt-6 text-gray-800 font-semibold">
                {intl.formatMessage({ id: "footer.author1" })}{" "}
                <a
                  className="text-blue-800 underline"
                  href="https://twitter.com/annchichii"
                >
                  Ann
                </a>
                ,{" "}
                <a
                  className="text-blue-800 underline"
                  href="https://twitter.com/graeme_fulton"
                >
                  Graeme
                </a>
                , {intl.formatMessage({ id: "footer.author2" })}{" "}
                <a
                  className="text-blue-800 underline"
                  href="https://twitter.com/iamsofiamm"
                >
                  Sofia
                </a>
                . {intl.formatMessage({ id: "footer.author3" })}{" "}
                <a
                  className="text-blue-800 underline"
                  href="https://twitter.com/thisismimiespi"
                >
                  Mimi
                </a>
                .
              </p>
              <p className="text-sm text-gray-700 font-semibold mt-2">
                {" "}
                © 2020 Prototpyr,{" "}
                {intl.formatMessage({ id: "footer.copyright" })}
              </p>
            </div>

            <div className="w-full md:w-6/12">
              <div className="flex flex-wrap items-top mb-6">
                <div className="w-full md:w-6/12 xl:w-4/12 pt-6 md:pt-0 md:px-4 ml-auto">
                  <span className="block uppercase text-gray-900 text-sm font-semibold mb-2">
                    {intl.formatMessage({ id: "footer.rightCat1" })}
                  </span>
                  <ul className="list-unstyled">
                    <li>
                      <a
                        className="text-gray-700 hover:text-gray-900 font-base block py-3 text-base"
                        rel="noreferrer"
                        href="https://github.com/Prototypr"
                        target="_blank"
                      >
                        {intl.formatMessage({ id: "footer.rightCat2" })}
                      </a>
                    </li>
                    <li>
                      {/* <Link href="/posts" as="/posts"> */}
                        <a href="https://open.prototypr.io" target="_blank" className="text-gray-700 hover:text-gray-900 font-base block py-3 text-base">
                          {intl.formatMessage({ id: "footer.rightCat3" })}
                        </a>
                      {/* </Link> */}
                    </li>
                    <li>
                      <a
                        className="text-gray-700 hover:text-gray-900 font-base block py-3 text-base"
                        rel="noreferrer"
                        href="https://twitter.com/prototypr"
                        target="_blank"
                      >
                        Twitter
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-gray-700 hover:text-gray-900 font-base block py-3 text-base"
                        rel="noreferrer"
                        href="https://instagram.com/prototyprio"
                        target="_blank"
                      >
                        Instagram
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="w-full md:w-6/12 xl:w-4/12 pt-6 md:pt-0 ml-auto">
                  <span className="block uppercase text-gray-900 text-sm font-semibold mb-2">
                    {intl.formatMessage({ id: "footer.otherResource" })}
                  </span>
                  <ul className="list-unstyled">
                  <li>
                      <a
                        className="text-gray-700 hover:text-gray-900 font-base block py-3 text-base"
                        rel="noreferrer"
                        href="https://adobe.com/products/xd/adobe-fund.html"
                        target="_blank"
                      >
                        {intl.formatMessage({ id: "footer.other1" })}
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-gray-700 hover:text-gray-900 font-base block py-3 text-base"
                        rel="noreferrer"
                        href="https://grantfortheweb.org"
                        target="_blank"
                      >
                        {intl.formatMessage({ id: "footer.other5" })}
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-gray-700 hover:text-gray-900 font-base block py-3 text-base"
                        rel="noreferrer"
                        href="https://interledger.org/"
                        target="_blank"
                      >
                        {intl.formatMessage({ id: "footer.other2" })}
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-gray-700 hover:text-gray-900 font-base block py-3 text-base"
                        rel="noreferrer"
                        href="https://letter.so"
                        target="_blank"
                      >
                        {intl.formatMessage({ id: "footer.other3" })}
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-gray-700 hover:text-gray-900 font-base block py-3 text-base"
                        rel="noreferrer"
                        href="https://prototypr.io/privacy-policy/"
                        target="_blank"
                      >
                        {intl.formatMessage({ id: "footer.other4" })}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
