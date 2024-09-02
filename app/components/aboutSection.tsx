/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";

const AboutSection: React.FC = () => (
  <section
    id="about"
    className="py-20 px-10 bg-gradient-to-b from-blue-900 via-purple-800 to-indigo-700"
  >
    <div className="flex flex-col md:flex-row items-center">
      <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-8 relative">
        <div className="relative group w-[400px] h-[450px] rounded-[100px_15px_100px_10px] overflow-hidden shadow-lg before:content-[''] before:absolute before:bottom-[-20px] before:left-[50px] before:w-[40px] before:h-[40px] before:bg-gradient-to-b from-blue-900 via-purple-800 to-indigo-700 before:clip-path-polygon-[50%_0%,_0%_100%,_100%_100%]">
          <div className="absolute top-[-10px] left-[-10px] w-[calc(100%+10px)] h-[calc(100%+10px)] rounded-[100px_15px_100px_10px] overflow-hidden">
            <Image
              src="/photo.jpeg"
              alt="Profile Picture"
              fill
              className="object-cover transition-transform transform group-hover:scale-110"
            />
          </div>
          <div className="absolute inset-0 flex items-end justify-start opacity-0 group-hover:opacity-100 transition-opacity">
            <p className="text-sm font-regular bg-black text-opacity-5 bg-opacity-60 px-2 py-1 rounded-lg">
              Full Stack <br />
              Developer
              <br />
              <span className="text-white">
                <strong>Parandhama Reddy</strong>
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="text-center text-xl md:text-left">
        <p>
          Hello, I'm <strong>Parandhama Reddy</strong>, born on 7th May 2006.
          I'm proud to be an Indian, and currently, I am single. I am proficient
          in English, Hindi, and Telugu. You can reach out to me via email at{" "}
          <a href="mailto:rparandhama63@gmail.com">rparandhama63@gmail.com</a>.
        </p>

        <p>
          I am currently pursuing my B.Tech at Apollo University, integrated
          with Kalvium, with an expected graduation in 2027. My high school
          journey was completed at Allen Career Institute, where I graduated in
          2023.
        </p>

        <p>
          My technical expertise spans across several programming languages,
          including Python, HTML, CSS, and JavaScript. I have substantial
          experience with the MERN stack, and I am also proficient in web
          development tools such as Tailwind CSS and Chakra UI. Additionally, I
          have a good understanding of database management.
        </p>

        <p>Outside of work, I enjoy Playing Badminton and Travelling.</p>
      </div>
    </div>
  </section>
);

export default AboutSection;
