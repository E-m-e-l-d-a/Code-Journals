import React from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

export default function About() {
    const navigate = useNavigate();
    const click = () => {
    navigate("/contact")
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="aboutdiv px-4 py-12">
        <div>
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <section className="mb-8">
              <div className="text-center mb-12">
                <h1>About Me</h1>
              </div>
              <p>
                Hi! I'm a passionate beginner web developer and a growing
                freelancer who's dedicated to building clean, responsive, and
                user-friendly websites. While I'm still early in my professional
                journey, I have spent countless hours learning, practicing, and
                refining my skills through personal projects, freelance work,
                and continuous self-improvement.
              </p>
            </section>

            <section className="mb-8">
              <h2>
                What I'm Good At
              </h2>
              <p className="mb-6">
                I've gained strong experience in modern front-end technologies
                that help me craft beautiful and functional web experiences:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>React</strong> – Creating dynamic, component-based UIs
                </li>
                <li>
                  <strong>Tailwind CSS</strong> – Designing responsive, modern,
                  and maintainable layouts with ease
                </li>
                <li>
                  <strong>Vue</strong> – Building interactive web applications
                  with clear and organized code
                </li>
                <li>
                  <strong>JavaScript (ES6+)</strong> – Writing efficient, clean,
                  and maintainable scripts for web interactivity
                </li>
                <li>
                  <strong>TypeScript</strong> – Adding type safety and
                  scalability to JavaScript projects
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2>
                My Approach
              </h2>
              <p className="mb-4">I focus on:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>
                  <strong>Clean Code</strong> – Writing code that's easy to
                  read, maintain, and improve
                </li>
                <li>
                  <strong>Responsive Design</strong> – Ensuring websites work
                  perfectly on mobile, tablet, and desktop
                </li>
                <li>
                  <strong>User Experience (UX)</strong> – Creating smooth,
                  intuitive interfaces that make navigation simple
                </li>
                <li>
                  <strong>Performance Optimization</strong> – Building sites
                  that load fast and run efficiently
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2>
                Why Work With Me?
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>
                  <strong>Reliable</strong> – I communicate clearly and meet
                  deadlines
                </li>
                <li>
                  <strong>Adaptable</strong> – I quickly learn new tools and
                  frameworks as needed
                </li>
                <li>
                  <strong>Collaborative</strong> – I enjoy working closely with
                  clients to bring their vision to life
                </li>
                <li>
                  <strong>Driven</strong> – Every project is an opportunity to
                  grow and deliver something better than before
                </li>
              </ul>
            </section>
            <section className="text-center">
              <h2>
                Let's Build Something Together!
              </h2>
              <p className="mb-6">
                If you're looking for someone who will put care and attention
                into every line of code while continuously learning and
                improving, I'd be happy to work with you.
              </p>
              <button onClick={click} className="mailink">Contact Me</button>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
