import React from "react";
import { Link } from "react-router-dom";
import {
  QuestionMarkCircleIcon,
  ListBulletIcon,
  UserCircleIcon,
  FingerPrintIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const text =
  "Streamline the process of revisiting and solving programming problems".split(" ");

const features = [
  {
    name: "Store the Upsolve problems",
    description:
      "The Store Upsolve Problems feature lets users save problem links, add notes, and organize them by platform or contest, creating a personalized list to track and revisit upsolved challenges efficiently.",
    icon: QuestionMarkCircleIcon,
    link: "upsolve",
  },
  {
    name: "Lists",
    description:
      "A collection of important coding problems categorized by topic, platform, and preparation needs (e.g., contests, OA, DSA, interviews) with details on difficulty, key concepts, and progress tracking.",
    icon: ListBulletIcon,
    link: "lists",
  },
  {
    name: "Profile",
    description:
      "The profile in the upsolve application displays user data, including total problems solved, platform rank, lists (public and private), friends, and a collection of upsolve questions, among other details.",
    icon: UserCircleIcon,
    link: "profile",
  },
  {
    name: "Advanced security",
    description:
      "The upsolver website ensures full security through robust user authentication, safeguarding user data and access.",
    icon: FingerPrintIcon,
    link: "/",
  },
];

export default function Homepage() {
  return (
    <div className="bg-white py-24 sm:py-0 bg-neutral-100">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 bg-neutral-200">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-5xl font-semibold leading-7 pt-16 text-indigo-600">
            Upsolver
          </h2>
          <p className="mt-8 text-3xl font-bold tracking-tight text-gray-500 sm:text-4xl">
            Track the Upsolve's
          </p>
          <p className="mt-6 text-xl leading-8 text-gray-600">
            {text.map((el, i) => (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.25,
                  delay: i / 10,
                }}
                key={i}
              >
                {el}{" "}
              </motion.span>
            ))}
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <Link
                to={feature.link}
                className="-m-1.5 p-1.5 tooltip-image-container"
                key={feature.name}
              >
                <div className="relative pl-16">
                  <dt className="text-xl font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                      <feature.icon
                        aria-hidden="true"
                        className="h-6 w-6 text-white"
                      />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-lg leading-7 text-gray-600">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.9,
                        ease: "easeOut",
                      }}
                    >
                      {feature.description}
                    </motion.div>
                  </dd>
                </div>
              </Link>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
