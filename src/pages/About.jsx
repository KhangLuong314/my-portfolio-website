import { useState, N } from 'react'
import { NavLink } from 'react-router-dom';
import Navbar from "../components/Navbar"
import Footer from '../components/Footer'
import "../designs/About.css"

function About() {
    const base = import.meta.env.BASE_URL;
    const heroImageUrl = `${base}assets/research-pic.jpg`;

    const skills = [
        { category: "Scientific Computing", items: ["Python (NumPy, SciPy)", "Vectorized Integration", "ODE/PDE Solvers", "FFT Analysis", "LaTeX"] },
        { category: "Machine Learning", items: ["TensorFlow/Keras", "CNNs", "Monte Carlo Dropout", "Physics-Informed ML", "Scikit-learn"] },
        { category: "AMO & Quantum Sim", items: ["Quantum Scattering Theory", "IAM & Ionized Form Factors", "UED/GUED", "Exciton Transport", "Cavity QED"] },
        { category: "Software Engineering", items: ["Git", "Modular Package Design", "REST API (FastAPI)", "React/Vite", "Unit Testing"] }
    ]

    const achievements = [
        { title: "UCARE Research Fellowship", description: "Awarded competitive funding (<10% acceptance) for computational modeling of ionized molecular diffraction." },
        { title: "40x Simulation Optimization", desc: "Engineered vectorized numerical integration pipelines, reducing scattering turnaround from hours to minutes." },
        { title: "Scientific ML Deployment", description: "Developed and deployed a full-stack inference pipeline for 13,000-image diffraction datasets." },
        { title: "Dean's List (GPA: 3.97)", description: "Consistent academic excellence in Physics, Mathematics, and Computer Science." }
    ]

    return (
        <>
            <main>
                <Navbar />
                
                {/* Hero Section */}
                <section className="hero" style={{ backgroundImage: `url(${heroImageUrl})` }}>
                    <div className="hero-overlay"></div>
                    <div className="hero-content">
                        <h1 className='myname'>Khang Luong</h1>
                        <h2>Computational AMO Physicist</h2>
                        <p className="hero-subtitle">Engineering high-performance simulation frameworks and physics-informed ML for ultrafast science.</p>
                        <div className="hero-cta">
                            <a href="#about" className="cta-button">Research Profile</a>
                            <NavLink to="/Connect" rel="noopener noreferrer" className="cta-button secondary">
                            Connect
                            </NavLink>
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section id="about" className="about-section">
                    <div className="about-content">
                        <div className="profile-section">
                            <div className="profile-image">
                                <img src={`${import.meta.env.BASE_URL}assets/profile-pic.jpg`} alt="Khang Luong"/>
                            </div>
                            <div className="profile-info">
                                <h2>Professional Profile</h2>
                                <p>I am a Computational Physicist specializing in quantum scattering theory and ultrafast molecular dynamics. My work is focused on bridging the gap between theoretical modeling and experimental data acquisition at world-class facilities like SLAC MeV-UED and Los Alamos LANSCE.</p>
                                
                                <p>Through my research at the University of Nebraska-Lincoln and Brandeis University, I have engineered simulation frameworks that reproduce femtosecond-pulse diffraction patterns with high precision. I specialize in optimizing scientific codebases, recently achieving a 40x speedup in molecular diffraction simulations through vectorized numerical integration and modular architecting.</p>
                                
                                <p>I am particularly passionate about the application of Physics-Informed Machine Learning (PIML) to structure retrieval. By integrating Monte Carlo dropout for uncertainty estimation in CNNs, I develop robust tools for diffraction pattern recognition and anomaly detection in high-throughput AMO experiments.</p>
                                
                                <div id="contact" className="contact-info">
                                    <div className="contact-item">
                                        <strong>Focus:</strong> Computational AMO Physics
                                    </div>
                                    <div className="contact-item">
                                        <strong>Institution:</strong> University of Nebraska-Lincoln
                                    </div>
                                    <div className="contact-item">
                                        <strong>Expertise:</strong> Scientific Computing & Scientific ML
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Skills Section */}
                <section className="skills-section">
                    <h2>Technical Skills & Expertise</h2>
                    <div className="skills-grid">
                        {skills.map((skillCategory, index) => (
                            <div key={index} className="skill-category">
                                <h3>{skillCategory.category}</h3>
                                <div className="skill-items">
                                    {skillCategory.items.map((skill, skillIndex) => (
                                        <span key={skillIndex} className="skill-tag">{skill}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Experience & Achievements */}
                <section className="achievements-section">
                    <h2>Measurable Impact</h2>
                    <div className="achievements-grid">
                        {achievements.map((achievement, index) => (
                            <div key={index} className="achievement-card">
                                <h3>{achievement.title}</h3>
                                <p>{achievement.description || achievement.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Research Interests */}
                <section className="research-section">
                    <h2>Core Research Areas</h2>
                    <div className="research-content">
                        <div className="research-grid">
                            <div className="research-card">
                                <h3>Ultrafast Molecular Dynamics</h3>
                                <p>Simulating ionized gas-phase molecular dynamics with sub-100fs resolution to capture coherent nuclear motion and non-adiabatic coupling.</p>
                            </div>
                            <div className="research-card">
                                <h3>Scientific Machine Learning</h3>
                                <p>Applying CNNs and PIML architectures to automate structure retrieval and real-time data analysis for high-repetition-rate laser facilities.</p>
                            </div>
                            <div className="research-card">
                                <h3>Quantum Scattering Theory</h3>
                                <p>Developing advanced Independent Atom Models (IAM) to account for multiply ionized species in strong-field ionization experiments.</p>
                            </div>
                            <div className="research-card">
                                <h3>Electronic Structure Modeling</h3>
                                <p>Optimizing energy-transport simulations across molecular aggregates and excitonic polaritons for QED and photovoltaic applications.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Goals & Vision */}
                <section className="vision-section">
                    <h2>Strategic Goals</h2>
                    <div className="vision-content">
                        <div className="vision-text">
                            <p>My objective is to contribute to the next generation of time-resolved science by developing software and theoretical models that can handle the massive data volumes produced by modern XFEL and UED facilities. I aim to pursue a Ph.D. that integrates high-energy physics with advanced computational methods.</p>
                            
                            <p>I am dedicated to building reproducible, high-performance scientific software that empowers researchers to translate raw diffraction data into intuitive structural dynamics. By leveraging my background in both physics and computer science, I provide the cross-disciplinary expertise required for the future of computational AMO physics.</p>
                            
                            <blockquote>
                                "The goal of computational physics is not just to simulate reality, but to provide the precision required to discover the laws that govern it."
                            </blockquote>
                        </div>
                    </div>
                </section>

                <Footer />
            </main>
        </>
    )
}

export default About