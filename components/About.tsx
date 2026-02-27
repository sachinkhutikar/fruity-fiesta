
import React from 'react';

export const About: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#9b59b6] py-12 px-4 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full p-8 md:p-12 text-center">
        <h1 className="text-5xl font-bold mb-8 text-gray-800 border-b pb-4">About Us</h1>
        
        <p className="text-lg text-gray-600 mb-10 leading-relaxed">
          Welcome to our fruits classifier and quality checker website! 
          We are passionate about bringing technology and agriculture together 
          to revolutionize the way fruits are classified and checked for quality.
        </p>

        <div className="grid md:grid-cols-2 gap-12 text-left">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
              <i className="fas fa-bullseye text-green-500"></i> Our Mission
            </h2>
            <p className="text-gray-600">
              At our core, we are driven by a mission to empower farmers, distributors, and consumers 
              with innovative solutions that enhance the fruit classification process 
              and ensure the highest quality produce reaches your table.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
              <i className="fas fa-concierge-bell text-blue-500"></i> Our Offerings
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-gray-700">Fruit Classification</h3>
                <p className="text-sm text-gray-600">
                  Our state-of-the-art classifier uses advanced machine learning algorithms to accurately 
                  identify and categorize various fruits based on images. Whether it's apples, bananas, or oranges, 
                  our classifier provides reliable results to streamline the fruit sorting process.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-700">Quality Analysis</h3>
                <p className="text-sm text-gray-600">
                  We understand the importance of quality when it comes to fruits. 
                  Our quality checker analyzes key attributes such as color, size, and shape 
                  to determine the freshness and ripeness of fruits, helping you make informed decisions about your produce.
                </p>
              </div>
            </div>
          </section>
        </div>

        <footer className="mt-12 pt-8 border-t text-sm text-gray-400">
          <p>Copyright &copy; Fruit Fiesta. All Rights Reserved | Contact Us: +91 90000 00000</p>
        </footer>
      </div>
    </div>
  );
};
