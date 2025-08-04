import { useState, useEffect, useRef } from 'react';
import ParticleCollision from '../components/ParticleCollision';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { Menu, X, BookOpen, Zap, Atom, Brain, Calculator, Telescope, Code } from 'lucide-react';
import { useNavigate, Link, NavLink } from 'react-router-dom';
import "../designs/Home.css";

// Enhanced hook to get window size and orientation
const useWindowSize = () => {
    const [size, setSize] = useState([window.innerWidth, window.innerHeight]);
    const [orientation, setOrientation] = useState(
        window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'
    );
    
    useEffect(() => {
        const handleResize = () => {
            const newWidth = window.innerWidth;
            const newHeight = window.innerHeight;
            setSize([newWidth, newHeight]);
            setOrientation(newWidth > newHeight ? 'landscape' : 'portrait');
        };
        
        window.addEventListener('resize', handleResize);
        window.addEventListener('orientationchange', () => {
            // Delay to ensure correct dimensions after orientation change
            setTimeout(handleResize, 100);
        });
        
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('orientationchange', handleResize);
        };
    }, []);
    
    return { width: size[0], height: size[1], orientation };
};

function Home() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [visibleItems, setVisibleItems] = useState({});
    const navigate = useNavigate();
    const parallaxRef = useRef();
    const observerRef = useRef();
    const { width, height, orientation } = useWindowSize();

    // Enhanced device type detection with orientation consideration
    const getDeviceType = (width, height, orientation) => {
        const isMobile = width <= 768;
        const isTablet = width > 768 && width <= 1024;
        const isLandscape = orientation === 'landscape';
        
        // Mobile landscape detection
        if (isMobile && isLandscape && height <= 500) {
            return 'mobileLandscape';
        }
        
        // Original mobile portrait logic
        if (isMobile && !isLandscape) {
            if (width <= 320) return 'iPhoneSE';
            if (width <= 360) return 'GalaxyS8Plus';
            if (width <= 375) return 'FoldedZFold5';
            if (width <= 390) return 'iPhone12Series';
            if (width <= 414) return 'iPhoneXR';
            if (width <= 430) return 'iPhone14ProMax';
            return 'mobilePortrait';
        }
        
        // Tablet logic
        if (isTablet) {
            if (isLandscape) return 'tabletLandscape';
            return 'tabletPortrait';
        }
        
        return 'desktop';
    };
    
    const deviceType = getDeviceType(width, height, orientation);
    
    // Enhanced page settings with landscape optimization
    const pageSettings = {
        mobileLandscape: {
            pages: 15, // Increased pages for landscape mobile
            offsets: {
                hero: 0,
                researchInterests: 1.5,
                academicJourney: 4.5,
                currentResearch: 8.5,
                technicalExpertise: 10.5,
                achievements: 12,
                quote: 13.5,
                footer: 14.2,
            },
        },
        mobilePortrait: {
            pages: 11,
            offsets: {
                hero: 0,
                researchInterests: 1,
                academicJourney: 3,
                currentResearch: 6,
                technicalExpertise: 7.5,
                achievements: 8.5,
                quote: 9.5,
                footer: 10.2,
            },
        },
        iPhoneSE: {
            pages: 11.2,
            offsets: {
                hero: 0,
                researchInterests: 1,
                academicJourney: 3.1,
                currentResearch: 5.9,
                technicalExpertise: 7.0,
                achievements: 8.1,
                quote: 9.2,
                footer: 10.7,
            },
        },
        GalaxyS8Plus: {
            pages: 12.6,
            offsets: {
                hero: 0,
                researchInterests: 1,
                academicJourney: 3.5,
                currentResearch: 6.8,
                technicalExpertise: 8,
                achievements: 9.3,
                quote: 10.9,
                footer: 11.3,
            },
        },
        FoldedZFold5: {
            pages: 13.3,
            offsets: {
                hero: 0,
                researchInterests: 1,
                academicJourney: 3.7,
                currentResearch: 7,
                technicalExpertise: 8.5,
                achievements: 9.8,
                quote: 11,
                footer: 11.9,
            },
        },
        iPhone12Series: {
            pages: 10.4,
            offsets: {
                hero: 0,
                researchInterests: 1,
                academicJourney: 3.2,
                currentResearch: 6,
                technicalExpertise: 6.5,
                achievements: 7.4,
                quote: 8.8,
                footer: 9.3,
            },
        },
        iPhoneXR: {
            pages: 10.3,
            offsets: {
                hero: 0,
                researchInterests: 1,
                academicJourney: 3,
                currentResearch: 5.4,
                technicalExpertise: 6.5,
                achievements: 7.3,
                quote: 8.5,
                footer: 9.0,
            },
        },
        iPhone14ProMax: {
            pages: 11.3,
            offsets: {
                hero: 0,
                researchInterests: 1,
                academicJourney: 3.2,
                currentResearch: 5.9,
                technicalExpertise: 7,
                achievements: 8,
                quote: 9.5,
                footer: 10.3,
            },
        },
        tabletLandscape: {
            pages: 9,
            offsets: {
                hero: 0,
                researchInterests: 1,
                academicJourney: 2.5,
                currentResearch: 4.5,
                technicalExpertise: 5.8,
                achievements: 6.8,
                quote: 7.8,
                footer: 8.3,
            },
        },
        tabletPortrait: {
            pages: 8.5,
            offsets: {
                hero: 0,
                researchInterests: 1,
                academicJourney: 2.2,
                currentResearch: 4.2,
                technicalExpertise: 5.2,
                achievements: 6.1,
                quote: 7.0,
                footer: 7.8,
            },
        },
        desktop: {
            pages: 7.8,
            offsets: {
                hero: 0,
                researchInterests: 1,
                academicJourney: 2,
                currentResearch: 4.3,
                technicalExpertise: 5,
                achievements: 5.9,
                quote: 6.5,
                footer: 7,
            },
        },
    };

    // Apply settings based on device type
    const { pages, offsets } = pageSettings[deviceType] || pageSettings.desktop;

    // Timeline data
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
        {
            year: "2021",
            title: "Study Abroad — Transition from Vietnam to the U.S.",
            description: "Moved to the U.S. to pursue academic goals. Previously served as a teaching assistant in Math and Physics.",
            skills: ["Advanced Mathematics", "Tutoring", "Adaptability"]
        }
    ];

    const physicsFields = [
        { icon: <Atom />, title: "Quantum Mechanics", description: "Exploring the behavior of matter and energy at the atomic and subatomic levels." },
        { icon: <Zap />, title: "Electrodynamics", description: "Studying the fundamental principles of electricity, magnetism, and their interrelationship." },
        { icon: <Telescope />, title: "Cosmology", description: "Investigating the origin, evolution, and large-scale structure of the universe." },
        { icon: <Brain />, title: "General Relativity", description: "Understanding properties of black hole and gravity with modern approaches." },
        { icon: <Calculator />, title: "Mathematical Physics", description: "Applying advanced mathematical methods to solve problems in physics." },
        { icon: <BookOpen />, title: "Classical Mechanics", description: "The study of the motion of objects, from projectiles to planetary orbits." }
    ];

    const researchAreas = [
        { title: "Ultrafast Electron Diffraction (UED)", description: "Developing simulations to model electron diffraction data in gases.", progress: 50 },
        { title: "Black Hole Thermodynamics", description: "Investigating the thermodynamic properties of black holes and their connection to quantum gravity.", progress: 60 },
        { title: "Dark Matter Detection Algorithms", description: "Designing algorithms to analyze experimental data for potential dark matter signatures.", progress: 40 },
    ];

    // Enhanced scroll handling with debouncing
    useEffect(() => {
        if (parallaxRef.current) {
            parallaxRef.current.scrollTo(0);
        }
        
        let timeoutId;
        const handleScroll = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                if (parallaxRef.current?.container.current) {
                    const { scrollTop, scrollHeight, clientHeight } = parallaxRef.current.container.current;
                    const progress = scrollTop / (scrollHeight - clientHeight);
                    setScrollProgress(Math.min(progress, 1));
                }
            }, 10); // Debounce scroll events
        };
        
        const container = parallaxRef.current?.container.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
            return () => {
                container.removeEventListener('scroll', handleScroll);
                clearTimeout(timeoutId);
            };
        }
    }, [deviceType]); // Re-run when device type changes

    // Intersection observer for timeline animations
    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisibleItems(prev => ({ ...prev, [entry.target.id]: true }));
                    }
                });
            },
            { threshold: 0.1, rootMargin: '50px' }
        );
        
        const elements = document.querySelectorAll('.timeline-item');
        elements.forEach((item, index) => {
            item.id = `timeline-${index}`;
            if (observerRef.current) observerRef.current.observe(item);
        });
        
        return () => {
            if (observerRef.current) observerRef.current.disconnect();
        };
    }, []);
    
    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    const scrollTo = (pageIndex) => {
        if (parallaxRef.current) {
            parallaxRef.current.scrollTo(pageIndex);
            closeMobileMenu();
        }
    };

    // Add dynamic class based on orientation for CSS targeting
    useEffect(() => {
        document.body.className = `${orientation} ${deviceType}`;
        return () => {
            document.body.className = '';
        };
    }, [orientation, deviceType]);

    return (
        <div style={{ height: '100vh', overflow: 'hidden' }} className={`app-container ${orientation} ${deviceType}`}>
            {/* Particle collision component */}
            <ParticleCollision scrollProgress={scrollProgress} />
            
            <Parallax pages={pages} ref={parallaxRef}>
                {/* Navbar */}
                <nav className="navbar">
                        <div className="navbar-container">
                            <div className='logo logo-left' onClick={() => scrollTo(offsets.hero)} style={{cursor: "pointer"}}>
                                KHANG LUONG
                            </div>

                            <div className={`nav-items ${isMobileMenuOpen ? 'open' : ''}`}>
                                <button className='menu-toggle close-btn' onClick={closeMobileMenu}><X size={24}/></button>
                                
                                <NavLink 
                                    to="/" 
                                    className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                                    onClick={closeMobileMenu}
                                >
                                    HOME
                                </NavLink>

                                <NavLink 
                                    to="/About" 
                                    className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                                    onClick={closeMobileMenu}
                                >
                                    ABOUT
                                </NavLink>
                                
                                <NavLink 
                                    to="/Research" 
                                    className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                                    onClick={closeMobileMenu}
                                >
                                    RESEARCH
                                </NavLink>

                                <NavLink 
                                    to="/Connect" 
                                    className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                                    onClick={closeMobileMenu}
                                >
                                    CONNECT
                                </NavLink>
                            </div>
                            
                            {!isMobileMenuOpen && (
                                <div className='logo logo-right' onClick={() => scrollTo(offsets.hero)} style={{cursor: "pointer"}}>KHANG LUONG</div>
                            )}
                            {!isMobileMenuOpen && (
                                <button className="menu-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}><Menu size={24} /></button>
                            )}
                        </div>
                    </nav>

                {/* Hero Section */}
                <ParallaxLayer offset={offsets.hero} speed={0.1}>
                    <section className="hero-section">
                        <div className="hero-content">
                            <h1 className="hero-title">Beyond the Observable.</h1>
                            <h2 className="hero-subtitle">Exploring the Universe, One Equation at a Time.</h2>
                            <p className="hero-description">A passionate physics enthusiast and researcher, dedicated to unraveling the mysteries of the cosmos.</p>
                            <div className="cta-buttons">
                                <button
                                    className='cta-button cta-primary'
                                    onClick={() => navigate('/Connect')}
                                >
                                    Get in Touch <i className='fas fa-arrow-right'></i>
                                </button>
                                <a
                                    href="/papers/Resume.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="cta-button cta-secondary"
                                >
                                    View Resume <i className="fas fa-download"></i>
                                </a>
                            </div>
                        </div>
                        <div className="scroll-indicator">
                            <div className="scroll-arrow" onClick={() => scrollTo(offsets.academicJourney)} style={{cursor: "pointer"}}></div>
                        </div>
                    </section>
                </ParallaxLayer>

                {/* Research Interests Section */}
                <ParallaxLayer offset={offsets.researchInterests} speed={0.2}>
                    <div className="content-section">
                        <div className="section-container">
                            <h2 className="section-title">Research Interests</h2>
                            <div className="physics-grid">
                                {physicsFields.map((field, index) => (
                                    <div key={index} className="physics-card">
                                        <div className="physics-icon">{field.icon}</div>
                                        <h3 className="physics-title">{field.title}</h3>
                                        <p className="physics-description">{field.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </ParallaxLayer>

                {/* Academic Journey Section */}
                <ParallaxLayer offset={offsets.academicJourney} speed={0.3}>
                    <div className="content-section">
                        <div className="section-container">
                            <h2 className="section-title">Academic Journey</h2>
                            <div className="timeline-container">
                                <div className="timeline">
                                    {timelineData.map((item, index) => (
                                        <div key={index} className={`timeline-item ${visibleItems[`timeline-${index}`] ? 'visible' : ''}`} style={{ animationDelay: `${index * 0.2}s` }}>
                                            <div className="timeline-marker"></div>
                                            <div className="timeline-content">
                                                <div className="timeline-year">{item.year}</div>
                                                <h3 className="timeline-title">{item.title}</h3>
                                                <h4 style={{ color: 'var(--accent-blue)', marginBottom: '1rem', fontWeight: '500' }}>{item.institution}</h4>
                                                <p className="timeline-description">{item.description}</p>
                                                <div className="timeline-skills">
                                                    {item.skills.map((skill, skillIndex) => (<span key={skillIndex} className="skill-tag">{skill}</span>))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </ParallaxLayer>

                {/* Current Research Section */}
                <ParallaxLayer offset={offsets.currentResearch} speed={0.4}>
                    <div className="content-section">
                        <div className="section-container">
                            <h2 className="section-title">Current Research Focus</h2>
                            <div className="research-progress-grid">
                                {researchAreas.map((area, index) => (
                                    <div key={index} className="research-progress-card">
                                        <h3>{area.title}</h3>
                                        <p>{area.description}</p>
                                        <div className="progress-bar-container">
                                            <div className="progress-bar-fill"><div style={{ width: `${area.progress}%` }}></div></div>
                                            <span>{area.progress}%</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </ParallaxLayer>

                {/* Technical Expertise Section */}
                <ParallaxLayer offset={offsets.technicalExpertise} speed={0.5}>
                    <div className="content-section">
                        <div className="section-container">
                            <h2 className="section-title">Technical Expertise</h2>
                            <div className="skills-grid">
                                <div className="physics-card">
                                    <Code className="physics-icon" size={48} />
                                    <h3 className="physics-title">Programming Languages</h3>
                                    <div className="timeline-skills">{['Python', 'HTML/CSS', 'React', 'JavaScript', 'C#'].map((skill, i) => (<span key={i} className="skill-tag">{skill}</span>))}</div>
                                </div>
                                <div className="physics-card">
                                    <Calculator className="physics-icon" size={48} />
                                    <h3 className="physics-title">Mathematical Tools</h3>
                                    <div className="timeline-skills">{['Linear Algebra', 'Calculus', 'Differential Equations', 'Numerical Methods'].map((skill, i) => (<span key={i} className="skill-tag">{skill}</span>))}</div>
                                </div>
                                <div className="physics-card">
                                    <Telescope className="physics-icon" size={48} />
                                    <h3 className="physics-title">Research Tools</h3>
                                    <div className="timeline-skills">{['LaTeX', 'Jupyter', 'Git', 'Data Analysis'].map((skill, i) => (<span key={i} className="skill-tag">{skill}</span>))}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ParallaxLayer>
                
                {/* Achievements Section */}
                <ParallaxLayer offset={offsets.achievements} speed={0.6}>
                    <div className="content-section">
                        <div className="section-container">
                            <h2 className="section-title">Academic Achievements</h2>
                            <div className="achievements-grid">
                                {[
                                    { icon: "🏆", title: "UCARE Research Fellowship", desc: "Awarded undergraduate research funding for the 2025-2026 academic year." },
                                    { icon: "📚", title: "Dean's List — College of Arts and Sciences", desc: "Recognized for academic excellence during the 2024-2025 academic year." },
                                    { icon: "🎯", title: "American Mathematics Competition", desc: "Placed 4th in the national-level mathematics competition." },
                                    { icon: "🔬", title: "Undergraduate Research Assistant", desc: "Collaborating with faculty on advanced research in physics and computation." },
                                ].map((achievement, index) => (
                                    <div key={index} className="achievement-card">
                                        <div className="achievement-icon">{achievement.icon}</div>
                                        <h3 className="physics-title">{achievement.title}</h3>
                                        <p className="physics-description">{achievement.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </ParallaxLayer>

                {/* Quote Section */}
                <ParallaxLayer offset={offsets.quote} speed={0.7}>
                    <div className="content-section">
                        <div className="section-container">
                            <div className="quote-box">
                                <div className="quote-icon">"</div>
                                <blockquote className="quote-text">"I was an ordinary person who studied hard. There are no miracle people. It happens they get interested in this thing and they learn all this stuff, but they're just people."</blockquote>
                                <cite className="quote-author">— Richard Feynman</cite>
                            </div>
                        </div>
                    </div>
                </ParallaxLayer>

                {/* Footer */}
                <ParallaxLayer offset={offsets.footer} speed={0.2}>
                    <footer>
                        <div className="footer-container">
                            <div className="footer-content">
                                <div className="footer-section">
                                    <h4>About</h4>
                                    <p>Passionate developer creating innovative web solutions with modern technologies and clean design principles.</p>
                                </div>
                                
                                <div className="footer-section">
                                    <h4>Quick Links</h4>
                                    <ul>
                                        <li><Link to="/">Home</Link></li>
                                        <li><Link to="/About">About</Link></li>
                                        <li><Link to="/Projects">Projects</Link></li>
                                        <li><Link to="/Contact">Contact</Link></li>
                                    </ul>
                                </div>
                                
                                <div className="footer-section">
                                    <h4>Technologies</h4>
                                    <div className="tech-tags">
                                        <span>React</span>
                                        <span>JavaScript</span>
                                        <span>CSS</span>
                                        <span>Node.js</span>
                                        <span>HTML</span>
                                        <span>Python</span>
                                    </div>
                                </div>
                                
                                <div className="footer-section">
                                    <h4>Connect</h4>
                                    <div className="contact-info">
                                        <p><i className="fas fa-envelope"></i> <a href="mailto:lpnk959@gmail.com">lpnk959@gmail.com</a></p>
                                        <p><i className="fas fa-map-marker-alt"></i> Available for remote work</p>
                                    </div>
                                    <div className="social-icons">
                                        <a href="https://www.instagram.com/khang_luong_314/" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                                        <a href="https://www.linkedin.com/in/khang-luong-776ab8277/" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
                                        <a href="https://github.com/KhangLuong314" aria-label="GitHub"><i className="fab fa-github"></i></a>
                                        <a href="https://twitter.com" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="footer-bottom">
                                <div className="footer-divider"></div>
                                <div className="footer-credits">
                                    <p>&copy; {new Date().getFullYear()} Khang Luong. All rights reserved.</p>
                                    <p>Built with React • Designed with passion</p>
                                </div>
                            </div>
                        </div>
                    </footer>
                </ParallaxLayer>
            </Parallax>
        </div>
    );
}

export default Home;