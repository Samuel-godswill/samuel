import './Profile.css'

const Profile = () => {
  return (
    <div className="profile">
      <div className="profile-content">
        <h1 className='profile-header'>Projects</h1>
        <section className='project-item'>
          <p><a href="https://hr-system-hi4n.vercel.app/auth/login">Cterra</a></p>
          <span>A comprehensive HR management system built to streamline employee time tracking, attendance monitoring, and workforce productivity with an intuitive interface.</span>
        </section>

        <section className='project-item'>
          <p><a href="https://hr-system-hi4n.vercel.app/auth/login">Drug.com</a></p>
          <span>An advanced AI solutions platform offering services in computer vision, natural language processing, predictive analytics, and tailored machine learning model development for businesses.</span>
        </section>

        <section className='project-item'>
          <p><a href="https://eti-intelligence.vercel.app/home">Eti-Intelligence</a></p>
          <span>A modern shipping and logistics web application designed to simplify cargo management, service access, and operational efficiency for maritime and delivery services.</span>
        </section>

        <section className='project-item'>
          <p><a href="https://www.shipshoreservs.co.uk/services">Shippy</a></p>
          <span>A modern shipping and logistics web application designed to simplify cargo management, service access, and operational efficiency for maritime and delivery services..</span>
        </section>

        <section className='project-item'>
          <p><a href="https://trash-network.vercel.app/">Trash</a></p>
          <span>A community-driven waste reporting platform that empowers users to report environmental issues, promoting cleaner and more sustainable urban spaces.</span>
        </section>

        <section className='project-item'>
          <p><a href="https://harvard-poly-vercel.vercel.app/">Hharvard Poly.</a></p>
          <span>A responsive polytechnic website designed to showcase academic programs, streamline student access to information, and enhance the institution’s digital presence.</span>
        </section>
      </div>
    </div>
  )
}

export default Profile