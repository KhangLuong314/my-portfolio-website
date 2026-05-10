import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom'; // Assuming you are using react-router
import {
    Zap, Atom, Brain, Calculator, Telescope, Code,
    FileText, Mail, Linkedin, Github, Award, BookOpen, Briefcase,
    Menu, X,
    FolderTree
} from 'lucide-react';
import '../designs/Home.css'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// --- TIMELINE ITEM COMPONENT ---
const TimelineItem = ({ item }) => (
    <div className="timeline-item">
        <div className="timeline-marker"></div>
        <div className="timeline-content">
            <span className="timeline-year">{item.year}</span>
            <h3 className="timeline-title">{item.title}</h3>
            <p className="timeline-institution">{item.institution}</p>
            <p className="timeline-description">{item.description}</p>
            <div className="skills-container">
                {item.skills.map((skill, i) => <span key={i} className="skill-tag">{skill}</span>)}
            </div>
        </div>
    </div>
);

// --- INFO CARD COMPONENT ---
const InfoCard = ({ icon, title, children }) => (
    <div className="info-card">
        <div className="card-header">
            {icon}
            <h3 className="card-title">{title}</h3>
        </div>
        <div className="card-content">
            {children}
        </div>
    </div>
);

// --- MAIN HOME COMPONENT ---
function Home() {
    // --- DATA ---
    const timelineData = [
        {
            year: "Summer 2025",
            title: "Computational Research Intern — Molecular Excitons",
            institution: "Shao Lab, Brandeis University",
            description: "Optimized Python-based electronic-structure code for molecular excitons. Benchmarked accuracy-cost tradeoffs in physics- and ML-based multiscale methods for energy-transport simulations across molecular aggregates.",
            skills: ["Python", "Electronic Structure", "ML-based Multiscale Methods", "Cavity QED"]
        },
        {
            year: "Fall 2024 - Present",
            title: "Undergraduate Research Assistant",
            institution: "Centurion Group, University of Nebraska-Lincoln",
            description: "Engineered a Python simulation framework for ultrafast electron scattering. Developed a modular scattering-analysis codebase that reduced experiment-to-simulation turnaround from hours to under 5 minutes, achieving a 40x speedup via vectorized numerical integration.",
            skills: ["Python", "Quantum Scattering Theory", "NumPy/SciPy", "Ultrafast Electron Diffraction"]
        },
        {
            year: "2024 - Present",
            title: "B.S. in Physics",
            institution: "University of Nebraska-Lincoln",
            description: "GPA: 3.97/4.00. Minors in Mathematics and Computer Science. Focused on Quantum Mechanics and Computational Physics with direct application to AMO research at SLAC and Los Alamos facilities.",
            skills: ["Quantum Mechanics", "Differential Equations", "Scientific Computing", "Data Structures"]
        },
    ];

    const physicsFields = [
        { icon: <Atom size={20} />, title: "Quantum Scattering" },
        { icon: <Zap size={20} />, title: "Ultrafast Dynamics" },
        { icon: <Brain size={20} />, title: "Physics-Informed ML" },
        { icon: <Code size={20} />, title: "Scientific Computing" },
        { icon: <Calculator size={20} />, title: "Mathematical Physics" },
        { icon: <Telescope size={20} />, title: "Molecular Diffraction" }
    ];

    const achievements = [
        { icon: "🏆", title: "UCARE Research Fellowship", desc: "Awarded competitive research funding (<10% acceptance) for ionized molecular diffraction modeling." },
        { icon: "⚡", title: "40x Simulation Speedup", desc: "Optimized scattering factor integration using vectorized NumPy broadcasting for real-time analysis." },
        { icon: "🤖", title: "Scientific ML Deployment", desc: "Developed a CNN for 13,000-image diffraction datasets with Monte Carlo dropout uncertainty estimation." },
        { icon: "📚", title: "Dean's List (GPA ≥ 3.75)", desc: "Consistently recognized for academic excellence in upper-level physics and mathematics." },
    ];

    // --- RENDER ---
    return (
        <>
            <Navbar />
            <div className="portfolio-container">
                {/* Left "Sticky" Column */}
                <header className="left-panel">
                    <div className="profile-intro">
                        <h className="profile-subtitle" style={{ color: 'whitesmoke', fontSize: '1.5rem'}}>Computational AMO Physicist</h>
                        <p className="profile-bio">
                            Specializing in quantum scattering theory and ultrafast molecular dynamics. Engineered high-performance simulation frameworks for SLAC and LANSCE-relevant research, leveraging physics-informed machine learning for structure retrieval.
                        </p>
                    </div>

                    <nav className="page-nav">
                        {/* In-page navigation for the home page sections */}
                        <a
                            href={`${import.meta.env.BASE_URL}#journey`}
                            className="nav-link"
                            onClick={(e) => {
                                e.preventDefault();
                                const el = document.getElementById("journey");
                                if (el) el.scrollIntoView({ behavior: "smooth" });
                                // Also update URL hash without reload
                                window.history.pushState(null, "", `${import.meta.env.BASE_URL}#jorney`);
                            }}
                            >
                            Academic Journey
                        </a>
                        <a
                            href={`${import.meta.env.BASE_URL}#expertise`}
                            className="nav-link"
                            onClick={(e) => {
                                e.preventDefault();
                                const el = document.getElementById("expertise");
                                if (el) el.scrollIntoView({ behavior: "smooth" });
                                // Also update URL hash without reload
                                window.history.pushState(null, "", `${import.meta.env.BASE_URL}#jorney`);
                            }}
                            >
                            Expertise
                        </a>
                        <a
                            href={`${import.meta.env.BASE_URL}#achievements`}
                            className="nav-link"
                            onClick={(e) => {
                                e.preventDefault();
                                const el = document.getElementById("achievements");
                                if (el) el.scrollIntoView({ behavior: "smooth" });
                                // Also update URL hash without reload
                                window.history.pushState(null, "", `${import.meta.env.BASE_URL}#jorney`);
                            }}
                            >
                            Achievements
                        </a>
                    </nav>

                    <div className="contact-links">
                        <a href={`${import.meta.env.BASE_URL}papers/Resume.pdf`} target="_blank" rel="noopener noreferrer" className="contact-button">
                            <FileText size={16} /> View Resume
                        </a>
                        <NavLink to="/Connect" rel="noopener noreferrer" className="connect">
                            <svg xmlns="http://www.w3.org/2000/svg" 
                                width="16" height="16" fill="none" stroke="currentColor" 
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
                                className="icon">
                                <path d="M14 2H6a2 2 0 0 0-2 2v12l4-2 4 2V4a2 2 0 0 0-2-2z"/>
                            </svg>
                            Connect
                        </NavLink>
                        <a href="mailto:kluong3@huskers.unl.edu" className="social-link"><Mail size={20} /></a>
                        <a href="https://www.linkedin.com/in/khang-luong-776ab8277/" target="_blank" rel="noopener noreferrer" className="social-link"><Linkedin size={20} /></a>
                        <a href="https://github.com/KhangLuong314" target="_blank" rel="noopener noreferrer" className="social-link"><Github size={20} /></a>
                    </div>
                </header>

                {/* Right Scrollable Content Column */}
                <main className="right-panel">
                    {/* Academic Journey Section */}
                    <section id="journey" className="content-section">
                        <h2 className="section-title">Academic Journey</h2>
                        <div className="timeline">
                            {timelineData.map((item, index) => <TimelineItem key={index} item={item} />)}
                        </div>
                    </section>

                    {/* Expertise Section */}
                    <section id="expertise" className="content-section">
                        <h2 className="section-title">Expertise & Interests</h2>
                        <div className="card-grid">
                            <InfoCard icon={<Briefcase />} title="Research Interests">
                                <div className="interest-tags">
                                    {physicsFields.map((field, i) => (
                                        <div key={i} className="interest-tag">
                                            {field.icon}
                                            <span>{field.title}</span>
                                        </div>
                                    ))}
                                </div>
                            </InfoCard>
                            <InfoCard icon={<Code />} title="Technical Skills">
                                <div className="skills-container">
                                    {['Python', 'React', 'JavaScript', 'C#', 'HTML/CSS', 'LaTeX', 'Jupyter', 'Git'].map((skill, i) => (
                                        <span key={i} className="skill-tag">{skill}</span>
                                    ))}
                                </div>
                            </InfoCard>
                        </div>
                    </section>

                    {/* Achievements Section */}
                    <section id="achievements" className="content-section">
                        <h2 className="section-title">Achievements</h2>
                        <div className="achievements-list">
                            {achievements.map((ach, index) => (
                                <div key={index} className="achievement-item">
                                    <span className="achievement-icon">{ach.icon}</span>
                                    <div className="achievement-text">
                                        <h4 className="achievement-title">{ach.title}</h4>
                                        <p className="achievement-desc">{ach.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                    <Footer />
                </main>
            </div>
        </>
    );
}

export default Home;
