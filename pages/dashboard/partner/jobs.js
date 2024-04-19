import DashboardNavigation from "@/components/DashboardPartners/DashboardNavigation";
import Layout from "@/components/layout-dashboard";
import CompanyNav from "@/components/Sponsor/CompanyNav";
import useUser from "@/lib/iron-session/useUser";

import ListSponsors from "@/components/DashboardPartners/ListSponsors";
import ListJobs from "@/components/DashboardPartners/ListJobs";

const AdsDashbaord = () => {
  const { user } = useUser({
    // redirectTo: '/account',
    redirectIfFound: false,
  });

  return (
    <>
      {user?.isLoggedIn && (
        <Layout navType={"simple"} showWriteButton={false} showJobsButton={true} >
          <div
            className="pb-20 mx-auto px-2 sm:px-6 lg:px-8 "
            style={{ maxWidth: 1200 }}
          >
            {user?.profile?.activeCompany && <CompanyNav user={user} />}
            <div
              className={`${user?.profile?.activeCompany ? "pt-8" : ""} flex w-full max-w-6xl mx-auto flex-col md:flex-row`}
            >
              <DashboardNavigation activeTab={3} />
              <div className="w-full mx-auto px-2 sm:pr-0 sm:pl-6 lg:pl-8">
                <div className="pt-6 pb-10 px-0 xl:px-0">
                  <div className="bg-white rounded-xl p-6 border border border-gray-300/70">
                    <h2 className={`text-xl font-medium mb-6`}>Jobs</h2>
                    <ListJobs />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      )}
    </>
  );
};

export default AdsDashbaord;
