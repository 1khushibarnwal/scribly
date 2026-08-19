import { Link } from "react-router";
import {
  NotebookPenIcon,
  ShieldCheckIcon,
  ZapIcon,
  SparklesIcon,
  UserPlusIcon,
  PenLineIcon,
  FolderCheckIcon,
  CheckIcon,
  XIcon,
} from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const faqs = [
  {
    q: "Is Scribly really free?",
    a: "Yes. There's no paid tier, no credit card required, and no feature is locked behind a subscription.",
  },
  {
    q: "Can anyone else see my notes?",
    a: "No. Every note is tied only to your account. The only way someone else can view a note is if you explicitly turn on sharing for that specific note and send them the link.",
  },
  {
    q: "What happens if I delete my account?",
    a: "It's permanent. Your account and every note you've written are erased immediately and cannot be recovered — we ask you to type a confirmation phrase before it happens, precisely because there's no undo.",
  },
  {
    q: "Does the AI summarizer read all my notes?",
    a: 'It only processes a note when you click "Summarize with AI" on that specific note. Nothing is summarized automatically or in the background.',
  },
  {
    q: "Can I export my notes if I want to leave?",
    a: "Yes, any note can be exported as a .txt or .pdf file at any time — your data isn't locked in.",
  },
  {
    q: "Can I attach images to my notes?",
    a: "Yes. Each note supports up to 5 image attachments, securely hosted and served through Cloudinary.",
  },
];

const comparisonRows = [
  {
    feature: "Free to use",
    scribly: true,
    typical: "Often freemium with limits",
  },
  {
    feature: "AI summarization built in",
    scribly: true,
    typical: false,
  },
  {
    feature: "Per-note public share links",
    scribly: true,
    typical: "Varies",
  },
  {
    feature: "Export as PDF or text",
    scribly: true,
    typical: "Varies",
  },
  {
    feature: "No folders or tags to set up first",
    scribly: true,
    typical: false,
  },
  {
    feature: "Full account deletion, no residue",
    scribly: true,
    typical: "Varies",
  },
  {
    feature: "Attach images to notes",
    scribly: true,
    typical: "Varies",
  },
];

const sectionVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

const LandingPage = () => {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="min-h-screen bg-base-200 overflow-hidden">
      <NavBar />

      {/* Hero */}
      <motion.div
        className="max-w-4xl mx-auto px-4 py-20 text-center"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.div
          variants={cardVariants}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-5"
        >
          <SparklesIcon className="size-4" />
          <span>Simple notes. Smarter recall.</span>
        </motion.div>

        <motion.h1
          variants={cardVariants}
          className="text-5xl font-bold text-primary font-mono tracking-tight mb-6"
        >
          Scribly
        </motion.h1>

        <motion.p
          variants={cardVariants}
          className="text-xl text-base-content/80 max-w-2xl mx-auto mb-10"
        >
          A fast, no-fuss place to capture your thoughts. Sign up, write a note
          in seconds, and pick up right where you left off — from anywhere.
        </motion.p>

        <motion.div
          variants={cardVariants}
          className="flex items-center justify-center gap-4 mb-4"
        >
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
            <Link to="/signup" className="btn btn-primary btn-md sm:btn-lg">
              Get Started
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
            <Link
              to="/login"
              className="btn btn-outline btn-primary btn-md sm:btn-lg"
            >
              Log In
            </Link>
          </motion.div>
        </motion.div>

        <motion.p
          variants={cardVariants}
          className="text-sm text-base-content/50"
        >
          Free to use. No credit card required.
        </motion.p>
      </motion.div>

      {/* Feature cards */}
      <motion.div
        id="features"
        className="max-w-4xl mx-auto px-4 pb-20 scroll-m-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left"
          variants={staggerContainer}
        >
          <motion.div
            variants={cardVariants}
            whileHover={{
              y: -7,
              transition: { duration: 0.2 },
            }}
            className="card bg-base-100 p-6 shadow-sm hover:shadow-lg transition-shadow duration-200"
          >
            <NotebookPenIcon className="size-8 text-primary mb-3" />

            <h3 className="font-bold text-lg mb-2">Quick capture</h3>

            <p className="text-sm text-base-content/70">
              Jot down a note the moment an idea hits — no clutter, no setup.
            </p>
          </motion.div>

          <motion.div
            variants={cardVariants}
            whileHover={{
              y: -7,
              transition: { duration: 0.2 },
            }}
            className="card bg-base-100 p-6 shadow-sm hover:shadow-lg transition-shadow duration-200"
          >
            <ShieldCheckIcon className="size-8 text-primary mb-3" />

            <h3 className="font-bold text-lg mb-2">Private by default</h3>

            <p className="text-sm text-base-content/70">
              Every note is tied to your account only — nobody else can see it.
            </p>
          </motion.div>

          <motion.div
            variants={cardVariants}
            whileHover={{
              y: -7,
              transition: { duration: 0.2 },
            }}
            className="card bg-base-100 p-6 shadow-sm hover:shadow-lg transition-shadow duration-200"
          >
            <ZapIcon className="size-8 text-primary mb-3" />

            <h3 className="font-bold text-lg mb-2">Fast and simple</h3>

            <p className="text-sm text-base-content/70">
              No folders, no tags to manage — just write, save, and find it
              later.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* How it works */}
      <div
        id="how-it-works"
        className="bg-base-300 border-y border-base-content/10 scroll-mt-20"
      >
        <motion.div
          className="max-w-4xl mx-auto px-4 py-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <motion.h2
            className="text-3xl font-bold text-center mb-12"
            variants={sectionVariants}
          >
            How it works
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
            variants={staggerContainer}
          >
            <motion.div
              className="text-center"
              variants={cardVariants}
              whileHover={{ y: -5 }}
            >
              <div className="bg-primary/10 rounded-full p-4 w-fit mx-auto mb-4">
                <UserPlusIcon className="size-7 text-primary" />
              </div>

              <h3 className="font-bold mb-2">1. Create an account</h3>

              <p className="text-sm text-base-content/70">
                Sign up in seconds with just your name, email, and a password.
              </p>
            </motion.div>

            <motion.div
              className="text-center"
              variants={cardVariants}
              whileHover={{ y: -5 }}
            >
              <div className="bg-primary/10 rounded-full p-4 w-fit mx-auto mb-4">
                <PenLineIcon className="size-7 text-primary" />
              </div>

              <h3 className="font-bold mb-2">2. Write freely</h3>

              <p className="text-sm text-base-content/70">
                Start a note whenever inspiration strikes — no structure
                required.
              </p>
            </motion.div>

            <motion.div
              className="text-center"
              variants={cardVariants}
              whileHover={{ y: -5 }}
            >
              <div className="bg-primary/10 rounded-full p-4 w-fit mx-auto mb-4">
                <FolderCheckIcon className="size-7 text-primary" />
              </div>

              <h3 className="font-bold mb-2">3. Find it later</h3>

              <p className="text-sm text-base-content/70">
                Everything's saved to your account, ready whenever you come
                back.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* AI highlight */}
      <motion.div
        className="max-w-4xl mx-auto px-4 py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <motion.div
          className="card bg-base-100 border-2 border-primary/30 p-8 text-center"
          whileHover={{
            y: -5,
            transition: { duration: 0.2 },
          }}
        >
          <motion.div
            animate={{
              scale: [1, 1.08, 1],
              rotate: [0, 4, -4, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <SparklesIcon className="size-8 text-primary mx-auto mb-3" />
          </motion.div>

          <h2 className="text-2xl font-bold mb-3">
            Let AI do the re-reading for you
          </h2>

          <p className="text-base-content/70 max-w-xl mx-auto">
            Long note? One click summarizes it into a few clear sentences, so
            you can skim your own thoughts just as easily as you wrote them.
          </p>
        </motion.div>
      </motion.div>

      {/* Comparison table */}
      <div
        id="compare"
        className="bg-base-300 border-y border-base-content/10 scroll-mt-20"
      >
        <motion.div
          className="max-w-4xl mx-auto px-4 py-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={sectionVariants}
        >
          <motion.h2
            className="text-3xl font-bold text-center mb-4"
            variants={sectionVariants}
          >
            How Scribly compares
          </motion.h2>

          <motion.p
            className="text-center text-base-content/70 mb-12 max-w-xl mx-auto"
            variants={sectionVariants}
          >
            Most notes apps make you dig through settings or upgrade to a paid
            plan to get the basics. Scribly includes them from the start.
          </motion.p>

          <motion.div className="overflow-x-auto" variants={sectionVariants}>
            <table className="table bg-base-100 rounded-box">
              <thead>
                <tr>
                  <th className="text-base-content">Feature</th>
                  <th className="text-center text-primary">Scribly</th>
                  <th className="text-center text-base-content/60">
                    Typical notes app
                  </th>
                </tr>
              </thead>

              <tbody>
                {comparisonRows.map((row, index) => (
                  <motion.tr
                    key={row.feature}
                    initial={{
                      opacity: 0,
                      x: -15,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.5,
                    }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.05,
                      ease: "easeOut",
                    }}
                  >
                    <td className="font-medium">{row.feature}</td>

                    <td className="text-center">
                      {row.scribly === true ? (
                        <CheckIcon className="size-5 text-primary inline" />
                      ) : (
                        row.scribly
                      )}
                    </td>

                    <td className="text-center text-base-content/60">
                      {row.typical === false ? (
                        <XIcon className="size-5 text-error/60 inline" />
                      ) : (
                        row.typical
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </motion.div>
      </div>

      {/* FAQ */}
      <motion.div
        id="faq"
        className="max-w-3xl mx-auto px-4 py-20 scroll-mt-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={sectionVariants}
      >
        <motion.h2
          className="text-3xl font-bold text-center mb-12"
          variants={sectionVariants}
        >
          Frequently asked questions
        </motion.h2>

        <div className="space-y-3">
          {faqs.map((item, i) => {
            const isOpen = openFaq === i;

            return (
              <motion.div
                key={i}
                className="card bg-base-100"
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.5,
                }}
                transition={{
                  duration: 0.3,
                  delay: i * 0.04,
                }}
              >
                <button
                  type="button"
                  className="w-full text-left p-5 flex items-center justify-between gap-4"
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                >
                  <span className="font-semibold">{item.q}</span>

                  <motion.span
                    className="text-primary text-xl leading-none shrink-0"
                    animate={{
                      rotate: isOpen ? 45 : 0,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.25,
                        ease: "easeInOut",
                      }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm text-base-content/70">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Final CTA */}
      <motion.div
        className="max-w-4xl mx-auto px-4 pb-24 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={sectionVariants}
      >
        <motion.h2
          className="text-2xl font-bold mb-4"
          variants={sectionVariants}
        >
          Ready to start writing?
        </motion.h2>

        <motion.div
          variants={cardVariants}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="inline-block"
        >
          <Link to="/signup" className="btn btn-primary btn-lg">
            Create your free account
          </Link>
        </motion.div>
      </motion.div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
