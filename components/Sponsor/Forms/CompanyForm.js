import { FormContainer } from "@/components/Jobs/FormStepper";
import { FormInput } from "@/components/Jobs/FormInput";
import ImageUploader from "@/components/ImageUploader/ImageUploader";


const styles = {
    input:
      "w-full px-3 max-w-xl  bg-white text-black font-normal text-sm rounded-xl border border-2 border-gray-300 focus:outline-none focus:ring-1  focus:ring-blue-200",
    inputFlex:
      "px-3 bg-white text-black font-normal text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-1  focus:ring-blue-200",
    label: "text-md font-medium uppercase text-gray-700 font-semibold",
    inputError: "text-sm font-medium uppercase text-red-400",
  };

const CompanyForm = ({ formik, user, setUploadNewCompanyImage, defaultCompany }) => {
  return (
    <div>
      {user?.isLoggedIn ? (
        <div className="">
          <FormContainer>
            <div className="flex flex-col gap-5">
              <h1 className="text-xl font-semibold">Company Info</h1>
              <p className="text-gray-500 mb-3 -mt-2">
               This company information will be used in your sponsorships and job posts.
              </p>

              {/* <h1 className="text-sm text-gray-400 tracking-wide uppercase font-bold">Company Information</h1> */}
              <FormInput
                id="companyName"
                label="What's your company/brand called?"
                error={formik.errors}
              >
                <input
                  id={3}
                  name="companyName"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.companyName}
                  placeholder="Unicorn Platform"
                  className={styles.input}
                />
              </FormInput>
              <label htmlFor="companyLogo" className="text-md font-medium">
                Your company/brand logo
              </label>
              <ImageUploader
                id={3}
                companyLogoIsDefault={true}
                initialImage={defaultCompany?.logo}
                setFormValue={blob => {
                  setUploadNewCompanyImage(true);
                  formik.setFieldValue("companyLogo", blob);
                }}
              />
              {formik.errors.companyLogo && (
                <span className="text-red-600 text-sm">
                  {formik.errors.companyLogo}
                </span>
              )}

              <div className="mt-2">
                <FormInput
                  id="companyWebsite"
                  label="Company Website"
                  error={formik.errors}
                >
                  <input
                    id="companyWebsite"
                    name="companyWebsite"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.companyWebsite}
                    placeholder="https://unicornplatform.com"
                    className={styles.input}
                  />
                </FormInput>
              </div>
              <div className="mt-2">
                <FormInput
                  id="contactEmail"
                  label="Company Email"
                  error={formik.errors}
                >
                  <input
                    id="contactEmail"
                    name="contactEmail"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.contactEmail}
                    placeholder="hello@unicorns.xyz"
                    className={styles.input}
                  />
                </FormInput>
              </div>
            </div>
          </FormContainer>
        </div>
      ) : null}
    </div>
  );
};

export default CompanyForm;