import React from "react";
import "../../styles/scss/about.scss";

const AboutUsPage = () => {
  return (
    <section className="center">
      <div className="container">
        <h4 className="heading-4">About us</h4>
        <p className="muted">
          Source:{" "}
          <a href="https://www.onlineexambuilder.com/about-us/item12719">
            onlineexambuilder.com
          </a>
        </p>
        <div>
          <p>
            Easy LMS is an internationally growing LMS company specialized in
            education technology. Our focus is on providing the best user
            experience for our customers, and their employees or students. With
            a team of 23 dedicated, friendly owls we strive every day to improve
            our LMS and give you excellent support. We do this with a smile, and
            a cup of coffee in our hands!
          </p>
        </div>
        <div id="whatwedo" className="info">
          <h4 className="heading-4 text-center">What we do </h4>
          <p className="muted text-center">
            Build the best LMS that is fun and easy to use
          </p>
          The best LMS in the world. That’s our goal. You can already create
          exams, courses, assessments and quizzes. Or your own Academy. But
          that’s not where it stops. We aim high, and we like to challenge
          ourselves, so we can deliver great quality.
        </div>
        <div id="whoweare" className="info">
          <h4 className="heading-4 text-center">Who we are </h4>
          <p className="muted text-center">A bunch of smart web owls</p>
          We are an international team of communication and tech professionals.
          Most of us are Dutchies: down to earth, but not wearing clogs all day.
          Brazil is responsible for the Latin twist, the USA for our confidence,
          England for a bit of discipline, and France for some elegance. All
          with one thing in common: we are happy and dedicated.
        </div>
        <div id="howwework" className="info">
          <h4 className="heading-4 text-center">How we work</h4>
          <p className="muted text-center">Working like a well-oiled machine</p>
          We give support, we develop new features, we solve bugs. That’s what
          we do all day in an eggshell 😉. To deliver quality, we prioritize our
          work. Therefore we use Scrum. In the meantime we learn, grow, and have
          fun. Because work isn’t always about work.
        </div>
        <div id="ouroffice" className="info">
          <h4 className="heading-4 text-center">Office </h4>
          <p className="muted text-center">The nest from which we operate</p>
          Our office is located in the beautiful city of Delft. We designed it
          with great care to create a perfect workplace. A place where we can
          fully concentrate. A place where we have discussions, and give each
          other actionable feedback. But also a place where we celebrate our
          successes.
          <div className="map">
            <embed src="https://www.openstreetmap.org/export/embed.html?bbox=4.351154565811158%2C52.00872213381704%2C4.354695081710816%2C52.010247641965044&amp;marker=52.00948489439166%2C4.352924823760986" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsPage;
