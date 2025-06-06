import SectionHeading from "../../../components/Heading";
import { MapPinned } from "lucide-react";

const Store = () => {
  return (
    <div>
      <SectionHeading
        title={"Visit Our Store"}
        subtitle={"Experience our pieces to find your true style"}
      />
      <section className='flex flex-col md:flex-row items-center justify-center gap-8 p-6 md:p-12'>
        {/* Left: Image */}
        <div className='w-full md:w-1/2'>
          <img
            src='https://images.durian.in/assets/images/home_page_store.jpg?tr=h-600'
            alt='Example'
            className='w-full h-auto rounded-2xl shadow-lg object-cover'
          />
        </div>

        {/* Right: Content */}
        <div className='w-full md:w-1/2 space-y-4 flex flex-col'>
          <h2 className='text-3xl font-medium text-gray-600 text-center flex justify-center items-center gap-3'>
            <span>
              <MapPinned />
            </span>
            <h2>Visit Our Store Today In Delhi</h2>
          </h2>

          <p className='text-gray-600 text-center'>
            Experience our pieces to find your true style
          </p>
          <div>
            <p className='text-gray-600 text-center'>
              Gate no.02 vijay market Ansari road
            </p>
            <p className='text-gray-600 text-center'>Shastri park | 110053</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Store;
