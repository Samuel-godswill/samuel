import './Profile.css'

const Profile = () => {
  return (
    <div className="profile">
      <div className="profile-content">
        <article className="featured-article">
          <span className="article-date">June 28, 2025</span>
          <h2 className="article-title">
            Building the Future: My Journey from Frontend Development to Big Tech Dreams
          </h2>
          <p className="article-excerpt">
            Exploring the path from crafting pixel-perfect interfaces to architecting experiences 
            that impact billions. Here's what I've learned about preparing for Apple and Meta.
          </p>
          <a href="#" className="read-more-link">Read article</a>
        </article>
        
        <div className="articles-grid">
          <article className="article-card">
            <span className="article-date">June 20, 2025</span>
            <h3 className="article-title">
              React Performance Optimization: Lessons from Building at Scale
            </h3>
            <p className="article-excerpt">
              Deep dive into advanced React patterns, custom hooks, and performance optimization 
              techniques that prepare you for complex applications at major tech companies.
            </p>
            <a href="#" className="read-more-link">Read article</a>
          </article>

          <article className="article-card">
            <span className="article-date">June 12, 2025</span>
            <h3 className="article-title">
              Design Systems Mastery: Creating Cohesive User Experiences
            </h3>
            <p className="article-excerpt">
              How to build and maintain design systems that scale across teams, inspired by 
              Apple's Human Interface Guidelines and Meta's design principles.
            </p>
            <a href="#" className="read-more-link">Read article</a>
          </article>

          <article className="article-card">
            <span className="article-date">June 5, 2025</span>
            <h3 className="article-title">
              Frontend Architecture: Building for Millions of Users
            </h3>
            <p className="article-excerpt">
              Exploring micro-frontends, state management at scale, and the architectural decisions 
              that power applications used by billions worldwide.
            </p>
            <a href="#" className="read-more-link">Read article</a>
          </article>
        </div>
      </div>

      <div className="profile-sidebar">
        <section className="newsletter-section">
          <div className="section-header">
            <div className="email-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM20 7.23792L12.0718 14.338L4 7.21594V19H20V7.23792ZM4.51146 5L12.0619 11.662L19.501 5H4.51146Z"></path>
              </svg>
              <h3>Stay up to date</h3>
            </div>
            <p>Get notified when I publish something new, and unsubscribe at any time!</p>
          </div>
          
          <div className="newsletter-form">
            <input type="email" placeholder="Email address" className="email-input" />
            <button className="subscribe-btn">Subscribe</button>
          </div>
        </section>

        <section className="work-section">
          <div className="section-header">
            <div className="work-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 5V2C7 1.44772 7.44772 1 8 1H16C16.5523 1 17 1.44772 17 2V5H21C21.5523 5 22 5.44772 22 6V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V6C2 5.44772 2.44772 5 3 5H7ZM4 16V19H20V16H4ZM4 14H20V7H4V14ZM9 3V5H15V3H9ZM11 11H13V13H11V11Z"></path>
              </svg>
              <h3>Work Experience</h3>
            </div>
          </div>

          <div className="work-experience">
            <div className="job-item">
              <div className="company-logo">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16.9197 4.5C15.0689 4.5 13.622 5.89404 12.3123 7.6649C10.5124 5.37323 9.00722 4.5 7.20593 4.5C3.53352 4.5 0.719727 9.27931 0.719727 14.3379C0.719727 17.5034 2.25116 19.5 4.81628 19.5C6.66249 19.5 7.99028 18.6296 10.3508 14.5034C10.3508 14.5034 11.3347 12.7658 12.0116 11.5689C12.2488 11.9518 12.4981 12.3639 12.7611 12.8069L13.868 14.669C16.0242 18.2772 17.2256 19.5 19.4025 19.5C21.9014 19.5 23.2921 17.4761 23.2921 14.2448C23.2921 8.94828 20.4149 4.5 16.9197 4.5ZM8.55076 13.3862C6.63697 16.3862 5.9749 17.0586 4.90938 17.0586C3.81283 17.0586 3.16111 16.0959 3.16111 14.3793C3.16111 10.7069 4.99214 6.95172 7.1749 6.95172C8.35692 6.95172 9.34471 7.63438 10.8577 9.80042C9.42105 12.0041 8.55076 13.3862 8.55076 13.3862ZM15.7737 13.0085L14.4502 10.8013C14.0921 10.2188 13.7489 9.6836 13.4177 9.19286C14.6105 7.35183 15.5944 6.43448 16.7646 6.43448C19.1956 6.43448 21.1404 10.0138 21.1404 14.4103C21.1404 16.0862 20.5915 17.0586 19.4542 17.0586C18.3641 17.0586 17.8434 16.3387 15.7737 13.0085Z"></path></svg>              </div>
              <div className="job-details">
                <h4>Senior Frontend Developer</h4>
                <p className="company-name">Meta</p>
                <span className="job-date">Jan 2025 — Present</span>
              </div>
            </div>

            <div className="job-item">
              <div className="company-logo">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3.06364 7.50914C4.70909 4.24092 8.09084 2 12 2C14.6954 2 16.959 2.99095 18.6909 4.60455L15.8227 7.47274C14.7864 6.48185 13.4681 5.97727 12 5.97727C9.39542 5.97727 7.19084 7.73637 6.40455 10.1C6.2045 10.7 6.09086 11.3409 6.09086 12C6.09086 12.6591 6.2045 13.3 6.40455 13.9C7.19084 16.2636 9.39542 18.0227 12 18.0227C13.3454 18.0227 14.4909 17.6682 15.3864 17.0682C16.4454 16.3591 17.15 15.3 17.3818 14.05H12V10.1818H21.4181C21.5364 10.8363 21.6 11.5182 21.6 12.2273C21.6 15.2727 20.5091 17.8363 18.6181 19.5773C16.9636 21.1046 14.7 22 12 22C8.09084 22 4.70909 19.7591 3.06364 16.4909C2.38638 15.1409 2 13.6136 2 12C2 10.3864 2.38638 8.85911 3.06364 7.50914Z"></path></svg>              </div>
              <div className="job-details">
                <h4>Frontend Developer</h4>
                <p className="company-name">Google</p>
                <span className="job-date">Jun 2024 — Dec 2024</span>
              </div>
            </div>

            <div className="job-item">
              <div className="company-logo">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.2917 3.81415L13.3102 9.52081L13.7059 10.6371L13.7132 5.82625L13.7222 1.00908H17.9931L18.0004 11.8713C18.0031 17.8519 17.9967 22.7617 17.9849 22.7708C17.9731 22.7798 17.7762 22.7708 17.5493 22.7435C16.5601 22.6256 15.2596 22.5076 14.2096 22.4622C13.8629 22.4459 13.5761 22.4277 13.5725 22.4241C13.5698 22.4205 13.3002 21.6618 12.7966 20.2397L12.7967 20.2359C12.3051 18.8476 11.5851 16.8121 10.653 14.1746L10.3126 13.2214L10.3054 17.8066C10.299 22.1718 10.2954 22.4168 10.2482 22.4168C10.0849 22.4168 8.67819 22.5076 8.20809 22.553C7.89953 22.5802 7.28241 22.6437 6.83772 22.6982C6.39212 22.749 6.02185 22.7835 6.01459 22.7762C6.00733 22.7689 6.00098 17.8674 6.00098 11.8831V1.00182H6.00615L6.00551 1H10.2936L10.3217 1.08077C10.3288 1.09558 10.3865 1.25644 10.479 1.51683L11.1204 3.29515L11.2928 3.79066L11.2917 3.81415Z"></path></svg>              </div>
              <div className="job-details">
                <h4>Frontend Developer</h4>
                <p className="company-name">Netflix</p>
                <span className="job-date">Mar 2023 — May 2024</span>
              </div>
            </div>

            <div className="job-item">
              <div className="company-logo">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.001 2C6.50098 2 2.00098 6.5 2.00098 12C2.00098 17.5 6.50098 22 12.001 22C17.501 22 22.001 17.5 22.001 12C22.001 6.5 17.551 2 12.001 2ZM15.751 16.65C13.401 15.2 10.451 14.8992 6.95014 15.6992C6.60181 15.8008 6.30098 15.55 6.20098 15.25C6.10098 14.8992 6.35098 14.6 6.65098 14.5C10.451 13.6492 13.751 14 16.351 15.6C16.701 15.75 16.7501 16.1492 16.6018 16.45C16.4018 16.7492 16.0518 16.85 15.751 16.65ZM16.7501 13.95C14.051 12.3 9.95098 11.8 6.80098 12.8C6.40181 12.9 5.95098 12.7 5.85098 12.3C5.75098 11.9 5.95098 11.4492 6.35098 11.3492C10.001 10.25 14.501 10.8008 17.601 12.7C17.9018 12.8508 18.051 13.35 17.8018 13.7C17.551 14.05 17.101 14.2 16.7501 13.95ZM6.30098 9.75083C5.80098 9.9 5.30098 9.6 5.15098 9.15C5.00098 8.64917 5.30098 8.15 5.75098 7.99917C9.30098 6.94917 15.151 7.14917 18.8518 9.35C19.301 9.6 19.451 10.2 19.201 10.65C18.9518 11.0008 18.351 11.1492 17.9018 10.9C14.701 9 9.35098 8.8 6.30098 9.75083Z"></path></svg>              </div>
              <div className="job-details">
                <h4>Junior Frontend Developer</h4>
                <p className="company-name">Spotify</p>
                <span className="job-date">Aug 2022 — Feb 2023</span>
              </div>
            </div>
          </div>

          <div className="action-buttons">
            <button className="download-resume-btn">
              Download Resume
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.0001 16.1716L18.3641 10.8076L19.7783 12.2218L12.0001 20L4.22192 12.2218L5.63614 10.8076L11.0001 16.1716V4H13.0001V16.1716Z"></path>
              </svg>
            </button>
            <button className="schedule-call-btn">Schedule a call</button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Profile