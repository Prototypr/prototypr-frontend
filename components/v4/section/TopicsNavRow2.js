import Container from "@/components/container";
import GiantTag from "../tag/GiantTag";
import {Compass} from '@/components/icons'
import { useEffect, useState } from "react";

const tags = {
  accessibility: {
    name: "Accessibility",
    link: "/topic/accessibility/page/1",
    slug: "accessibility",
    related: ["inclusive-design", "wcag", "screen-readers"]
  },
  ai: {
    name: "AI",
    link: "/topic/ai/page/1",
    slug: "ai",
    related: ["machine-learning", "natural-language-processing", "computer-vision"]
  },
  branding: {
    name: "Branding",
    link: "/topic/branding/page/1",
    slug: "branding",
    related: ["logo-design", "brand-identity", "color-theory"]
  },
  figma: {
    name: "Figma",
    link: "/topic/figma/page/1",
    slug: "figma",
    related: ["prototyping", "design-systems", "collaboration"]
  },
  notion: {
    name: "Notion",
    link: "/topic/notion/page/1",
    slug: "notion",
    related: ["productivity", "knowledge-management", "collaboration"]
  },
  interview: {
    name: "Interview",
    link: "/topic/interview/page/1",
    slug: "interview",
    related: ["career-advice", "job-search", "portfolio"]
  },
  "open-source": {
    name: "Open Source",
    link: "/topic/open-source/page/1",
    slug: "open-source",
    related: ["github", "collaboration", "community"]
  },
  psychology: {
    name: "Psychology",
    link: "/topic/design-psychology/page/1",
    slug: "psychology",
    related: ["cognitive-bias", "user-behavior", "emotional-design"]
  },
  ui: {
    name: "UI",
    link: "/topic/ui/page/1",
    slug: "ui",
    related: ["visual-design", "interaction-design", "design-systems"]
  },
  ux: {
    name: "UX",
    link: "/topic/ux/page/1",
    slug: "ux",
    related: ["user-research", "information-architecture", "usability"]
  },
  "user-research": {
    name: "User Research",
    link: "/topic/user-research/page/1",
    slug: "user-research",
    related: ["usability-testing", "interviews", "surveys"]
  },
  career: {
    name: "Career",
    link: "/topic/career/page/1",
    slug: "career",
    related: ["job-search", "skill-development", "networking"]
  },
};

const TagsNavRow = ({currentPage, activeTag, path}) => {
  const [orderedTags, setOrderedTags] = useState([])

  useEffect(() => {
    const reordered = orderTags(tags, activeTag, path)
    setOrderedTags(reordered)
  }, [activeTag, currentPage, path])

  return (
    <Container padding={false} maxWidth={"max-w-[1320px] mx-auto mb-4 px-3 md:px-3"}>
      <div key={activeTag} className="flex flex-wrap gap-2">
        <GiantTag classes={`${currentPage=='topics'?'border border-gray-800':''} pl-2 mr-3`} link={`/topics`}>
          <div className="flex">
            <Compass weight={`${currentPage=='topics'?'fill':'regular'}`} size={24} />
            <div className="ml-2 my-auto">Explore topics</div>
          </div>
        </GiantTag>
        {orderedTags.map((tag, index) => (
          <GiantTag key={tag.slug} active={activeTag === tag.slug} link={`${tag.link || "/"}`}>
            {tag.name}
          </GiantTag>
        ))}
      </div>
    </Container>
  );
};

const orderTags = (tags, activeTag, path) => {
  const allTags = Object.values(tags);
  if (!activeTag) return allTags;

  const activeTagObj = tags[activeTag];
  if (activeTagObj) {
    // If the active tag is a top-level tag
    const relatedTags = activeTagObj.related.map(slug => ({
      name: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
      link: `/${path || 'topic'}/${slug}/page/1`,
      slug: slug
    }));
    return [activeTagObj, ...relatedTags, ...allTags.filter(tag => tag.slug !== activeTag)];
  } else {
    // If the active tag is a child tag
    const parentTag = Object.values(tags).find(tag => tag.related.includes(activeTag));
    if (parentTag) {
      const activeChildTag = {
        name: activeTag.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        link: `/${path || 'topic'}/${activeTag}/page/1`,
        slug: activeTag
      };
      const siblingTags = parentTag.related
        .filter(slug => slug !== activeTag)
        .map(slug => ({
          name: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
          link: `/${path || 'topic'}/${slug}/page/1`,
          slug: slug
        }));
      return [activeChildTag, parentTag, ...siblingTags, ...allTags.filter(tag => tag.slug !== parentTag.slug)];
    }
  }
  
  // If the active tag is not found, return all tags
  return allTags;
};

export default TagsNavRow;