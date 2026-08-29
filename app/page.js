import VideoIntro from "@/components/VideoIntro/VideoIntro";
import SectionNav from "@/components/ui/SectionNav";
import SelectedWork from "@/components/sections/SelectedWork";
import Research from "@/components/sections/Research";
import Leadership from "@/components/sections/Leadership";
import Work from "@/components/sections/Work";
import Contact from "@/components/sections/Contact";

/**
 * Page order is deliberate. A reviewer lands on the hero, then meets evidence
 * immediately: shipped projects, then research, then employment, then the
 * leadership and awards that back all three.
 *
 * SectionNav sits directly after the hero so it only pins once the video has
 * scrolled away, and every section below is collapsible so the page can be
 * folded down to a scannable index rather than one long scroll.
 */
const WORK_ID = "work";
const RESEARCH_ID = "research";
const EXPERIENCE_ID = "experience";
const LEADERSHIP_ID = "leadership";

export default function Page() {
  return (
    <main>
      <VideoIntro nextSectionId={WORK_ID} />
      <SectionNav />
      <SelectedWork id={WORK_ID} />
      <Research id={RESEARCH_ID} />
      <Work id={EXPERIENCE_ID} />
      <Leadership id={LEADERSHIP_ID} />
      <Contact id="contact" />
    </main>
  );
}
