import useUser from "@/lib/iron-session/useUser";
import { useState } from "react";

import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  "https://xgujrrucqvgmligelvjn.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhndWpycnVjcXZnbWxpZ2VsdmpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzM1MDUxNDMsImV4cCI6MTk4OTA4MTE0M30.AcZ7WXmgsLUP4AYru37VZTNhft5CuXHanp4uJy5wd24"
);

const tags = [
  {
    name: "Accessibility",
    link: "/posts/accessibility/page/1",
  },
  {
    name: "AI",
    link: "/posts/ai/page/1",
  },
  {
    name: "Open Source",
    link: "/posts/open-source/page/1",
  },
  {
    name: "Branding",
    link: "/posts/branding/page/1",
  },
  {
    name: "UI",
    link: "/posts/ui/page/1",
  },
  {
    name: "Figma",
    link: "/posts/figma/page/1",
  },
  {
    name: "User Research",
    link: "/posts/user-research/page/1",
  },
  {
    name: "Notion",
    link: "/posts/notion/page/1",
  },
  {
    name: "Web Monetization",
    link: "/posts/web-monetization/page/1",
  },
];

const TopicSubscription = () => {
  const [showEmailInput, toggleEmailInput] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [userEmail, setUserEmail] = useState(undefined);

  const { user } = useUser({
    redirectIfFound: false,
  });

  const { id: strapiId, email } = user;

  function subscribeToTopic(topic) {
    setSelectedTopic(topic);
    // if email found, call the subscribe function
    // if not, show a modal to ask for an email, then add it to strapi. Then run the subscribe function
    if (email || userEmail) {
      console.log("got email, subbing");
      const topicObject = {
        email: email || userEmail,
        topic: topic,
        userId: strapiId,
        isSubscribed: true,
      };
      toggleEmailInput(false);
      addTopicToSupabase(topicObject);
    } else {
      toggleEmailInput(true);
    }
  }

  async function addTopicToSupabase(topicObject) {
    console.log("adding topic to supabase", topicObject);
    const response = await supabase
      .from("TopicSubsriptions")
      .insert(topicObject);

    console.log("response -", response);
  }

  return (
    <div className="p-10 bg-white rounded-lg">
      <h1>Subscribe to topics</h1>
      <p>
        You'll recieve email notifications when new things happen for topics
        you've subscribed to{" "}
      </p>
      <div className="flex flex-row gap-1">
        {tags.map((t) => {
          return (
            <button
              onClick={() => {
                subscribeToTopic(t.name);
              }}
              className="border px-3 py-2"
            >
              {t.name}
            </button>
          );
        })}
      </div>
      <div>
        {showEmailInput && (
          <div className="my-4 flex flex-row gap-2">
            <input
              value={userEmail}
              onChange={(e) => {
                setUserEmail(e.target.value);
              }}
              type={"email"}
              placeholder="email"
            ></input>
            <button
              className="bg-blue-500 p-2 text-white"
              onClick={() => {
                // validate email
                const topicObject = {
                  email: userEmail,
                  topic: selectedTopic,
                  userId: strapiId,
                  isSubscribed: true,
                };
                addTopicToSupabase(topicObject);
              }}
            >
              Subscribe
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopicSubscription;
