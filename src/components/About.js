import React from "react";

export default function About(props) {
  const textColor = props.mode === "dark" ? "white" : "#212529";
  const bgColor = props.mode === "dark" ? "#121212" : "white";
  const cardBg = props.mode === "dark" ? "#1e1e1e" : "#f8f9fa";
  const cardText = props.mode === "dark" ? "#ffffff" : "#212529";

  return (
    <div className="container my-5 p-4 rounded shadow-lg" style={{ backgroundColor: bgColor, color: textColor }}>
      <h1 className="text-center mb-4">
        Welcome to <span className="text-primary">iNotebook</span>
      </h1>
      <p className="text-center fs-5">
        Your personal, secure, and efficient <b>note-taking app</b>. Organize your thoughts, plan your day, and store important information effortlessly.
      </p>

      <hr className="my-4" />

      {/* Features Section */}
      <div className="row">
        {/* Add Note */}
        <div className="col-md-4">
          <div className="card text-center p-3 border-0 shadow-sm" style={{ backgroundColor: cardBg, color: cardText }}>
            <h3>📝 Add Notes</h3>
            <p>Quickly jot down your ideas with a <b>title, description, and tags</b> to keep everything organized.</p>
          </div>
        </div>

        {/* Edit Note */}
        <div className="col-md-4">
          <div className="card text-center p-3 border-0 shadow-sm" style={{ backgroundColor: cardBg, color: cardText }}>
            <h3>✏️ Edit Notes</h3>
            <p>Need to update something? <b>Edit your notes anytime</b> to keep them relevant and up-to-date.</p>
          </div>
        </div>

        {/* Delete Note */}
        <div className="col-md-4">
          <div className="card text-center p-3 border-0 shadow-sm" style={{ backgroundColor: cardBg, color: cardText }}>
            <h3>🗑️ Delete Notes</h3>
            <p>Declutter your space! <b>Easily delete notes</b> that you no longer need with just one click.</p>
          </div>
        </div>
      </div>

      <hr className="my-4" />

      {/* Why Choose iNotebook */}
      <div className="text-center">
        <h2>🚀 Why Choose iNotebook?</h2>
        <p className="fs-5">
          ✨ <b>Simple & User-Friendly</b> - Minimal design for a seamless experience. <br></br> 
          🔒 <b>Secure & Private</b> - Your notes are safe and accessible only to you. <br></br> 
          🌙 <b>Dark Mode & Light Mode</b> - Adjust the theme for better readability.  <br></br>
        </p>
      </div>

      <hr className="my-4" />

      {/* Get Started */}
      <div className="text-center">
        <h2>🎯 Get Started Today!</h2>
        <p className="fs-5">
          Take control of your notes and stay <b>organized, productive, and stress-free</b> with iNotebook!
        </p>
      </div>
    </div>
  );
}
