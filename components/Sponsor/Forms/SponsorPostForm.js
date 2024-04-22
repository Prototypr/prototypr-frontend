import { FormContainer } from "@/components/Jobs/FormStepper";
import { FormInput } from "@/components/Jobs/FormInput";
import MiniEditor from "@/components/MiniEditor/MiniEditor";
import ImageUploader from "@/components/ImageUploader/ImageUploader";

const styles = {
  input:
    "w-full px-3 max-w-xl bg-white text-black font-normal text-base rounded-xl border border-2 border-gray-300 focus:outline-none focus:ring-1  focus:ring-blue-200",
  inputFlex:
    "px-3 bg-white text-black font-normal text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-1  focus:ring-blue-200",
  label: "text-md font-medium text-gray-800  uppercase text-gray-800 font-semibold",
  inputError: "text-xs font-medium uppercase text-red-400",
};

const SponsorPostForm = ({
  user,
  formik,
  setUploadNewBanner,
  setUploadNewFeaturedImage,
  postObject,
  header,
  subtext
}) => {
  return (
    <div className="p-6 bg-white rounded-xl border border-gray-300/70">
      <FormContainer>
        <div className="flex flex-col mx-auto gap-5 max-w-2xl  w-auto">
          <h1 className="text-xl font-semibold">{header?header:`Create Your Ad`}</h1>
          <p className="text-gray-500 text-sm max-w-lg mb-3 -mt-3">
           {subtext?subtext: `Add your product title, description, and media that will be used in
            the sponsor slots and banners.`}
          </p>

          {!user?.isLoggedIn ? (
            <FormInput
              id="sponsorEmail"
              label="Contact Email"
              error={formik.errors}
            >
              <input
                id="sponsorEmail"
                name="sponsorEmail"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.sponsorEmail}
                placeholder="hello@unicorns.xyz"
                className={styles.input}
              />
            </FormInput>
          ) : null}

          <FormInput id="title" label="Product Name" error={formik.errors}>
            <input
              id="title"
              name="title"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.title}
              placeholder="Unicorn Platform"
              className={styles.input}
            />
            {/* <p class="text-sm mt-1 text-gray-500">The name of your product or an advert headline</p> */}
          </FormInput>

          <div className="mt-3">
            <FormInput id="link" label="Link" error={formik.errors}>
              <input
                id="link"
                name="link"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.link}
                placeholder="https://prototypr.io/web-monetization"
                className={styles.input}
              />
            </FormInput>
          </div>
          <label className="text-md font-medium text-gray-800  mt-4">Short Description</label>
          <p class="text-sm -mt-4 mb-2 text-gray-500">
            A brief description or tagline of 1-2 sentences to fit in the
            newsletter.
          </p>

          <MiniEditor
           initialContent={formik.values.description?formik.values.description:''} 
            height={110}
            setDescription={html => {
              formik.setFieldValue("description", html);
            }}
          />
          {formik.errors.description && (
            <span className="text-red-600 text-sm">
              {formik.errors.description}
            </span>
          )}
          {/* <br />
          <hr /> */}
          {/* <h2 className="mt-3 text-xl mt-4">Image Assets</h2> */}
          <label htmlFor="featuredImage" className="text-md mt-3 font-medium text-gray-800 ">
            Logo
          </label>
          {/* <p className="text-sm -mt-3">
            This image will be used to identify your product in the newsletter
            and on the website.
          </p> */}
          <ImageUploader
           initialImage={postObject?.featuredImage}
            id={1}
            setFormValue={blob => {
              setUploadNewFeaturedImage(true);
              formik.setFieldValue("featuredImage", blob);
            }}
          />
          {formik.errors.featuredImage && (
            <span className="text-red-600 text-sm">
              {formik.errors.featuredImage}
            </span>
          )}

          <label htmlFor="banner" className="text-md font-medium text-gray-800 ">
            Newsletter Banner
          </label>
          <ImageUploader
          initialImage={postObject?.banner} 
            placeholderImageUrl={
              "https://prototypr-media.sfo2.digitaloceanspaces.com/strapi/176d3d79cb9ad1acc057fb0eb3fe72d0.jpeg"
            }
            id={2}
            w={600}
            h={300}
            setFormValue={blob => {
              setUploadNewBanner(true);
              formik.setFieldValue("banner", blob);
            }}
          />
          {formik.errors.banner && (
            <span className="text-red-600 text-sm">{formik.errors.banner}</span>
          )}
        </div>
      </FormContainer>
    </div>
  );
};

export default SponsorPostForm;
