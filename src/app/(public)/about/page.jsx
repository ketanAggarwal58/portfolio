"use client";

import { motion } from "framer-motion";
import Head from "next/head";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About | Ketan Aggarwal</title>
        <meta
          name="description"
          content="About Ketan Aggarwal — Software Developer, Builder, and Tech Enthusiast. Learn more about his journey, skills, and vision."
        />
      </Head>

      <main className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 text-gray-800 px-6 sm:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >

          <img className="mx-auto" src="./logo.svg" width={200} alt="Logo" />

          {/* Hero Section */}
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            About Me
          </h1>
          <h2 className="text-2xl font-semibold text-600 mb-10">
            Hi, I’m Ketan Aggarwal — Software Developer & Curious Builder
          </h2>

          {/* Professional Summary */}
          <section className="space-y-4 text-lg leading-relaxed">
            <p>
              I’m a backend-focused software developer with nearly three years of
              hands-on industry experience in building scalable, cloud-hosted
              systems. My expertise lies in{" "}
              <span className="font-semibold">Java Spring Boot</span>, with
              additional experience in{" "}
              <span className="font-semibold">
                Node.js, Python (Django), and microservice architectures
              </span>
              .
            </p>

            <p>
              Over the past few years, I’ve worked on projects that range from{" "}
              <span className="font-medium">
                automating business workflows
              </span>{" "}
              to{" "}
              <span className="font-medium">
                designing DNS systems, CI/CD pipelines, and data-driven
                dashboards
              </span>
              . I’ve also led a small tech team, focusing on improving
              efficiency, building reusable components, and delivering reliable
              backend systems.
            </p>
          </section>

          {/* Divider */}
          <div className="border-t border-gray-300 my-12" />

          {/* Personal Motivation */}
          <section className="space-y-4 text-lg leading-relaxed">
            <h3 className="text-2xl font-semibold text-gray-900">
              Why I Build
            </h3>
            <p>
              For me, development has always been more than just writing code —
              it’s about <span className="italic">solving problems</span> and{" "}
              <span className="italic">creating systems that last</span>. I find
              meaning in turning abstract ideas into tools that people use,
              rely on, and grow with.
            </p>
            <p>
              That’s why I started{" "}
              <span className="font-semibold">KetanAggarwal.dev</span> — a space
              to share my projects, experiments, and thoughts around{" "}
              <span className="font-medium">
                engineering, deep learning, and system design
              </span>
              . It’s where I break down what I learn, build new things, and
              sometimes, explore how technology shapes the world we live in.
            </p>
          </section>

          {/* Divider */}
          <div className="border-t border-gray-300 my-12" />

          {/* Beyond Work */}
          <section className="space-y-4 text-lg leading-relaxed">
            <h3 className="text-2xl font-semibold text-gray-900">Beyond Work</h3>
            <p>
              When I’m not writing code, I enjoy learning about{" "}
              <span className="font-medium">
                deep learning, cloud systems, and robotics
              </span>
              , or revisiting mathematical foundations like{" "}
              <span className="font-medium">
                linear algebra and probability
              </span>{" "}
              — the stuff that keeps innovation grounded.
            </p>
            <p>
              Long-term, my vision is to{" "}
              <span className="font-semibold">
                build a vertically integrated Semiconductor R&D and Technology
                company
              </span>{" "}
              with a robotics division — something that pushes the boundaries of
              hardware and intelligence together. It’s a big dream, but every
              project I build here moves me a step closer.
            </p>
          </section>

          {/* Divider */}
          <div className="border-t border-gray-300 my-12" />

          {/* Connect */}
          <section className="text-lg leading-relaxed">
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              Let’s Connect
            </h3>
            <p>
              Whether you’re here to read my blogs, explore my projects, or
              collaborate on something ambitious — welcome.
            </p>
            <p className="mt-3">
              You can connect with me on{" "}
              <Link
                href="https://www.linkedin.com/in/ketanaggarwal58/"
                target="_blank"
                className="text-indigo-600 font-medium hover:underline"
              >
                LinkedIn
              </Link>{" "}
              or explore my latest builds and experiments here on{" "}
              <span className="font-semibold">KetanAggarwal.dev</span>.
            </p>
          </section>
        </motion.div>
      </main>
    </>
  );
}
