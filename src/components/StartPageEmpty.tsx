import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Navigation, Pagination, Scrollbar, A11y,
} from 'swiper';
import Tslogo from '../images/TSlogo.png';
import ReactLogo from '../images/Reactlogo.png';
import TwLogo from '../images/TWlogo.jpg';
import NodeLogo from '../images/nodeLogo.png';
import PostLogo from '../images/PostLogo.png';
import IlyaAv from '../images/Ilya.jpg';
import KolyaAv from '../images/KolyaAv.png';
import VladAv from '../images/VladAv.png';
import 'swiper/css';
import 'swiper/css/navigation';

function StartPageEmpty() {
  return (
    <div className="dark:bg-colorD5">
      <h1 className="md:text-2xl text-base text-center text-color1 dark:text-colorD3">What this app can do?</h1>
      <ul className="text-center pt-1">
        <li className="md:text-xl text-xs text-color1 dark:text-colorD3">- Create as many boards as you wish</li>
        <li className="md:text-xl text-xs text-color1 dark:text-colorD3">- Create columns with tasks inside the boards</li>
        <li className="md:text-xl text-xs text-color1 dark:text-colorD3">- Drag and drop your task columns</li>
        <li className="md:text-xl text-xs text-color1 dark:text-colorD3">- Add descriptions and titles to tasks</li>
        <li className="md:text-xl text-xs text-color1 dark:text-colorD3">- Drag and drop your tasks both inside and into other columns as you wish</li>
      </ul>
      <h2 className="md:text-2xl text-base text-center text-color1 md:pt-4 pt-1 dark:text-colorD3">This app is powered by:</h2>
      <div className="max-w-[50%] mx-auto md:pt-4 pt-1">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={0}
          slidesPerView={2}
          navigation
          loop
        >
          <SwiperSlide>
            <div className="flex flex-col text-center">
              <a href="https://www.typescriptlang.org/">
                <img className="w-4/12 h-4/12 mx-auto rounded-full" src={Tslogo} alt="TS" />
              </a>
              <p className="md:pt-4 pt-1 text-color1 md:text-xl text-xs dark:text-colorD3">TypeScript</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-col text-center">
              <a href="https://reactjs.org/">
                <img className="w-4/12 h-4/12 mx-auto rounded-full" src={ReactLogo} alt="React" />
              </a>
              <p className="md:pt-4 pt-1 text-color1 md:text-xl text-xs dark:text-colorD3">React</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-col text-center">
              <a href="https://tailwindcss.com">
                <img className="w-4/12 h-4/12 mx-auto rounded-full" src={TwLogo} alt="TW" />
              </a>
              <p className="md:pt-4 pt-1 text-color1 md:text-xl text-xs dark:text-colorD3">TailWind</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-col text-center">
              <a href="https://nodejs.org/en/">
                <img className="w-4/12 h-4/12 mx-auto rounded-full" src={NodeLogo} alt="Node" />
              </a>
              <p className="md:pt-4 pt-1 text-color1 md:text-xl text-xs dark:text-colorD3">NodeJS</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-col text-center">
              <a href="https://www.postgresql.org/">
                <img className="w-4/12 h-4/12 mx-auto rounded-full" src={PostLogo} alt="Post" />
              </a>
              <p className="md:pt-4 pt-1 text-color1 md:text-xl text-xs dark:text-colorD3">PostgreSQL</p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <h2 className="md:text-2xl text-base text-center text-color1 md:pt-4 pt-1 dark:text-colorD3">Developers:</h2>
      <div className="flex justify-center md:pt-5 pt-1">
        <div>
          <a href="https://github.com/sensaur">
            <img className="w-4/12 h-4/12 mx-auto rounded-full" src={IlyaAv} alt="Post" />
          </a>
          <p className="md:pt-4 pt-1 text-color1 md:text-xl text-xs text-center dark:text-colorD3">Ilya Zhigarev</p>
        </div>
        <div>
          <a href="https://github.com/NikolayBalabanov">
            <img className="w-4/12 h-4/12 mx-auto rounded-full" src={KolyaAv} alt="Post" />
          </a>
          <p className="md:pt-4 pt-1 text-color1 md:text-xl text-xs text-center dark:text-colorD3">Nikolay Balabanov</p>
        </div>
        <div>
          <a href="https://github.com/VEKozlov111">
            <img className="w-4/12 h-4/12 mx-auto rounded-full" src={VladAv} alt="Post" />
          </a>
          <p className="md:pt-4 pt-1 text-color1 md:text-xl text-xs text-center dark:text-colorD3">Vlad Kozlov</p>
        </div>
      </div>
    </div>
  );
}

export default StartPageEmpty;
