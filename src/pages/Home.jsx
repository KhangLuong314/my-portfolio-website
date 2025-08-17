import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you are using react-router
import {
    Zap, Atom, Brain, Calculator, Telescope, Code,
    FileText, Mail, Linkedin, Github, Award, BookOpen, Briefcase,
    Menu, X,
    FolderTree
} from 'lucide-react';
import '../designs/Home.css'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// --- NAVBAR COMPONENT ---


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
            year: "Fall 2024 - Present",
            title: "University of Nebraska-Lincoln",
            institution: "B.S. in Physics — Minors: Mathematics and Computer Science",
            description: "Focused on Quantum Mechanics, Relativity, and Theoretical Physics. Currently conducting research in Atomic, Molecular, and Optical (AMO) Physics with the applications of Computer Science.",
            skills: ["Quantum Mechanics", "Computational Physics", "Research Methods", "Experimental Physics"]
        },
        {
            year: "Summer 2024",
            title: "Quantum Mechanics & Computer Science Integration",
            institution: "Self-Directed Learning",
            description: "Learning in programming language and quantum mechanics through university-level lectures and projects.",
            skills: ["Python", "HTML/CSS", "C#", "Quantum Mechanics", "Numerical Methods"]
        },
        {
            year: "2022 - 2024",
            title: "Pius X High School",
            institution: "High School Diploma",
            description: "Graduated as distinguish scholar, demonstrating exceptional performance in mathematics and sciences. AP Courses: AP Calculus (AB & BC) and AP Physics (Mechanics and E&M).",
            skills: ["Classical Mechanics", "Electromagnetism", "Calculus", "Leadership"]
        },
    ];

    const physicsFields = [
        { icon: <Atom size={20} />, title: "Quantum Mechanics" },
        { icon: <Zap size={20} />, title: "Electrodynamics" },
        { icon: <Telescope size={20} />, title: "Cosmology" },
        { icon: <Brain size={20} />, title: "General Relativity" },
        { icon: <Calculator size={20} />, title: "Mathematical Physics" },
        { icon: <BookOpen size={20} />, title: "Classical Mechanics" }
    ];

    const achievements = [
        { icon: "🏆", title: "UCARE Research Fellowship", desc: "Awarded undergraduate research funding for the 2025-2026 academic year." },
        { icon: "📚", title: "Dean's List — College of Arts and Sciences", desc: "Recognized for academic excellence during the 2024-2025 academic year." },
        { icon: "🎯", title: "American Mathematics Competition", desc: "Placed 4th in the national-level mathematics competition." },
        { icon: "🔬", title: "Undergraduate Research Assistant", desc: "Collaborating with faculty on advanced research in physics and computation." },
    ];

    // --- RENDER ---
    return (
        <>
            <Navbar />
            <div className="portfolio-container">
                {/* Left "Sticky" Column */}
                <header className="left-panel">
                    <div className="profile-intro">
                        <h1 className="profile-subtitle">Physics Student & Researcher</h1>
                        <p className="profile-bio">
                            A passionate physics enthusiast dedicated to unraveling the mysteries of the cosmos, from the quantum realm to the vast expanse of the universe.
                        </p>
                    </div>

                    <nav className="page-nav">
                        {/* In-page navigation for the home page sections */}
                        <a href="#journey" className="nav-link">Academic Journey</a>
                        <a href="#expertise" className="nav-link">Expertise</a>
                        <a href="#achievements" className="nav-link">Achievements</a>
                    </nav>

                    <div className="contact-links">
                        <a href="/papers/Resume.pdf" target="_blank" rel="noopener noreferrer" className="contact-button">
                            <FileText size={16} /> View Resume
                        </a>
                        <a href="/Connect" rel="noopener noreferrer" className="connect">
                            <svg xmlns="http://www.w3.org/2000/svg" 
                                width="16" height="16" fill="none" stroke="currentColor" 
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
                                className="icon">
                                <path d="M14 2H6a2 2 0 0 0-2 2v12l4-2 4 2V4a2 2 0 0 0-2-2z"/>
                            </svg>
                            Connect
                        </a>
                        <a href="mailto:your-email@example.com" className="social-link"><Mail size={20} /></a>
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
