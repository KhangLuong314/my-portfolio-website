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
        const response = await fetch(`${API}/Contact`, {
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
            value: "lpnk959@gmail.com",
            link: "mailto:lpnk959@gmail.com"
        },
        {
            icon: <Phone className="contact-icon" />,
            title: "Phone",
            value: "+1 (531) 248-6515",
            link: "tel:+15312486515"
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
        },
        {
            icon: <Instagram className="social-icon" />,
            name: "Instagram",
            url: "https://www.instagram.com/khang_luong_314/",
            color: "#e4405f"
        },
        {
            icon: <Twitter className="social-icon" />,
            name: "Twitter",
            url: "https://twitter.com",
            color: "#1da1f2"
        }
    ];

    return (
        <div className="connect-page">
            {/* Header */}
            <Navbar />

            {/* Main Content */}
            <main className="connect-main">
                <div className="container">
                    {/* Page Title */}
                    <section className="connect-hero">
                        <h1 className="connect-title">Let's Connect</h1>
                        <p className="connect-subtitle">
                            Have a question, collaboration idea, or just want to chat about physics? 
                            I'd love to hear from you!
                        </p>
                    </section>

                    <div className="connect-content">
                        {/* Contact Form */}
                        <section className="contact-form-section">
                            <h2 className="section-title">Send Me a Message</h2>
                            
                            {/* Status Messages */}
                            {submitStatus === 'success' && (
                                <div className="status-message success">
                                    <div className="status-icon">✓</div>
                                    <div>
                                        <h3>Message Sent Successfully!</h3>
                                        <p>Thank you for reaching out. I'll get back to you within 24 hours.</p>
                                    </div>
                                </div>
                            )}

                            {submitStatus === 'error' && (
                                <div className="status-message error">
                                    <div className="status-icon">✗</div>
                                    <div>
                                        <h3>Something went wrong</h3>
                                        <p>Please try again or contact me directly via email.</p>
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
                                            placeholder="Enter your full name"
                                            disabled={isSubmitting}
                                        />
                                        {errors.name && <span className="error-message">{errors.name}</span>}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email" className="form-label">
                                            <Mail size={18} />
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className={`form-input ${errors.email ? 'error' : ''}`}
                                            placeholder="Enter your email address"
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
                                        placeholder="What would you like to discuss?"
                                        disabled={isSubmitting}
                                    />
                                    {errors.subject && <span className="error-message">{errors.subject}</span>}
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="preferredContact" className="form-label">
                                            <Phone size={18} />
                                            Preferred Contact Method
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
                                            <option value="phone">Phone</option>
                                            <option value="linkedin">LinkedIn</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="urgency" className="form-label">
                                            <Calendar size={18} />
                                            Priority Level
                                        </label>
                                        <select
                                            id="urgency"
                                            name="urgency"
                                            value={formData.urgency}
                                            onChange={handleInputChange}
                                            className="form-input"
                                            disabled={isSubmitting}
                                        >
                                            <option value="low">Low - General inquiry</option>
                                            <option value="normal">Normal - Regular response</option>
                                            <option value="high">High - Urgent matter</option>
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
                                        placeholder="Tell me about your project, question, or how I can help you..."
                                        rows="6"
                                        disabled={isSubmitting}
                                    />
                                    {errors.message && <span className="error-message">{errors.message}</span>}
                                    <div className="character-count">
                                        {formData.message.length} characters
                                    </div>
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
                                            Send Message
                                        </>
                                    )}
                                </button>
                            </form>
                        </section>

                        {/* Contact Information */}
                        <section className="contact-info-section">
                            <h2 className="section-title">Get in Touch</h2>
                            
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
                                <h3 className="social-title">Follow Me</h3>
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
                                        <span>Available for collaborations</span>
                                    </div>
                                    <div className="availability-item">
                                        <div className="status-indicator available"></div>
                                        <span>Open to research opportunities</span>
                                    </div>
                                    <div className="availability-item">
                                        <div className="status-indicator limited"></div>
                                        <span>Limited availability for consulting</span>
                                    </div>
                                </div>
                                <p className="response-time">
                                    <Calendar size={16} />
                                    Typical response time: 24-48 hours
                                </p>
                            </div>
                        </section>
                    </div>
                </div>
                <Footer />
            </main>
        </div>
    );
}

export default Connect;