import Container from "@/components/container";
import Layout from "@/components/layout";
import UserForm from "@/components/user/UserForm";
import Head from "next/head";

const AccountPage = ({ preview }) => {
  return (
    <Layout preview={preview}>
      <Head>
        <title>Account Settings</title>
      </Head>
      <Container>
        <div className="bg-white shadow-md rounded-lg py-6 px-4">
          <h1 className="font-semibold">Public Profile</h1>
          <span className="text-sm text-gray-400">
            This information will be displayed publicly on your profile
          </span>
          <UserForm />
        </div>
      </Container>
    </Layout>
  );
};

// export async function getServerSideProps(context) {
//   const session = await getSession({
//     req: context.req,
//   });

//   const userData = await getUserInfo(session.id);
//   console.log(userData);
//   return {
//     props: {}, // will be passed to the page component as props
//   };
// }

export default AccountPage;
