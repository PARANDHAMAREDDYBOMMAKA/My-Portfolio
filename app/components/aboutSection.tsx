import Image from "next/image";

const AboutSection: React.FC = () => (
  <section
    id="about"
    className="py-20 px-10 bg-gradient-to-b from-blue-900 via-purple-800 to-indigo-700"
  >
    <div className="flex flex-col md:flex-row items-center">
      <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-8">
        <div className="relative group w-[250px] h-[300px] rounded-lg overflow-hidden shadow-lg">
          <div className="absolute top-[-10px] left-[-10px] w-[calc(100%+20px)] h-[calc(100%+20px)] rounded-lg overflow-hidden">
            <Image
              src="/photo.jpeg"
              alt="Profile Picture"
              layout="fill"
              objectFit="cover"
              className="transition-transform transform group-hover:scale-110"
            />
          </div>
          <div className="absolute inset-0 flex items-end justify-star opacity-0 group-hover:opacity-100 transition-opacity">
            <p className="text-sm font-regular bg-black text-opacity-5 bg-opacity-60 px-2 py-1 rounded-lg">
              Full Stack <br />Developer
              <br />
              <span className="text-white">
                <strong>Parandhama Reddy</strong>
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="text-center md:text-left">
        <p className="text-xl text-gray-400">
          I constantly try to improve my tech stack and skill set to stay
          up-to-date with the latest trends and technologies.
        </p>
      </div>
    </div>
  </section>
);

export default AboutSection;
