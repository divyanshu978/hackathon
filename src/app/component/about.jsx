import React from 'react';
import { User, Heart, Target, Award } from 'lucide-react';

const About = () => {
  return (
    <div className="h-auto bg-gradient-to-br from-gray-900 via-gray-800 to-slate-700 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-500/20 to-gray-500/20 backdrop-blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-gray-500 to-gray-500 mb-8 shadow-2xl">
              <User className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-300 to-pink-gray-400 bg-clip-text text-transparent">
              About Us
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We're passionate creators building the future, one innovative solution at a time.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h2 className="text-4xl font-bold mb-6 text-white">Our Story</h2>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              Founded with a vision to transform the digital landscape, we've grown from a small team of dreamers 
              into a dynamic force for innovation. Our journey began with a simple belief: technology should 
              empower people, not complicate their lives.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Today, we continue to push boundaries, challenge conventions, and create solutions that make a 
              real difference in the world. Every project we undertake is infused with our core values of 
              excellence, integrity, and human-centered design.
            </p>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-3xl blur-xl"></div>
            <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 border border-purple-500/20">
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-400 mb-2">50+</div>
                  <div className="text-gray-300">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-pink-400 mb-2">5+</div>
                  <div className="text-gray-300">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-400 mb-2">100+</div>
                  <div className="text-gray-300">Happy Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-pink-400 mb-2">24/7</div>
                  <div className="text-gray-300">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        {/* <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group">
              <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-500 hover:transform hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-6">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">Passion</h3>
                  <p className="text-gray-300 leading-relaxed">
                    We pour our hearts into every project, driven by genuine enthusiasm for creating 
                    exceptional experiences that exceed expectations.
                  </p>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-500 hover:transform hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-6">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">Innovation</h3>
                  <p className="text-gray-300 leading-relaxed">
                    We constantly explore new technologies and methodologies to stay ahead of the curve 
                    and deliver cutting-edge solutions.
                  </p>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-500 hover:transform hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-6">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">Excellence</h3>
                  <p className="text-gray-300 leading-relaxed">
                    We maintain the highest standards in everything we do, from initial concept to 
                    final delivery and ongoing support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        {/* Mission Section */}
        {/* <div className="text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl"></div>
            <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-3xl p-12 border border-purple-500/20">
              <h2 className="text-4xl font-bold mb-6 text-white">Our Mission</h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                To empower businesses and individuals through innovative technology solutions that 
                simplify complexity, enhance productivity, and create meaningful connections in an 
                increasingly digital world.
              </p>
            </div>
          </div>
        </div>  */}
      {/* </div> */}
    </div>
  );
};

export default About;