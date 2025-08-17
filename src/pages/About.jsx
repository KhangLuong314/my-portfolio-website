import { useState } from 'react'
import Navbar from "../components/Navbar"
import Footer from '../components/Footer'
import Carousel from '../components/Carousel'
import "../designs/About.css"

function About() {
    const imagesUrls = [
        ".public/assets/group1.jpg",
        ".public/assets/group2.jpeg",
        ".public/assets/group3.jpeg",
        ".public/assets/group4.jpeg",
        ".public/assets/group6.jpg",
        ".public/assets/group7.jpg",
        ".public/assets/group8.jpeg",
        ".public/assets/group9.jpeg"
    ]

    const skills = [
        { category: "Physics & Research", items: ["Quantum Scattering Theory", "Computational Physics", "Data Analysis", "Scientific Writing", "LaTeX"] },
        { category: "Programming", items: ["Python", "C#", "JavaScript", "React", "HTML/CSS"] },
        { category: "Mathematics", items: ["Advanced Calculus", "Linear Algebra", "Differential Equations", "Numerical Methods"] },
        { category: "Laboratory", items: ["Experimental Design", "Instrumentation", "Error Analysis", "Lab Safety"] }
    ]

    const achievements = [
        { title: "AMC 12 Recognition", description: "Mathematical excellence in national competition" },
        { title: "Americanism Essay Contest", description: "Award for outstanding academic writing" },
        { title: "STEM Outreach", description: "Active contributor to science education programs" },
        { title: "Academic Excellence", description: "Consistent high performance in physics coursework" }
    ]

    return (
        <>
            <main>
                <Navbar />
                
                {/* Hero Section */}
                <section className="hero">
                    <div className="stuff">
                        <h1>Khang Luong</h1>
                        <h2>Physics Student & Undergraduate Research Assistant</h2>
                        <p className="sub">Exploring the universe through physics, computation, and research.</p>
                    </div>
                    <div className="image">
                        <Carousel images={imagesUrls} interval={4000} />
                    </div>
                </section>

                {/* About Section */}
                <section className="about-section">
                    <div className="about-content">
                        <div className="profile-section">
                            <div className="profile-image">
                                <img src="../public/assets/profile-pic.jpeg" alt="Khang Luong"/>
                            </div>
                            <div className="profile-info">
                                <h2>About Me</h2>
                                <p>I'm an undergraduate Physics student at the University of Nebraska-Lincoln with a passion for quantum mechanics and science communication. Originally from Vietnam, I moved to the United States in 2022 to pursue rigorous academic opportunities and contribute to the scientific community.</p>
                                
                                <p>My journey in physics is driven by a fundamental curiosity about the nature of reality. From wave-particle duality to quantum entanglement, I find myself constantly amazed by the elegant mathematics that describe our universe. This fascination led me to not only study these concepts but also share them with others through accessible science communication.</p>
                                
                                <p>Beyond academics, I'm committed to making science education more inclusive and engaging. I believe that complex scientific principles can be explained in ways that inspire wonder and understanding in people from all backgrounds.</p>
                                
                                <div className="contact-info">
                                    <div className="contact-item">
                                        <strong>Location:</strong> Lincoln, Nebraska
                                    </div>
                                    <div className="contact-item">
                                        <strong>University:</strong> University of Nebraska-Lincoln
                                    </div>
                                    <div className="contact-item">
                                        <strong>Major:</strong> Physics (Quantum Mechanics Focus)
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Skills Section */}
                <section className="skills-section">
                    <h2>Skills & Expertise</h2>
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
                    <h2>Achievements & Recognition</h2>
                    <div className="achievements-grid">
                        {achievements.map((achievement, index) => (
                            <div key={index} className="achievement-card">
                                <h3>{achievement.title}</h3>
                                <p>{achievement.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Research Interests */}
                <section className="research-section">
                    <h2>Research Interests</h2>
                    <div className="research-content">
                        <div className="research-grid">
                            <div className="research-card">
                                <h3>Quantum Mechanics</h3>
                                <p>Investigating fundamental quantum phenomena, wave-particle duality, and quantum entanglement with applications in quantum computing and information theory.</p>
                            </div>
                            <div className="research-card">
                                <h3>Particle Physics</h3>
                                <p>Exploring particle accelerator research and the fundamental building blocks of matter, with aspirations to contribute to experimental high-energy physics.</p>
                            </div>
                            <div className="research-card">
                                <h3>Computational Physics</h3>
                                <p>Developing numerical methods and simulations to model complex physical systems and solve theoretical problems in quantum mechanics.</p>
                            </div>
                            <div className="research-card">
                                <h3>AMO Physics</h3>
                                <p>Atomic, molecular, and optic physics. Create simulatations for scientific experiments and perform data analysis.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Goals & Vision */}
                <section className="vision-section">
                    <h2>Future Goals</h2>
                    <div className="vision-content">
                        <div className="vision-text">
                            <p>My long-term goal is to pursue a Ph.D. in quantum physics and contribute meaningfully to both research and education. I'm particularly interested in particle accelerator research and the development of new experimental techniques that could advance our understanding of fundamental physics.</p>
                            
                            <p>I envision a future where scientific knowledge is not confined to academic circles but is actively shared and celebrated in the broader community. Through continued research, teaching, and science communication, I hope to inspire the next generation of physicists and contribute to solving some of the most profound questions about our universe.</p>
                            
                            <blockquote>
                                "The beauty of physics lies not just in its equations, but in its power to reveal the elegant simplicity underlying the apparent complexity of our world."
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