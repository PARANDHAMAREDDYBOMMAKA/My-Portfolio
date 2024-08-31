import Image from "next/image";

const AboutSection: React.FC = () => (
  <section
    id="about"
    className="py-20 px-10 bg-gradient-to-b from-blue-900 via-purple-800 to-indigo-700 text-white"
  >
    <div className="flex flex-col md:flex-row items-center">
      <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-8">
        <div className="relative group mx-10 ">
          <Image
            src="/photo.jpeg"
            alt="Profile Picture"
            width={200}
            height={200}
            className="h-[75vh] w-auto border-4 border-purple-500 transition-transform transform group-hover:translate-x-4"
          />
          <div className="absolute inset-0 flex items-end justify-start text-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
            <p className="text-xl font-bold bg-black bg-opacity-60 px-2 py-1 rounded-lg">
              A Full Stack Developer
              <br />
              <span>
                <strong>Parandhama Reddy</strong>
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="text-center md:text-left">
        {/* <h2 className="text-3xl font-bold mb-4 glow-text">Parandhama Reddy</h2> */}
        <p className="text-xl text-gray-400">
          I constantly try to improve my tech stack and skill set to stay
          up-to-date with the latest trends and technologies.
        </p>
      </div>
    </div>
  </section>
);

export default AboutSection;
