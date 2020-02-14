import React from "react";
import "../../styles/scss/slider.scss";

const CustomersPage = () => {
  return (
    <section className="center">
      <div className="container">
        <h3 className="heading-4">Customers</h3>
        <div id="captioned-gallery">
          <figure className="slider">
            <figure>
              <img src="assets/img/1.png" />
              <figcaption>
                <h1>epplejeck - Netherlands</h1>
                <p>
                  Epplejeck opened its Education Center which mainly focuses on
                  helping their sales employees to develop skills in different
                  subjects. To deliver this training to their employees and
                  train them effectively, the search for a suitable LMS started.
                </p>
              </figcaption>
            </figure>
            <figure>
              <img src="assets/img/2.png" />
              <figcaption>
                <h1>Hal Aluminum Mexico - Mexico</h1>
                <p>
                  Hal Aluminum Mexico needed a tool to evaluate their staff more
                  efficiently. The continuous training of their staff with
                  courses and exams is one of their priorities, and so they
                  chose Easy LMS.
                </p>
              </figcaption>
            </figure>
            <figure>
              <img src="assets/img/3.png" />
              <figcaption>
                <h1>Mac & Mia - United States</h1>
                <p>
                  Mac & Mia have 40 corporate employees, and about 150 remote
                  independent contractors. The large remote workforce needed
                  extensive training in using their internal tools and customer
                  service. Mac & Mia wanted to organize and track training as
                  their remote stylists on-boarded onto teams within the
                  company.
                </p>
              </figcaption>
            </figure>
            <figure>
              <img src="assets/img/4.png" />
              <figcaption>
                <h1>Online Mortgage Advisor - United Kingdom</h1>
                <p>
                  Online Mortgage Advisor needed an LMS to assess and certify
                  learning standards of the brokers they work with, to ensure
                  they have the level of knowledge required in their specialist
                  area to handle their customers.
                </p>
              </figcaption>
            </figure>
            <figure>
              <img src="assets/img/5.png" />
              <figcaption>
                <h1>Owlypia - United Kingdom</h1>
                <p>
                  Owlypia organizes international online competitions. They
                  wanted to run around ten different tests simultaneously and
                  needed a secure LMS platform to run the tests with thousands
                  of students. After a few weeks of research and trials, they
                  concluded that Easy LMS was the right choice.
                </p>
              </figcaption>
            </figure>
            <figure>
              <img src="assets/img/6.png" />
              <figcaption>
                <h1>BrandDisco - United States</h1>
                <p>
                  BrandDisco needed an end to end LMS solution to support its
                  own internal frameworks, as well as the ability to offer a
                  proven system to its external clients.
                </p>
              </figcaption>
            </figure>
            <figure>
              <img src="assets/img/7.png" />
              <figcaption>
                <h1>Southland District Council - New Zealand</h1>
                <p>
                  Early in 2018 Southland District Council started looking for a
                  quick effective Learning Management System from which to run
                  their Health, Safety and Wellness e-learning for the whole
                  organisation.
                </p>
              </figcaption>
            </figure>
          </figure>
        </div>
      </div>
      <p className="muted">
        It's a slider, to pause the animation place your cursor on it.
      </p>
    </section>
  );
};

export default CustomersPage;
