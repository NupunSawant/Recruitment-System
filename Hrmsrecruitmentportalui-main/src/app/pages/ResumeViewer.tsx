import { useNavigate, useSearchParams } from 'react-router';
import { ArrowLeft, Download, Printer, X } from 'lucide-react';
import { Button } from '../components/ui/button';

export function ResumeViewer() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const candidateName = searchParams.get('name') || 'Candidate';
  const candidateRole = searchParams.get('role') || 'Role';

  return (
    <div className="h-screen flex flex-col bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.close()}
            className="w-8 h-8 rounded border border-neutral-200 flex items-center justify-center hover:bg-neutral-50"
          >
            <X className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-[14px] font-semibold text-neutral-900">{candidateName} - Resume</h1>
            <p className="text-[11px] text-neutral-500">{candidateRole}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 text-[12px]">
            <Printer className="w-3.5 h-3.5 mr-1.5" />
            Print
          </Button>
          <Button variant="outline" size="sm" className="h-8 text-[12px]">
            <Download className="w-3.5 h-3.5 mr-1.5" />
            Download
          </Button>
        </div>
      </div>

      {/* Resume Content */}
      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-4xl mx-auto bg-white border border-neutral-200 rounded-lg p-12 shadow-sm">
          {/* Sample Resume */}
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center border-b-2 border-neutral-900 pb-4">
              <h1 className="text-[28px] font-bold text-neutral-900 uppercase tracking-wide">{candidateName}</h1>
              <p className="text-[14px] text-neutral-600 mt-1">{candidateRole}</p>
              <div className="flex items-center justify-center gap-4 mt-2 text-[12px] text-neutral-600">
                <span>priya.sharma@email.com</span>
                <span>•</span>
                <span>+91 98765 43210</span>
                <span>•</span>
                <span>Bangalore, India</span>
              </div>
              <div className="flex items-center justify-center gap-3 mt-2 text-[11px] text-neutral-500">
                <a href="#" className="hover:text-neutral-900">linkedin.com/in/priyasharma</a>
                <span>•</span>
                <a href="#" className="hover:text-neutral-900">github.com/priyasharma</a>
              </div>
            </div>

            {/* Professional Summary */}
            <div>
              <h2 className="text-[16px] font-bold text-neutral-900 uppercase tracking-wide border-b border-neutral-300 pb-2 mb-3">
                Professional Summary
              </h2>
              <p className="text-[13px] text-neutral-700 leading-relaxed">
                Results-driven Full Stack Developer with 3.5 years of experience in building scalable web applications using MERN stack. 
                Proven expertise in React.js, Node.js, MongoDB, and modern JavaScript frameworks. Strong problem-solving skills with a track 
                record of delivering high-quality solutions in fast-paced agile environments. Passionate about clean code, user experience, 
                and continuous learning.
              </p>
            </div>

            {/* Technical Skills */}
            <div>
              <h2 className="text-[16px] font-bold text-neutral-900 uppercase tracking-wide border-b border-neutral-300 pb-2 mb-3">
                Technical Skills
              </h2>
              <div className="space-y-2 text-[13px]">
                <div className="flex">
                  <span className="font-semibold text-neutral-900 w-40">Frontend:</span>
                  <span className="text-neutral-700">React.js, Redux, TypeScript, HTML5, CSS3, Tailwind CSS, Material-UI</span>
                </div>
                <div className="flex">
                  <span className="font-semibold text-neutral-900 w-40">Backend:</span>
                  <span className="text-neutral-700">Node.js, Express.js, REST APIs, GraphQL, JWT Authentication</span>
                </div>
                <div className="flex">
                  <span className="font-semibold text-neutral-900 w-40">Database:</span>
                  <span className="text-neutral-700">MongoDB, PostgreSQL, Redis, Mongoose ODM</span>
                </div>
                <div className="flex">
                  <span className="font-semibold text-neutral-900 w-40">Tools & Others:</span>
                  <span className="text-neutral-700">Git, Docker, AWS, Jenkins, Jira, Agile/Scrum, CI/CD</span>
                </div>
              </div>
            </div>

            {/* Professional Experience */}
            <div>
              <h2 className="text-[16px] font-bold text-neutral-900 uppercase tracking-wide border-b border-neutral-300 pb-2 mb-3">
                Professional Experience
              </h2>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-[14px] font-bold text-neutral-900">Senior MERN Stack Developer</h3>
                      <p className="text-[12px] text-neutral-600">TechCorp Solutions Pvt Ltd, Bangalore</p>
                    </div>
                    <span className="text-[12px] text-neutral-500">Jan 2024 - Present</span>
                  </div>
                  <ul className="list-disc list-outside ml-5 space-y-1 text-[13px] text-neutral-700">
                    <li>Led development of a real-time analytics dashboard serving 10K+ daily users using React, Node.js, and MongoDB</li>
                    <li>Implemented WebSocket-based real-time notifications reducing latency by 60%</li>
                    <li>Optimized database queries resulting in 40% faster page load times</li>
                    <li>Mentored 3 junior developers and conducted code reviews to maintain code quality</li>
                    <li>Collaborated with cross-functional teams to deliver features on tight deadlines</li>
                  </ul>
                </div>

                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-[14px] font-bold text-neutral-900">MERN Stack Developer</h3>
                      <p className="text-[12px] text-neutral-600">Innovate Digital, Bangalore</p>
                    </div>
                    <span className="text-[12px] text-neutral-500">Jun 2022 - Dec 2023</span>
                  </div>
                  <ul className="list-disc list-outside ml-5 space-y-1 text-[13px] text-neutral-700">
                    <li>Developed and maintained 5+ production web applications using MERN stack</li>
                    <li>Built RESTful APIs and integrated third-party services (Payment gateways, OAuth)</li>
                    <li>Implemented responsive UI components with React and Material-UI</li>
                    <li>Wrote comprehensive unit tests achieving 85% code coverage</li>
                    <li>Participated in agile sprints and daily stand-ups</li>
                  </ul>
                </div>

                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-[14px] font-bold text-neutral-900">Junior Full Stack Developer</h3>
                      <p className="text-[12px] text-neutral-600">StartupHub Technologies, Pune</p>
                    </div>
                    <span className="text-[12px] text-neutral-500">Jul 2021 - May 2022</span>
                  </div>
                  <ul className="list-disc list-outside ml-5 space-y-1 text-[13px] text-neutral-700">
                    <li>Assisted in building e-commerce platform features using React and Node.js</li>
                    <li>Fixed bugs and improved application performance</li>
                    <li>Collaborated with designers to implement pixel-perfect UI</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Education */}
            <div>
              <h2 className="text-[16px] font-bold text-neutral-900 uppercase tracking-wide border-b border-neutral-300 pb-2 mb-3">
                Education
              </h2>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-[14px] font-bold text-neutral-900">Bachelor of Technology in Computer Science</h3>
                  <p className="text-[12px] text-neutral-600">VIT University, Vellore</p>
                  <p className="text-[12px] text-neutral-500 mt-1">CGPA: 8.6/10</p>
                </div>
                <span className="text-[12px] text-neutral-500">2017 - 2021</span>
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h2 className="text-[16px] font-bold text-neutral-900 uppercase tracking-wide border-b border-neutral-300 pb-2 mb-3">
                Certifications
              </h2>
              <ul className="space-y-1 text-[13px] text-neutral-700">
                <li>• MongoDB Certified Developer - MongoDB University (2023)</li>
                <li>• React - The Complete Guide - Udemy (2022)</li>
                <li>• AWS Certified Cloud Practitioner (2023)</li>
              </ul>
            </div>

            {/* Projects */}
            <div>
              <h2 className="text-[16px] font-bold text-neutral-900 uppercase tracking-wide border-b border-neutral-300 pb-2 mb-3">
                Key Projects
              </h2>
              <div className="space-y-3">
                <div>
                  <h3 className="text-[14px] font-bold text-neutral-900">E-Commerce Marketplace Platform</h3>
                  <p className="text-[12px] text-neutral-600 mb-1">Full Stack Application | React, Node.js, MongoDB, Redis</p>
                  <p className="text-[13px] text-neutral-700">
                    Built a full-featured marketplace with user authentication, product catalog, shopping cart, payment integration, 
                    and admin dashboard. Implemented caching strategy using Redis for improved performance.
                  </p>
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-neutral-900">Real-Time Chat Application</h3>
                  <p className="text-[12px] text-neutral-600 mb-1">WebSocket Application | React, Socket.io, Express, MongoDB</p>
                  <p className="text-[13px] text-neutral-700">
                    Developed a real-time messaging app with group chats, file sharing, and online status indicators. 
                    Handled 500+ concurrent connections efficiently.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
