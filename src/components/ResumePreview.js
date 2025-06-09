import React, { useRef } from "react";
import { FaDownload, FaPalette, FaEye, FaEyeSlash } from "react-icons/fa";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import { getAllThemeNames, getThemeByName } from "../utils/resumeThemes";
import { downloadResumeAsPDF } from "../utils/pdfGenerator"; // Import the refactored PDF generation

const ResumePreview = ({ formData, theme, setTheme, showPreview, setShowPreview }) => {
  const resumeRef = useRef(null);
  const themeNames = getAllThemeNames();

  const handleThemeChange = (e) => {
    setTheme(getThemeByName(e.target.value));
  };

  const handleDownloadPDF = async () => {
    if (!resumeRef.current) return;
    // Use the utility function for PDF download
    await downloadResumeAsPDF(resumeRef.current, formData.personalInfo.fullName || "resume");
  };


  if (!showPreview) {
    return (
      <div className="fixed top-0 right-0 p-4 z-40">
        <button
          onClick={() => setShowPreview(true)}
          className="flex items-center space-x-2 bg-brand-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-brand-600 transition-colors"
        >
          <FaEye className="mr-2" />
          Show Preview
        </button>
      </div>
    );
  }

  return (
    <div className="fixed top-0 right-0 w-full md:w-1/2 h-screen bg-slate-100 shadow-xl overflow-auto z-20">
      {/* Preview Controls */}
      <div className="sticky top-0 bg-white border-b border-slate-200 shadow-sm p-4 flex flex-col sm:flex-row justify-between items-center z-30 space-y-2 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowPreview(false)}
            className="flex items-center space-x-2 text-slate-600 hover:text-slate-800"
            aria-label="Hide Preview"
          >
            <FaEyeSlash className="mr-1" />
            Hide
          </button>
          <div className="h-6 w-px bg-slate-300"></div>
          <div className="flex items-center space-x-2">
            <FaPalette className="text-brand-500" />
            <select
              className="border border-slate-300 rounded px-2 py-1 text-sm text-slate-700 focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-white"
              value={theme.name}
              onChange={handleThemeChange}
              aria-label="Select resume theme"
            >
              {themeNames.map((name) => (
                <option key={name} value={name} className="capitalize">
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          onClick={handleDownloadPDF}
          className="flex items-center space-x-2 bg-brand-500 text-white px-4 py-2 rounded-lg hover:bg-brand-600 transition-colors"
        >
          <FaDownload className="mr-1" />
          Download PDF
        </button>
      </div>

      {/* Resume Preview */}
      <div className="p-4 sm:p-8 bg-slate-100 resume-preview-scroll-area">
        <div
          ref={resumeRef}
          id="resume-document-for-print" // Added ID for easier selection by pdfGenerator if needed
          className="bg-white shadow-lg mx-auto w-[210mm] min-h-[297mm] p-[15mm] resume-document-for-print" // A4 size with padding
          style={{
            fontFamily: theme.styles.fontFamily.body,
            color: theme.styles.colors.text.primary,
            backgroundColor: theme.styles.colors.background.primary,
          }}
        >
          {/* Header Section */}
          <header className="mb-8 text-center border-b-2 pb-6" style={{ borderColor: theme.styles.colors.primary }}>
            {formData.personalInfo.profilePicture && (
                 <img
                    src={formData.personalInfo.profilePicture}
                    alt="Profile"
                    className="w-32 h-32 object-cover rounded-full mx-auto mb-4 border-4"
                    style={{ borderColor: theme.styles.colors.primary}}
                />
            )}
            <h1 className="text-4xl font-bold mb-1" style={{ color: theme.styles.colors.primary, fontFamily: theme.styles.fontFamily.heading }}>
              {formData.personalInfo.fullName || "Your Name"}
            </h1>
            <h2 className="text-xl mb-3" style={{ color: theme.styles.colors.text.accent }}>
              {formData.personalInfo.jobTitle || "Professional Title"}
            </h2>

            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm" style={{color: theme.styles.colors.text.secondary}}>
              {formData.personalInfo.email && (
                <a href={`mailto:${formData.personalInfo.email}`} className="flex items-center hover:underline" style={{color: theme.styles.colors.text.accent}}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><rect x="28" y="68" width="120" height="120" rx="8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><circle cx="88" cy="128" r="24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><path d="M200,112h24V216a8,8,0,0,1-8,8H88a8,8,0,0,1-8-8V188" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><line x1="221.35" y1="221.94" x2="148" y2="164.89" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><line x1="224" y1="112" x2="152" y2="168" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><polyline points="104 68 104 32 200 32 200 130.67" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/></svg>
                  <span className="ml-1.5">{formData.personalInfo.email}</span>
                </a>
              )}
              {formData.personalInfo.phone && (
                <a href={`tel:${formData.personalInfo.phone}`} className="flex items-center hover:underline" style={{color: theme.styles.colors.text.accent}}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><path d="M96.44,156c2.54,11.35,15.7,20,31.56,20,17.67,0,32-10.75,32-24,0-32-62.22-20-62.22-48,0-13.25,12.55-24,30.22-24,13.25,0,23.63,6,28,14.66" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><path d="M214,146.69A48,48,0,0,1,146.69,214,88.07,88.07,0,0,1,42,109.31,48,48,0,0,1,109.31,42,88.07,88.07,0,0,1,214,146.69Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/></svg>
                  <span className="ml-1.5">{formData.personalInfo.phone}</span>
                </a>
              )}
              {formData.personalInfo.location && (
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><circle cx="128" cy="64" r="32" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><line x1="128" y1="96" x2="128" y2="176" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><path d="M172,139.75c35.44,6.37,60,20.21,60,36.25,0,22.09-46.56,40-104,40S24,198.09,24,176c0-16,24.56-29.88,60-36.25" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/></svg>
                  <span className="ml-1.5">{formData.personalInfo.location}</span>
                </div>
              )}
            </div>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm mt-2">
                {formData.personalInfo.website && (
                  <a href={formData.personalInfo.website} target="_blank" rel="noopener noreferrer" className="flex items-center hover:underline" style={{color: theme.styles.colors.text.accent}}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><line x1="168" y1="168" x2="216" y2="216" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><line x1="216" y1="168" x2="168" y2="216" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><line x1="32" y1="128" x2="224" y2="128" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><path d="M128,224a96,96,0,1,1,96-96" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><path d="M128,224s-40-32-40-96,40-96,40-96,40,32,40,96" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/></svg>
                    <span className="ml-1.5">Portfolio</span>
                  </a>
                )}
                {formData.personalInfo.linkedin && (
                  <a href={formData.personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center hover:underline" style={{color: theme.styles.colors.text.accent}}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><rect x="32" y="32" width="192" height="192" rx="8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><line x1="124" y1="120" x2="124" y2="176" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><line x1="84" y1="120" x2="84" y2="176" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><path d="M124,148a28,28,0,0,1,56,0v28" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><circle cx="84" cy="80" r="16"/></svg>
                    <span className="ml-1.5">LinkedIn</span>
                  </a>
                )}
                {formData.personalInfo.github && (
                  <a href={formData.personalInfo.github} target="_blank" rel="noopener noreferrer" className="flex items-center hover:underline" style={{color: theme.styles.colors.text.accent}}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><path d="M119.83,56A52,52,0,0,0,76,32a51.92,51.92,0,0,0-3.49,44.7A49.28,49.28,0,0,0,64,104v8a48,48,0,0,0,48,48h48a48,48,0,0,0,48-48v-8a49.28,49.28,0,0,0-8.51-27.3A51.92,51.92,0,0,0,196,32a52,52,0,0,0-43.83,24Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><path d="M104,232V192a32,32,0,0,1,32-32h0a32,32,0,0,1,32,32v40" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><path d="M104,208H76a32,32,0,0,1-32-32,32,32,0,0,0-32-32" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/></svg>
                    <span className="ml-1.5">GitHub</span>
                  </a>
                )}
            </div>

            {formData.personalInfo.summary && (
              <p className="mt-6 text-left leading-relaxed text-sm" style={{color: theme.styles.colors.text.secondary}}>
                {formData.personalInfo.summary}
              </p>
            )}
          </header>

          {formData.experience?.length > 0 && (
            <section className="mb-6">
              <h2 
                className="text-2xl font-bold mb-3 px-3 py-2 bg-primary text-white border-b-2"
                style={{ 
                  borderColor: theme.styles.colors.primary,
                  fontFamily: theme.styles.fontFamily.heading 
                }}
              >
                Experience
              </h2>
              {formData.experience.map((exp) => (
                <div key={exp.id} className="mb-4">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="text-lg font-semibold" style={{color: theme.styles.colors.text.primary}}>
                        {exp.position || "Position"}
                      </h3>
                      <div className="font-medium" style={{color: theme.styles.colors.text.accent}}>
                        {exp.company || "Company"} - {exp.location || "Location"}
                      </div>
                    </div>
                    <div className="text-xs whitespace-nowrap pl-2" style={{color: theme.styles.colors.text.secondary}}>
                      {exp.startDate && (
                        <>
                          {new Date(exp.startDate + "-01").toLocaleDateString("en-US", { month: "short", year: "numeric"})}
                          {" - "}
                          {exp.current ? "Present" : exp.endDate ? new Date(exp.endDate + "-01").toLocaleDateString("en-US", { month: "short", year: "numeric"}) : "End Date"}
                        </>
                      )}
                    </div>
                  </div>
                  {exp.description && (
                    <p className="text-sm mb-1.5" style={{color: theme.styles.colors.text.secondary}}>{exp.description}</p>
                  )}
                  {exp.achievements?.length > 0 && exp.achievements.some(ach => ach.trim() !== "") && (
                    <ul className="list-disc list-inside text-sm space-y-0.5" style={{color: theme.styles.colors.text.secondary}}>
                      {exp.achievements.filter(ach => ach.trim() !== "").map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          )}

          {formData.education?.length > 0 && (
            <section className="mb-6">
              <h2 
                className="text-2xl font-bold mb-3 px-3 py-2 bg-primary text-white border-b-2"
                style={{ 
                  borderColor: theme.styles.colors.primary,
                  fontFamily: theme.styles.fontFamily.heading 
                }}
              >
                Education
              </h2>
              {formData.education.map((edu) => (
                <div key={edu.id} className="mb-4">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="text-lg font-semibold" style={{color: theme.styles.colors.text.primary}}>
                        {edu.degree || "Degree"} {edu.field && `in ${edu.field || "Field of Study"}`}
                      </h3>
                      <div className="font-medium" style={{color: theme.styles.colors.text.accent}}>
                        {edu.institution || "Institution"} - {edu.location || "Location"}
                      </div>
                    </div>
                    <div className="text-xs whitespace-nowrap pl-2" style={{color: theme.styles.colors.text.secondary}}>
                       {edu.startDate && (
                        <>
                          {new Date(edu.startDate + "-01").toLocaleDateString("en-US", { month: "short", year: "numeric"})}
                          {" - "}
                          {edu.current ? "Present" : edu.endDate ? new Date(edu.endDate + "-01").toLocaleDateString("en-US", { month: "short", year: "numeric"}) : "End Date"}
                        </>
                      )}
                    </div>
                  </div>
                  {edu.gpa && <p className="text-sm" style={{color: theme.styles.colors.text.secondary}}>GPA: {edu.gpa}</p>}
                  {edu.highlights && (
                    <p className="text-sm mt-1" style={{color: theme.styles.colors.text.secondary}}>{edu.highlights}</p>
                  )}
                </div>
              ))}
            </section>
          )}

          {formData.skills?.length > 0 && (
            <section>
              <h2 
                className="text-2xl font-bold mb-3 px-3 py-2 bg-primary text-white border-b-2"
                style={{ 
                  borderColor: theme.styles.colors.primary,
                  fontFamily: theme.styles.fontFamily.heading 
                }}
              >
                Skills
              </h2>
              <div className="space-y-3">
                {Object.entries(
                  formData.skills.reduce((acc, skill) => {
                    const category = skill.category || "General";
                    if (!acc[category]) acc[category] = [];
                    acc[category].push(skill);
                    return acc;
                  }, {})
                ).map(([category, skillsInCategory]) => (
                  <div key={category}>
                    <h3 className="text-md font-semibold mb-1" style={{color: theme.styles.colors.text.primary}}>{category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {skillsInCategory.map((skill) => (
                        <div key={skill.id} className="bg-primary text-white px-3 py-1 rounded-full text-sm">
                          {skill.name}
                          {/* Optional: display level e.g., <span className="text-xs ml-1 opacity-75">({skill.level}/5)</span> */}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
