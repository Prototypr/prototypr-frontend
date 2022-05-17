import useUser from "@/lib/iron-session/useUser";
import Layout from "@/components/layout";
import dynamic from "next/dynamic";
const Button = dynamic(() => import('@/components/atom/Button/Button'))


export default function Login({ email }) {
  // here we just check if user is already logged in and redirect to profile
  const { mutateUser } = useUser({
    redirectTo: "/account",
    redirectIfFound: true,
  });

  return (
    <Layout>
      <div className="login bg-white p-8 rounded-lg -mt-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-2xl font-bold mb-6">Check your email</h1>

        <p className="mb-6">
          A magic link has been sent you your email address
          {email && `, ${email}`}. Click the link to sign in.
        </p>
        <a href="/early-acess">
          <Button color="primary">Back to sign in</Button>
        </a>
      </div>
      <style jsx>{`
        .login {
          width: 32rem;
        }
      `}</style>
    </Layout>
  );
}

Login.getInitialProps = async (context) => {
  return {
    email: context.query.email,
  };
};
