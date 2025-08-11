import React, { useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

export default function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you! I’ll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  const click = () => {
    navigate("/")
  }

  return (
    <div>
      <Navbar />
      <div className="contdiv">
        <h1 className="mb-5">Contact Me</h1>
        <p className="mb-5">
          Have a question or a project in mind? I’d love to hear from you.
        </p>
        <div className="flex-center">
          <form
          onSubmit={handleSubmit}
          className="cont-form"
        >
          <div className="w-full">
            <label htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="w-full">
            <label htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="w-full">
            <label htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>    

          <button
            type="submit"
            onClick={click}
            className="pubtn"
          >
            Send Message
          </button>
        </form>
        </div>

        <div className="text-center mt-6 space-x-4">
          <a href="mailto:marycynthiaugwu14@gmail.com" className="mailink">
            📩 Get In Touch
          </a>
          <a
            href="https://github.com/E-m-e-l-d-a"
            target="_blank"
            rel="noopener noreferrer"
            className="mailink"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
