import { useState, useEffect } from 'react';
import { Menu, X, BookOpen, ExternalLink, Download, Calendar, Users, Award, ChevronDown, ChevronUp, Eye, FileText, Link as LinkIcon, Quote } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import 'katex/dist/katex.min.css';
import '../designs/Research.css'
import { InlineMath, BlockMath } from 'react-katex';

const LaTeXRenderer = ({ children, block = false }) => {
  return block ? (
    <BlockMath>{children}</BlockMath>
  ) : (
    <InlineMath>{children}</InlineMath>
  );
};

function Research() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedPaper, setExpandedPaper] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const researchPapers = [
    {
      id: 1,
      title: "A Computational Approach to Ionized Molecular Diffraction",
      authors: ["Khang Luong", "Dr. Martin Centurion"],
      journal: "American Chemical Society",
      year: "2024-2025",
      status: "In Preparation",
      category: "computational",
      abstract: "We present a comprehensive study of ultrafast electron diffraction (UED) applied to ionized gas-phase molecular dynamics. Our simulations reveal novel insights into the structural dynamics of molecular systems under femtosecond laser excitation.",
      keyFindings: [
        "Developed advanced simulation models for electron diffraction in gases",
        "Observed coherent nuclear motion with sub-100fs resolution",
        "Identified key signatures of non-adiabatic coupling in molecular dynamics"
      ],
      doi: "Pending",
      pdfUrl: `${import.meta.env.BASE_URL}papers/ucare-proposal.pdf`,
      journalUrl: "https://journals.aps.org/prl/",
      citations: 0,
      tags: ["Ultrafast Dynamics", "Electron Diffraction", "Molecular Physics", "Computational Physics"],
      latex: "I_{mol}(s)=\\sum_{i=1}^{N} \\sum_{i=1, j \\neq i}^{N}|f_{i}(s)||f_{j}(s)|cos(\\eta_{i}(s) - \\eta_{j}(s))exp\\left(-\\frac{1}{2}l_{ij}^{2}s^{2}\\right)\\frac{sin(sr_{ij})}{sr_{ij}}",
      featured: true
    },
    {
      id: 2,
      title: "A Scientific Inquiry into the Infinity of the Universe",
      authors: ["Khang Luong"],
      journal: "Pius X High School",
      year: "2024",
      status: "No Publication",
      category: "high school",
      abstract: "This paper challenges the idea of a single beginning to the universe by exploring theories from physics and cosmology that suggest the universe may be infinite, eternal, and part of a larger system beyond the Big Bang.",
      keyFindings: [
        "The Laws of Physics Are Time-Invariant and Suggest a Preexisting Universe",
        "Hawking's No-Boundary Proposal Supports a Self-Contained Universe",
        "Thermodynamic and Cosmological Observations Cannot Rule Out an Eternal Universe"
      ],
      doi: "Pending",
      pdfUrl: `${import.meta.env.BASE_URL}papers/A_Scientific_Inquiry_to_the_Infinity_of_the_Universe.pdf`,
      journalUrl: "https://journals.aps.org/prl/",
      tags: ["General Relativity", "Quantum Information", "Black Holes"],
      featured: true
    },
    {
      id: 3,
      title: "Quantum Dots and Particle in a Box Presentation",
      authors: ["Khang Luong"],
      journal: "Modern Physics Lab Presentation",
      year: "2025",
      status: "Locally Published",
      category: "experimental",
      abstract: "This presentation introduces the fundamental physics, properties, and applications of quantum dots, highlighting their nanoscale structure, quantum confinement effects, and role in cutting-edge technologies like displays, bioimaging, and quantum computing.",
      keyFindings: [
        "Quantum confinement leads to tunable optical properties ",
        "Quantum dots exhibit discrete energy levels like atoms",
        "Quantum dots have diverse, high-impact applications"
      ],
      doi: "Pending",
      pdfUrl: "https://khangluong314.github.io/quantum-dot-presentation/",
      journalUrl: "https://khangluong314.github.io/quantum-dot-presentation/",
      tags: ["Quantum Mechanics", "Quantum Optics", "Experimental Physics"],
      latex: "E_{emission} = E_g + \\frac{\\hbar^2\\pi^2}{2a^2} \\left(\\frac{1}{m_e} + \\frac{1}{m_h} \\right)",
      featured: true
    },
    {
      id: 4,
      title: "Particle Accelerator: The Key to Time Travel",
      authors: ["Khang Luong"],
      journal: "Pius X High School",
      year: "2024",
      status: "No Publication",
      category: "high school",
      abstract: "This paper explores the possibility of time travel through particle accelerators by examining high-speed particle collisions, alternative energy sources, and major physics theories—ultimately suggesting that such technology could unlock deeper truths about time, reality, and the multiverse.",
      keyFindings: [
        "Particle accelerators may enable time travel if particles can reach the speed of light",
        "Achieving the required energy for time travel may be possible through hypothetical particles like tachyons",
        "Particle collisions could open wormholes or black holes, raising possibilities—and risks—for multiverse access"
      ],
      doi: "In Preparation",
      pdfUrl: `${import.meta.env.BASE_URL}papers/Particle_Accelerator__The_Key_to_Time_Travel.pdf`,
      journalUrl: "https://journals.aps.org/prl/",
      tags: ["Special Relativity", "Quantum Physics", "High Energy Physics"],
      featured: false
    }
  ];

  const conferences = [
    {
      title: "UNL Student Research Day",
      presentation: "Gas-Phase Molecular Dynamics via UED",
      location: "University of Nebraska-Lincoln",
      date: "April 2026",
      type: "Poster Presentation"
    }
  ];

  const collaborations = [
    {
      institution: "Graduate Studies UNL",
      project: "A Computational Approach to Ioinzed Molecular Diffraction",
      role: "UCARE Student Worker",
      duration: "2025-2026"
    },
    {
      institution: "Centurion Group, University of Nebraska-Lincoln",
      project: "Gas Phase Ultrafast Electron Diffraction",
      role: "Research Assistant",
      duration: "2024-Present"
    }
  ];

  const categories = [
    { key: 'all', label: 'All Research', count: researchPapers.length },
    { key: 'experimental', label: 'Experimental', count: researchPapers.filter(p => p.category === 'experimental').length },
    { key: 'theoretical', label: 'Theoretical', count: researchPapers.filter(p => p.category === 'theoretical').length },
    { key: 'computational', label: 'Computational', count: researchPapers.filter(p => p.category === 'computational').length },
    { key: 'high school', label: 'High School Papers', count: researchPapers.filter(p => p.category === 'high school').length }
  ];

  const filteredPapers = selectedCategory === 'all' 
    ? researchPapers 
    : researchPapers.filter(paper => paper.category === selectedCategory);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const togglePaperExpansion = (paperId) => {
    setExpandedPaper(expandedPaper === paperId ? null : paperId);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Published': return 'var(--success-color)';
      case 'Under Review': return 'var(--warning-color)';
      case 'In Preparation': return 'var(--accent-blue)';
      default: return 'var(--text-secondary)';
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--primary-bg)' }}>
      <Navbar />
      {/* Hero Section */}
      <section className="research-hero">
        <div className="hero-content">
          <h1 className="hero-title">Research & Publications</h1>
          <p className="hero-description">
            Exploring the frontiers of physics through computational modeling, experimental analysis, 
            and theoretical investigation. My work spans atomic, molecular, optics (AMO), and computational physics.
          </p>
          {/*
          <div className="research-stats">
            <div className="stat-card">
              <div className="stat-number">{researchPapers.length}</div>
              <div className="stat-label">Publications</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{researchPapers.reduce((sum, paper) => sum + paper.citations, 0)}</div>
              <div className="stat-label">Citations</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{conferences.length}</div>
              <div className="stat-label">Conferences</div>
            </div>
          </div> */}
        </div>
      </section>

      {/* Research Categories Filter */}
      <section className="category-filter">
        <div className="section-container">
          <div className="filter-buttons">
            {categories.map(category => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`filter-btn ${selectedCategory === category.key ? 'active' : ''}`}
              >
                {category.label} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Research Papers Section */}
      <section className="research-papers">
        <div className="section-container">
          <h2 className="section-title">Publications</h2>
          <div className="papers-grid">
            {filteredPapers.map(paper => (
              <div key={paper.id} className={`paper-card ${paper.featured ? 'featured' : ''}`}>
                {paper.featured && <div className="featured-badge">Featured</div>}
                
                <div className="paper-header">
                  <h3 className="paper-title">{paper.title}</h3>
                  <div className="paper-meta">
                    <span className="paper-authors">
                      {paper.authors.join(', ')}
                    </span>
                    <span className="paper-year">{paper.year}</span>
                  </div>
                  <div className="paper-journal">
                    <BookOpen size={16} />
                    <span>{paper.journal}</span>
                    <span 
                      className="paper-status"
                      style={{ color: getStatusColor(paper.status) }}
                    >
                      {paper.status}
                    </span>
                  </div>
                </div>

                <div className="paper-content">
                  <p className="paper-abstract">{paper.abstract}</p>
                  
                  {paper.latex && (
                    <div className="latex-section">
                      <h4>Key Equation:</h4>
                      <LaTeXRenderer block>{paper.latex}</LaTeXRenderer>
                    </div>
                  )}

                  <div className="paper-tags">
                    {paper.tags.map(tag => (
                      <span key={tag} className="paper-tag">{tag}</span>
                    ))}
                  </div>

                  {expandedPaper === paper.id && (
                    <div className="expanded-content">
                      <h4>Key Findings:</h4>
                      <ul className="findings-list">
                        {paper.keyFindings.map((finding, index) => (
                          <li key={index}>{finding}</li>
                        ))}
                      </ul>
                      
                      {paper.citations > 0 && (
                        <div className="citation-info">
                          <Quote size={16} />
                          <span>Cited {paper.citations} times</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="paper-actions">
                  <div className="action-buttons">
                    {paper.pdfUrl && (
                      <a href={paper.pdfUrl} target="_blank" rel="noopener noreferrer" className="action-btn primary">
                        <Download size={16} />
                        PDF
                      </a>
                    )}
                    {paper.journalUrl && paper.status === 'Published' && (
                      <a href={paper.journalUrl} target="_blank" rel="noopener noreferrer" className="action-btn secondary">
                        <ExternalLink size={16} />
                        Journal
                      </a>
                    )}
                    {paper.doi !== 'Pending' && paper.doi !== 'In Preparation' && (
                      <a href={`https://doi.org/${paper.doi}`} target="_blank" rel="noopener noreferrer" className="action-btn secondary">
                        <LinkIcon size={16} />
                        DOI
                      </a>
                    )}
                  </div>
                  
                  <button 
                    onClick={() => togglePaperExpansion(paper.id)}
                    className="expand-btn"
                  >
                    {expandedPaper === paper.id ? (
                      <>
                        <ChevronUp size={16} />
                        Less
                      </>
                    ) : (
                      <>
                        <ChevronDown size={16} />
                        More
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conferences Section */}
      <section className="conferences-section">
        <div className="section-container">
          <h2 className="section-title">Conference Presentations</h2>
          <div className="conferences-grid">
            {conferences.map((conf, index) => (
              <div key={index} className="conference-card">
                <div className="conference-header">
                  <h3>{conf.title}</h3>
                  <span className="conference-type">{conf.type}</span>
                </div>
                <div className="conference-details">
                  <p className="presentation-title">{conf.presentation}</p>
                  <div className="conference-meta">
                    <span><Calendar size={14} />{conf.date}</span>
                    <span>{conf.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaborations Section */}
      <section className="collaborations-section">
        <div className="section-container">
          <h2 className="section-title">Research Collaborations</h2>
          <div className="collaborations-grid">
            {collaborations.map((collab, index) => (
              <div key={index} className="collaboration-card">
                <div className="collaboration-header">
                  <Users className="collaboration-icon" />
                  <div>
                    <h3>{collab.institution}</h3>
                    <p>{collab.project}</p>
                  </div>
                </div>
                <div className="collaboration-details">
                  <span className="role">{collab.role}</span>
                  <span className="duration">{collab.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Research;