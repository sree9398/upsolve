import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
// import './styles.css'; // Import TailwindCSS styles if using a separate file

function Contact() {
  const email = "telugusreekanth58@gmail.com";
  const phone = "9398299515";

  return (
    <main className="container mx-auto bg-neutral-200 max-w-10xl py-48">
      <h1 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
        For any questions, please drop us a mail
      </h1>
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-indigo-600 mb-4">
          <a href={`mailto:${email}`}>{email}</a>
        </h2>
        <span className="text-lg text-gray-600">or</span>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-indigo-600 mt-4">
          <a href={`tel:${phone}`}>{phone}</a>
        </h2>
      </div>
    </main>
  );
}

export default Contact;
