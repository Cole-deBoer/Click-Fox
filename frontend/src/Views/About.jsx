import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-zinc-800 text-zinc-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl space-y-16 mx-auto text-center">
        {/* into section */}
        <h1 className="text-5xl font-extrabold mb-6">Click-Fox</h1>
        <p className="text-xl mb-6 max-w-2xl mx-auto">
          A modern web application for testing clicking speed. 
          The design and user experience of this website is largely inspired by {''} {/* adds a space */}
            <a href="https://monkeytype.com/" target="_blank" 
               rel="noopener noreferrer" className="text-blue-500 hover:underline">
              MonkeyType
            </a>.
        </p>

        {/* section seperator */}
        <div className='h-px w-full border-2 border-zinc-500 rounded-xl'></div>

        {/* Tech stack section */}
        <section className="mb-16 text-left">
          <h2 className="text-4xl font-bold mb-8 text-center">Tech Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-zinc-700 p-6 rounded-lg shadow-md flex flex-col">
              <h3 className="text-2xl font-semibold mb-4 text-center ">Frontend</h3>
              <ul className="h-full space-y-6 list-none flex flex-col place-content-evenly text-start">
                <li><strong>React</strong> - UI framework with functional components and hooks</li>
                <li><strong>Tailwind CSS</strong> - Utility-first CSS framework for styling</li>
                <li><strong>Vite</strong> - Fast build tool and development server</li>
                <li><strong>Chart.js</strong> - Open source and easy to use charting library</li>
              </ul>
            </div>
            <div className="bg-zinc-700 p-6 rounded-lg shadow-md flex flex-col">
              <h3 className="text-2xl font-semibold mb-4 text-center ">Backend</h3>
              <ul className="h-full space-y-6 list-none flex flex-col place-content-evenly text-start">
                <li><strong>Express.js</strong> - Node.js web framework</li>
                <li><strong>MongoDB</strong> - NoSQL database with Mongoose ODM</li>
                <li><strong>Firebase</strong> - Authentication, hosting, and functions</li>
              </ul>
            </div>
            <div className="bg-zinc-700 p-6 rounded-lg shadow-md flex flex-col">
              <h3 className="text-2xl font-semibold mb-4 text-center ">Infrastructure</h3>
              <ul className="h-full space-y-6 list-none flex flex-col place-content-evenly text-start">
                <li><strong>Firebase Hosting</strong> - Static site hosting</li>
                <li><strong>Firebase Authentication</strong> - User management</li>
                <li><strong>Firebase Functions</strong> - Cloud functions</li>
                <li><strong>MongoDB Atlas</strong> - Cloud database</li>
              </ul>
            </div>
          </div>
        </section>

        {/* section seperator */}
        <div className='h-px w-full border-2 border-zinc-500 rounded-xl'></div>

        {/* License section */}
        <section>
          <h2 className="text-4xl font-bold mb-8">License</h2>
          <p className="text-xl mb-4">
            This project is open source and available under the MIT License.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
