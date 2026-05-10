import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Mail, Phone, MapPin, Send, User, MessageSquare, Calendar, ExternalLink, Github, Linkedin, Instagram, Twitter } from 'lucide-react';
import '../designs/Connect.css';

function Connect() {
    const API_URL = import.meta.env.VITE_API_URL

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        preferredContact: 'email',
        urgency: 'normal'
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null
    const [errors, setErrors] = useState({});

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    // Form validation
    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.subject.trim()) {
            newErrors.subject = 'Subject is required';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters long';
        }

        return newErrors;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        setIsSubmitting(true);
        setErrors({});

        try {
            // Here you would typically send the data to your backend
            // For now, we'll simulate an API call
            await submitToBackend(formData);
            
            setSubmitStatus('success');
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: '',
                preferredContact: 'email',
                urgency: 'normal'
            });
        } catch (error) {
            setSubmitStatus('error');
            console.error('Form submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const submitToBackend = async (data) => {
        const response = await fetch(`${API_URL}/contact`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });
      
        if (!response.ok) {
          throw new Error("Failed to submit form");
        }
      
        return response.json();
    };

    // Contact information
    const contactInfo = [
        {
            icon: <Mail className="contact-icon" />,
            title: "Email",
            value: "kluong3@huskers.unl.edu",
            link: "mailto:kluong3@huskers.unl.edu"
        },
        {
            icon: <MapPin className="contact-icon" />,
            title: "Location",
            value: "Lincoln, Nebraska, USA",
            link: "https://maps.google.com/?q=Lincoln,Nebraska"
        }
    ];

    // Social media links
    const socialLinks = [
        {
            icon: <Github className="social-icon" />,
            name: "GitHub",
            url: "https://github.com/KhangLuong314",
            color: "#333"
        },
        {
            icon: <Linkedin className="social-icon" />,
            name: "LinkedIn",
            url: "https://www.linkedin.com/in/khang-luong-776ab8277/",
            color: "#0077b5"
        }
    ];

    return (
        <>
            <main>

                <Navbar />
                {/* Page Title */}
                <section className="connect-hero">
                    <h1 className="connect-title">Professional Connection</h1>
                    <p className="connect-subtitle">
                        Interested in discussing AMO research, computational modeling, or physics-informed machine learning? 
                        I am open to collaborations and research opportunities in national labs and academia.
                    </p>
                </section>

                <section className="connect-content">
                    {/* Contact Form */}
                    <div className="contact-form-section">
                        <h2 className="section-title">Inquiry Form</h2>
                        
                        {/* Status Messages */}
                        {submitStatus === 'success' && (
                            <div className="status-message success">
                                <div className="status-icon">✓</div>
                                <div>
                                    <h3>Inquiry Submitted Successfully</h3>
                                    <p>Thank you for reaching out. I will respond to your research or professional inquiry promptly.</p>
                                </div>
                            </div>
                        )}

                        {submitStatus === 'error' && (
                            <div className="status-message error">
                                <div className="status-icon">✗</div>
                                <div>
                                    <h3>Submission Error</h3>
                                    <p>Please try again or contact me directly via my university email.</p>
                                </div>
                            </div>
                        )}

                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="name" className="form-label">
                                        <User size={18} />
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className={`form-input ${errors.name ? 'error' : ''}`}
                                        placeholder="Enter your name"
                                        disabled={isSubmitting}
                                    />
                                    {errors.name && <span className="error-message">{errors.name}</span>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email" className="form-label">
                                        <Mail size={18} />
                                        Professional Email *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className={`form-input ${errors.email ? 'error' : ''}`}
                                        placeholder="email@institution.edu"
                                        disabled={isSubmitting}
                                    />
                                    {errors.email && <span className="error-message">{errors.email}</span>}
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="subject" className="form-label">
                                    <MessageSquare size={18} />
                                    Subject *
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    className={`form-input ${errors.subject ? 'error' : ''}`}
                                    placeholder="Research Collaboration / PhD Inquiry / Technical Question"
                                    disabled={isSubmitting}
                                />
                                {errors.subject && <span className="error-message">{errors.subject}</span>}
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="preferredContact" className="form-label">
                                        <Phone size={18} />
                                        Preferred Method
                                    </label>
                                    <select
                                        id="preferredContact"
                                        name="preferredContact"
                                        value={formData.preferredContact}
                                        onChange={handleInputChange}
                                        className="form-input"
                                        disabled={isSubmitting}
                                    >
                                        <option value="email">Email</option>
                                        <option value="linkedin">LinkedIn</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="urgency" className="form-label">
                                        <Calendar size={18} />
                                        Inquiry Type
                                    </label>
                                    <select
                                        id="urgency"
                                        name="urgency"
                                        value={formData.urgency}
                                        onChange={handleInputChange}
                                        className="form-input"
                                        disabled={isSubmitting}
                                    >
                                        <option value="normal">Research Inquiry</option>
                                        <option value="high">Urgent Technical Matter</option>
                                        <option value="low">General Networking</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="message" className="form-label">
                                    <MessageSquare size={18} />
                                    Message *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    className={`form-textarea ${errors.message ? 'error' : ''}`}
                                    placeholder="Briefly describe your research focus or inquiry..."
                                    rows="6"
                                    disabled={isSubmitting}
                                />
                                {errors.message && <span className="error-message">{errors.message}</span>}
                            </div>

                            <button
                                type="submit"
                                className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="spinner"></div>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send size={18} />
                                        Send Professional Inquiry
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div className="contact-info-section">
                        <h2 className="section-title">Direct Channels</h2>
                        
                        <div className="contact-methods">
                            {contactInfo.map((contact, index) => (
                                <a
                                    key={index}
                                    href={contact.link}
                                    className="contact-method"
                                    target={contact.link.startsWith('http') ? '_blank' : '_self'}
                                    rel={contact.link.startsWith('http') ? 'noopener noreferrer' : ''}
                                >
                                    {contact.icon}
                                    <div className="contact-details">
                                        <h3>{contact.title}</h3>
                                        <p>{contact.value}</p>
                                    </div>
                                    <ExternalLink size={16} className="external-link-icon" />
                                </a>
                            ))}
                        </div>

                        <div className="social-section">
                            <h3 className="social-title">Academic & Professional Networks</h3>
                            <div className="social-links">
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.url}
                                        className="social-link"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title={social.name}
                                        style={{ '--social-color': social.color }}
                                    >
                                        {social.icon}
                                        <span>{social.name}</span>
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="availability-section">
                            <h3 className="availability-title">Availability</h3>
                            <div className="availability-info">
                                <div className="availability-item">
                                    <div className="status-indicator available"></div>
                                    <span>Open for SLAC/LANSCE Collaborations</span>
                                </div>
                                <div className="availability-item">
                                    <div className="status-indicator available"></div>
                                    <span>Seeking 2026 PhD/Research Roles</span>
                                </div>
                            </div>
                            <p className="response-time">
                                <Calendar size={16} />
                                Professional response within 24 hours
                            </p>
                        </div>
                    </div>
                </section>

                <Footer />
            </main>
        </>
    );
}

export default Connect;