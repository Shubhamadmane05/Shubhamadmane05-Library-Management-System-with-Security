import React from 'react';
import Header from './Header';
import image1 from '../assets/library-shelf1.jpg';
import image2 from '../assets/library-shelf2.jpeg';
import image3 from '../assets/library-shelf3.avif';
import book1 from  '../assets/Don Quixote.jpeg';
import book2 from  '../assets/Alice2.jpeg';
import book3 from  '../assets/The Adventures.jpeg';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';


const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
       <Header />

     
      <div className="relative mt-2">
      <Swiper
  spaceBetween={20}
  slidesPerView={3}
  loop={true}
  autoplay={{ delay: 1000, disableOnInteraction: false }}
  pagination={{ clickable: true }}
  navigation={true}
  className="w-full h-80 md:h-[400px]"
>
  <SwiperSlide>
    <img
      src={image1}
      alt="Library Shelf 1"
      className="w-full h-full  rounded-lg p-2"
    />
  </SwiperSlide>
  <SwiperSlide>
    <img
      src={image2}
      alt="Library Shelf 2"
      className="w-full h-full  rounded-lg p-2"
    />
  </SwiperSlide>
  <SwiperSlide>
    <img
      src={image3}
      alt="Library Shelf 3"
      className="w-full h-full rounded-lg mr-1"
    />
  </SwiperSlide>
</Swiper>

      </div>

      
      <section className="py-12 px-4 md:px-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Featured Books</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105">
            <img
              src={book1}
              alt="book1"
              className="w-full h-[270px] object-cover rounded-t-lg" 
            />
            <h3 className="mt-4 text-xl font-semibold text-gray-800">Don Quixote</h3>
            <p className="text-gray-600 mt-2">Often regarded as the first modern novel, it narrates the adventures of the eccentric nobleman Don Quixote and his squire, Sancho Panza.</p>
            {/* <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-400 transition duration-300">
              Read More
            </button> */}
            <button
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-400 transition duration-300"
           onClick={() =>
             window.open(
             "https://www.google.com/imgres?q=don%20quixote&imgurl=https%3A%2F%2Fm.media-amazon.com%2Fimages%2FM%2FMV5BMTEzMTFhMDItYjY3Yi00OTYyLWJhOTEtM2ZiNzBiZmVmMDAyXkEyXkFqcGc%40._V1_.jpg&imgrefurl=https%3A%2F%2Fwww.imdb.com%2Ftitle%2Ftt0016806%2F&docid=ijU9oaVtyLLbSM&tbnid=ulwCq9kkLKJMcM&vet=12ahUKEwiuxaDQ4fqKAxXJxzgGHZMILqgQM3oECG8QAA..i&w=578&h=800&hcb=2&ved=2ahUKEwiuxaDQ4fqKAxXJxzgGHZMILqgQM3oECG8QAA",
            "_blank"
             )
         }
        >
  Read More
   </button>
          </div>

          
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105">
            <img
              src={book2}
              alt="book2"
              className="w-full h-[270px] object-cover rounded-t-lg"
            />
            <h3 className="mt-4 text-xl font-semibold text-gray-800">Alice's Adventures in Wonderland</h3>
            <p className="text-gray-600 mt-2">This classic tale follows young Alice as she falls through a rabbit hole into a whimsical world filled with peculiar creatures and surreal experiences.
            </p>
            <button
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-400 transition duration-300"
           onClick={() =>
             window.open(
             "https://www.google.com/imgres?q=alice%20adventures%20in%20wonderland%20book&imgurl=https%3A%2F%2Fik.imagekit.io%2Fpanmac%2Ftr%3Adi-placeholder_portrait_aMjPtD9YZ.jpg%2Ctr%3Aw-350%2Cf-jpg%2Cpr-true%2Fedition%2F9781447279990.jpg&imgrefurl=https%3A%2F%2Fwww.panmacmillan.com%2Fauthors%2Flewis-carroll%2Falices-adventures-in-wonderland%2F9781447279990&docid=xgwtESxKuER-EM&tbnid=KQPqmPcaGPkteM&vet=12ahUKEwj93a-w5PqKAxW9yzgGHe87Fj0QM3oECGYQAA..i&w=350&h=531&hcb=2&ved=2ahUKEwj93a-w5PqKAxW9yzgGHe87Fj0QM3oECGYQAA"
             )
         }
        >
  Read More
   </button>
          </div>

          
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105">
            <img
              src={book3}
              alt="book3"
              className="w-full h-[270px] object-cover rounded-t-lg"
            />
            <h3 className="mt-4 text-xl font-semibold text-gray-800">The Adventures of Huckleberry Finn</h3>
            <p className="text-gray-600 mt-2">A seminal work in American literature, it tells the story of Huck Finn and his journey down the Mississippi River, exploring themes of freedom and friendship..</p>
            <button
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-400 transition duration-300"
           onClick={() =>
             window.open(
             "https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FThe_Adventures_of_Huck_Finn_%25281993_film%2529&psig=AOvVaw1cA1WRMISonM369pCP7MUd&ust=1737136161357000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCICZy9Pm-ooDFQAAAAAdAAAAABAE"

             )
            }
        >
  Read More
   </button>
          </div>
        </div>
      </section>

     
    </div>
  );
};

export default Home;
